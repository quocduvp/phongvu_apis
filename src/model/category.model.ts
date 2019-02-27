import mongoose from 'mongoose'

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

export const Category = mongoose.model('Category', categorySchema)
