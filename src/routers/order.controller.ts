import { Router } from 'express'
import { Order, Product } from '../model'
export const orderRouter = Router()

orderRouter.get("/list", async (req, res) => {
    const { status = "", search = "", page = 1, limit = 10, sort = "-createdAt" } = req.query
    const order = await Order.paginate({
        status: { $regex: status, $options: 'i' }
        }, {
            page: Number(page),
            limit: Number(limit),
            lean: true,
            sort: sort,
            populate: ["buyer"]
        })
    return res.json(order)
})

orderRouter.get("/details/:id", async (req, res) => {
    const { id = "" } = req.params
    const order = await Order.findById(id).populate("products").populate('buyer').lean().exec()
    return res.json(order)
})

orderRouter.post("/check-status/:id", async (req, res) => {
    const { status = "PENDING" } = req.body
    const { id } = req.params
    const arrStatus = ['PENDING', 'CANCEL', 'SUCCESS']
    const upperStatus = status.toUpperCase()

    try {
        if (arrStatus.find(v => v === upperStatus)) {
            await Order.updateOne({
                _id: id
            }, {
                    status: upperStatus
                })
            return res.json({ "message": `Order is checked status ${status}` })
        }

        return res.json({ "error": "Action error." }).status(400)
    } catch (e) {
        return res.json({ "error": e }).status(400)
    }
})