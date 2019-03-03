import mongoose, {Schema} from 'mongoose'
import paginate from 'mongoose-paginate-v2'
const buyerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    postcode: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})
buyerSchema.plugin(paginate)

export const Buyer = mongoose.model('Buyer', buyerSchema)