import { Router } from 'express'
import { Auth } from '../model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secret_admin } from '../config/jwt.config';
export const authRouter = Router()

authRouter.post("/login", async (req,res) => {
    const { email = "",password="" } = req.body
    const auth = await Auth.findOne({
        email
    }).lean().exec()
    // not found user
    if(!auth) return res.sendStatus(404)

    const checkPass = bcrypt.compareSync(password, auth.password)
    if(checkPass){
        const obj = {
            payload: {
                email: auth.email,
                role: auth.role
            }
        }
        const token = await jwt.sign(obj, secret_admin, { expiresIn: '1days' })
        return res.json({
            token,
            stripe_tok: "pk_test_BHUOafmeJtUMRjSTplsjt9Z9",
            expiresIn: '1days'
        })
    }
    return res.sendStatus(403)
})