import { Router } from 'express'
import { Order, Product, Buyer } from '../model'
import _ from 'lodash'
import Stripe from 'stripe'
import { verifyToken } from '../config/jwt.config';
export const paymentRouter = Router()
const stripe = new Stripe("sk_test_3WMWfYvmSuI2rpifpujx4dw2")
paymentRouter.post("/checkout", async (req, res) => {
    const {
        name= "",
        email= "",
        phone= "",
        postcode= "",
        address= "",
        card_tok= "",
        description="",
        products= []
    } = req.body
    try{
        const product_ids = products.map(async (v : any, index : any) =>{
            const product = await Product.findOne({
                _id: v.id,
                is_active: true,
                quantity: { $gt: Number(v.qty) }
            }).lean().exec()
            if(product){
                const amount = _.ceil((product.price * Number(v.qty) * (100 - product.discount)/100) * 100)
                return {
                    ...product,
                    amount: Math.floor(amount),
                    qty: v.qty
                }
            }
        })
        const array_product = (await Promise.all(product_ids)).filter(v=>v)
        const ids = _.map(array_product, '_id')
        const total_amount = _.sumBy(array_product, 'amount')
        // 
        if(array_product.length <= 0){
            return res.status(404).json({error: "not found product."})
        }
        // creaete charge
        const charge = await stripe.charges.create({
            amount: total_amount,
            currency: "usd",
            source: card_tok,
            description,
            metadata: {
                name,
                email,
                phone,
                address,
                postcode
            }
        })
        // save buyer details
        const buyer = await Buyer.create({
            name,
            email,
            phone,
            address,
            postcode,
        })
        // create order
        const order = await Order.create({
            buyer: buyer._id,
            status: "PENDING",
            products: ids,
            total_amount,
            description,
            charge_id: charge.id
        })
        // remove qty
        array_product.map(({_id, quantity, qty}) => {
            Product.updateOne({_id}, {
                quantity: quantity - qty
            }).exec()
        })
        return res.json(order)
    }catch(e){
        return res.json({error: e}).status(400)
    }
})

paymentRouter.get("/buyers", verifyToken, async (req,res) => {
    const { search = "", page = 1, limit = 10, sort = "-createdAt" } = req.query
    const buyers = await Buyer.paginate({
        $or: [
            {name: { $regex: search, $options: 'i' }},
            {email: { $regex: search, $options: 'i' }},
            {phone: { $regex: search, $options: 'i' }},
            {address: { $regex: search, $options: 'i' }},
        ]
    },{
        page: Number(page),
        limit: Number(limit),
        lean: true,
        sort: sort,
        populate: ["buyer"]
    })

    return res.json(buyers)
})

paymentRouter.get("/buyers/:id", verifyToken, async (req,res) => {
    const { id } = req.params
    const buyer = await Buyer.findById(id).populate("orders").lean().exec()
    buyer.orders = await Order.find({
        buyer: id
    }).populate("products").lean().exec()
    return res.json(buyer)
})