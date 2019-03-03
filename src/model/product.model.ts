import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    desciption: {
        type: String,
        default: null
    },
    sku: {
        type: String,
        default: null
    },
    images: [String],
    status: String,  // ['pending', 'empty', 'selling', 'sales']
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        max: 100,
        min: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    is_active: {
        type: Boolean,
        default: true
    },
    category: [String],
    specifications: {
        type: mongoose.SchemaTypes.Mixed,
        default: null
    }
},{
    timestamps: true
})
productSchema.plugin(paginate)
export const Product = mongoose.model('Product', productSchema)