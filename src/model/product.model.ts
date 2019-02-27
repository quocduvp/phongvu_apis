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
    quantity: {
        type: Number,
        default: 0
    }
})