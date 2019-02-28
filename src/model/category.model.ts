import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
const categorySchema =  new mongoose.Schema({
    name: {
        type : String,
        unique: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    sub_category: [{
        name: {
            type : String,
            unique: true
        }
    }]
}, {
    timestamps: true
})
categorySchema.plugin(paginate)
categorySchema.index({ 'name': "text", is_active: 1, 'sub_category.name': 'text' })
export const Category = mongoose.model('Category', categorySchema)
