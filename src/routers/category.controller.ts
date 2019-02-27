import { Router } from 'express'

const categoryRouter = Router()

categoryRouter.get("/", async (req, res) => {
    res.json({})
})

export { categoryRouter }