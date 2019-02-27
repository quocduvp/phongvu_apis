import mongoose from 'mongoose'

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
    status: {
        enum: ['pending', 'empty', 'selling', 'sales']
    },
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
    specifications: {
        type: mongoose.SchemaTypes.Mixed,
        default: null
    }
})

export const Product = mongoose.model('Product', productSchema)