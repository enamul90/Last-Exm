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

        let data = await userModel.create(reqBody)

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

export const logOutService =  async (req, res)=>{

    try{
        let user_id = new ObjectId(req.headers.user_id.user_id);

        let matchingStage =  {$match: {_id:user_id}}
        let count = {$count:"total"};

        let data = await userModel.aggregate([
            matchingStage,
            count
        ])

        if(data[0]['total'] > 0){
            res.clearCookie('token');
            return {status:200,message:"logout success"};
        }
        else {
            return {status:400, message: "Something went wrong"};
        }
    }
    catch (err){
        return {status:Error , msg: err.toString() }
    }

}

export const verifyEmailService =  async (req)=>{

    let email = req.params.email
    let otp = Math.floor(100000 + Math.random() * 900000);

    try{

        let UserCount = await userModel.aggregate([
            { $match: { email: email } },
            { $count: "total" },
        ]);


        if (UserCount[0].total === 1) {
            //Create OTP
            await OTPModel.updateOne(
                {email: email},
                {
                    otp,
                    status: 0,
                },
                {upsert: true, new: true}
            );


            // Send Email email, code
            let EmailTo=email;
            let EmailTest=otp.toString();
            let EmailSubject = "This Email Provide OTP"



            await SendEmail(
                EmailTo,
                EmailTest,
                EmailSubject,

            )

            return{status:200,message:"verify email address",};
        }

    }
    catch (e){
        return {status:400, message:e.toString()}
    }
}

export const verifyOTPService =  async (req)=>{

    let email = req.params.email.toLowerCase()
    let otp = req.params.otp
    otp = parseInt(otp)

    try{
        let matchingStage = {$match:{email:email, otp:otp, status:0}}
        let count = {$count:"total"};

        let OTPCount = await OTPModel.aggregate(
            [
                matchingStage,
                count
            ]
        );


        if(OTPCount[0]['total'] > 0){

            await OTPModel.updateOne({email:email, otp:otp, status:0}, {status:1});
            return {status: "200" , message:"OTP verification success"};
        }

    }

    catch (e){
        return {status: "error", msg: e.toString() }
    }

}

export const resetPasswordService =  async (req)=>{

    let email = req.params.email.toLowerCase()
    let otp = req.params.otp
    otp = parseInt(otp)

    try {
        let  matchingStage = {$match:{email:email, otp:otp, status:1}}
        let count = {$count:"total"}

        let UserCount = await OTPModel.aggregate([
            matchingStage,
            count
        ]);
        // console.log(UserCount[0]['total'])

        if(UserCount[0]['total'] > 0){

            await OTPModel.updateOne({email:email, otp:otp, status:1}, {status:null, otp:null});
            return {status:"200" , message:"OTP verification success"};
        }
    }
    catch (e){
        return {status:"fail",message:e.toString()}
    }

}