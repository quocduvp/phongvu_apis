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
        name: String
    }]
}, {
    timestamps: true
})
categorySchema.plugin(paginate)
export const Category = mongoose.model('Category', categorySchema)
