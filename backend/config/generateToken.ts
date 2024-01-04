import jwt from "jsonwebtoken"
import { ObjectId } from "mongoose"

export const generateToken = ( id : any) => {
    return jwt.sign({id},process.env.JWT_SECRET , {
        expiresIn : "30d"
    })
}