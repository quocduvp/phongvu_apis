import { Router } from 'express'
import { Category } from '../model'
import { verifyToken } from '../config/jwt.config';
const categoryRouter = Router()

categoryRouter.post("/create", verifyToken, async (req, res) => {
    const data = <CategoryInterface> req.body 
    const category = await Category.create(data)
    res.json(category)
})

categoryRouter.get("/list", async (req, res) => {
    const { search =""} = req.query
    const category = await Category.find({
        is_active: true
    }).where('name').regex(search).lean().exec()
    return res.json(category)
})

categoryRouter.put("/update/:id", verifyToken, async (req, res) => {
    const data = <CategoryInterface> req.body 
    const category = await Category.updateOne({
        _id: req.params.id
    }, data).exec()
    res.json(category)
})

categoryRouter.put("/deactive/:id", verifyToken,async (req,res) => {
    const category = await Category.updateOne({
        _id: req.params.id
    }, {
        is_active: false
    }).exec()
    res.json(category)
})

categoryRouter.put("/active/:id", verifyToken,async (req,res) => {
    const category = await Category.updateOne({
        _id: req.params.id
    }, {
        is_active: true
    }).exec()
    res.json(category)
}).get("/details/:id", verifyToken, async (req,res)=> {
    const category = await Category.findById(req.params.id).exec()
    res.json(category)
})

// update sub category
categoryRouter.post("/create/:id/sub_category", verifyToken, async (req,res) => {
    const { name = "" } = req.body
    const category = await Category.updateOne({
        _id: req.params.id 
    },{
        $push: { sub_category: {name : name} }
    }).exec()
    return res.json(category)
})

categoryRouter.put("/update/:id/sub_category/:sub_id", verifyToken, async (req,res) => {
    const { name = "" } = req.body
    const category = await Category.updateOne({
        _id: req.params.id,
        'sub_category._id': req.params.sub_id
    },{
        $set: { 'sub_category.$': {name : name} }
    }).exec()
    return res.json(category)
})

// delete subcaterogy
categoryRouter.delete("/delete/:id/sub_category/:sub_id", verifyToken, async (req,res) => {
    const category = await Category.updateOne({
        _id: req.params.id,
    },{
        $pull: { 'sub_category': { _id: req.params.sub_id } }
    }).exec()
    return res.json(category)
})

interface CategoryInterface{
    name : string,
    is_active : boolean,
    sub_category : Array<SubcategoryInterface>
}

interface  SubcategoryInterface{
    name : string
}
export { categoryRouter }