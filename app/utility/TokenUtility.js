import {JWT_EXPIRES, JWT_KEY} from "../config/config.js";
import jwt from "jsonwebtoken";

export const TokenEncode = (email,user_id)=>{
    const KEY=JWT_KEY
    const EXPIRES={expiresIn:JWT_EXPIRES}
    const PAYLOAD={email:email, user_id:user_id}

    return jwt.sign(PAYLOAD,KEY,EXPIRES)

}

export const TokenDecode = (token)=>{
    try{
        return jwt.verify(token,JWT_KEY)
    }
    catch (e){
        return null
    }
}