import mongoose, {Schema} from 'mongoose'
import paginate from 'mongoose-paginate-v2'
const orderSchema =  new mongoose.Schema({
    buyer: {
        type: Schema.Types.ObjectId, ref: 'Buyer'
    },
    status: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    total_amount: Number,
    description: String,
    charge_id: String
}, {
    timestamps: true
})
orderSchema.plugin(paginate)

export const Order = mongoose.model('Order', orderSchema);