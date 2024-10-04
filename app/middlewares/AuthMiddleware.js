import {TokenDecode, TokenEncode} from "../utility/TokenUtility.js";

import * as Config from "../config/Config.js";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export default (req, res, next)=>{

    let token = req.cookies['token']
    let decoded = TokenDecode(token)

    if(decoded===null){
        res.status(401).json({status:'fail',message:"unauthorized"})
    }

    else{
        let email = decoded.email;
        let user_id = decoded.user_id;

        req.headers.email=email;
        req.headers.user_id=user_id;

        let decodedEmail = decoded["email"]['email'];
        let decodedUserID = new ObjectId(decoded["user_id"]['user_id']);

        let newToken = TokenEncode({ email:decodedEmail},{user_id:decodedUserID});

        let option={
            maxAge:Config.JWT_EXPIRES,
            httponly:true,
            sameSite:"none",
            secure:true,
        }

        res.cookie("token",newToken,option);

        next()
    }

}
