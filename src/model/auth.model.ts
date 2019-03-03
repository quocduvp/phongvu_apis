import mongoose, {Schema} from 'mongoose'

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: Number
})

export const Auth = mongoose.model("Auth", authSchema)

