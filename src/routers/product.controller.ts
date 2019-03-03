import { Router } from 'express'
import { Product } from '../model'
import { verifyToken } from '../config/jwt.config';
export const productRouter = Router()

productRouter.get("/list", async (req,res) => {
    const { status= "", search= "", is_active = true, page=1, limit=10, sort="-createdAt" } = req.query
    const product = await Product.paginate({
        is_active: Number(is_active), status: {$regex: status, $options: 'i'},
        $or: [{title: { $regex: search } }]
    },{
        page: Number(page),
        limit: Number(limit),
        lean: true,
        sort: sort
    })
    return res.json(product)
})

productRouter.get("/details/:id", async (req,res) => {
    const { id= "" } = req.params
    const product = await Product.findById(id).lean().exec()
    return res.json(product)
})


// add new product
productRouter.post("/create", verifyToken,async (req, res) => {
    const data = <ProductInterface> req.body
    const product = await Product.create(data)
    return res.json(product)
})

// update product
productRouter.put("/update/:id", verifyToken, async (req, res) => {
    const data = <ProductInterface> req.body
    const product = await Product.updateOne({
        _id: req.params.id
    },data).exec()
    return res.json(product)
})

// Active product
productRouter.put("/active/:id", verifyToken, async (req, res) => {
    const product = await Product.updateOne({
        _id: req.params.id 
    }, {
        is_active: true
    }).exec()
    return res.json(product)
})

// Deactive product
productRouter.put("/deactive/:id", verifyToken, async (req, res) => {
    const product = await Product.updateOne({
        _id: req.params.id 
    }, {
        is_active: false
    }).exec()
    return res.json(product)
})

// Add image 
productRouter.post("/:id/images", verifyToken, async (req, res) => {
    const product = await Product.updateOne({
        _id: req.params.id 
    }, {
        $push: {
            images : req.body.images
        }
    }).exec()
    return res.json(product)
})

// delete images
productRouter.delete("/:id/images", verifyToken, async (req, res) => {
    const product = await Product.updateOne({
        _id: req.params.id 
    }, {
        $pullAll: {
            images : req.body.images
        }
    }).exec()
    return res.json(product)
})

interface ProductInterface{
    title: string,
    desciption: string,
    sku: string,
    images: [string],
    status: string,
    price: number,
    discount: number,
    quantity: number,
    is_active: boolean,
    category: [string]
    specifications: any
}