import { Router } from 'express'
import { Category } from '../model/category.model'
const categoryRouter = Router()

categoryRouter.post("/create", async (req, res) => {
    const data = <CategoryInterface> req.body 
    const category = await Category.create(data)
    category
    res.json(category)
}).get("/list", async (req, res) => {
    const category = await Category.paginate({
        is_active: true,
    },{
        sort: "-createdAt",
        lean:     true
    })
    return res.json(category)
}).put("/update/:id", async (req, res) => {
    const data = <CategoryInterface> req.body 
    const category = await Category.updateOne({
        _id: req.params.id
    }, data).exec()
    res.json(category)
}).put("/deactive/:id",async (req,res) => {
    const category = await Category.updateOne({
        _id: req.params.id
    }, {
        is_active: false
    }).exec()
    res.json(category)
}).put("/active/:id",async (req,res) => {
    const category = await Category.updateOne({
        _id: req.params.id
    }, {
        is_active: true
    }).exec()
    res.json(category)
}).get("/details/:id", async (req,res)=> {
    const category = await Category.findById(req.params.id).exec()
    res.json(category)
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