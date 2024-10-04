import md5 from 'md5';
import userModel from "../models/UserModel.js";
import * as Token from "../utility/TokenUtility.js";


import mongoose from "mongoose";
import {JWT_EXPIRES} from "../config/Config.js";
import OTPModel from "../models/OTPModel.js";
import SendEmail from "../utility/emailUtility.js"
const ObjectId = mongoose.Types.ObjectId;


export const registerService =  async (req)=>{

    try{
        let reqBody = req.body
        reqBody.password = md5(reqBody.password)

        await userModel.create(reqBody)

        return{status:200,message:"user create success"};

    }
    catch(err){
        return{status:500,message:"user create failed"};
    }

}

export const loginService =  async (req,res)=>{

    try{
        let reqBody = req.body;
        reqBody.email=reqBody.email.toLowerCase();
        reqBody.password = md5(req.body.password);


        let matchingStage= {$match: {email:reqBody.email, password: reqBody.password}}
        let projection = {$project:{"_id":1, "email":1}}

        let data = await userModel.aggregate([
            matchingStage,
            projection,
        ])


        if(data.length>0){
            let token = Token.TokenEncode({ email:data[0]['email']},{user_id:data[0]['_id']});
            let option={
                maxAge:JWT_EXPIRES,
                httponly:true,
                sameSite:"none",
                secure:true,
            };

            res.cookie("token",token,option);

            return {"status":200,message:"login success"};

        }
        else {
            return {status: "User not found"}
        }

    }


    catch (err){
        return {status: "error", msg: err.toString() }
    }

}

export const readUserService =  async (req)=>{

    try{

        let user_id = req.headers.user_id.user_id;
        let Obj_user = new ObjectId(user_id);
        let matchingStage =  {$match: {_id:Obj_user}}
        let projection = {$project:{"_id":0, "password":0, "createdAt":0,"updatedAt":0}}
        let data = await userModel.aggregate([
            matchingStage,
            projection
        ])

        return {status:200,message:"user read success" ,data:data[0]};
    }
    catch (err){
        return {status: "error", msg: err }
    }
}

export const UpdateProfileService =  async (req)=>{

    try{
        let updateDate = req.body;
        let user_id = req.headers.user_id.user_id;
        let Obj_user = new ObjectId(user_id);

        let matchingStage =  {$match: {_id:Obj_user}}
        let count= {$count:'total'}

        let data = await userModel.aggregate(
            [
                matchingStage,
                count
            ]
        )

        if(data[0]['total']===1){
            await userModel.updateOne(
                {_id:Obj_user},
                {firstName:updateDate.firstName, lastName:updateDate.lastName, phone:updateDate.phone,img:updateDate.img})

            return {status:200,message:"profile success",};

        }
        else{
            return {status:"error", msg:"something went wrong"};

        }
    }
    catch (e){
        return {status:false, msg:e.toString()}
    }


}
