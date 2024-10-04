import nodemailer from "nodemailer";
import {EMAIL_HOST, EMAIL_PASS,  EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER} from "../config/config.js";

const SendEmail=async(EmailTo, EmailText, EmailSubject)=>{


    let transporter = nodemailer.createTransport({

        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure:EMAIL_SECURITY,
        auth:{
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized:false,
        }

    })



    let mailOptions={
        from:'"Basic OTP" <noreplay@enamul.xyz>',
        to:EmailTo,
        subject:EmailSubject,
        html:`              
              <!DOCTYPE html>
              <html lang="en">
              <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h2 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        .otp-box {
            text-align: center;
            background-color: #f1f1f1;
            padding: 15px;
            margin: 20px 0;
            font-size: 30px;
            letter-spacing: 5px;
            font-weight: bold;
            color: #333;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
              <body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h2>Your One-Time Password </h2>
        </div>

        <!-- Content -->
        <div class="content">
            <p>We received a request to verify your identity for. Please use the following OTP to complete the verification process:</p>

            <!-- OTP Box -->
            <div class="otp-box">
                ${EmailText}
            </div>

            <p>This OTP is valid for the next. For security reasons, do not share this OTP with anyone.</p>
            <p>If you did not request this, please ignore this email or contact our support team immediately.</p>
            <p>Thank you for choosing .
        </div>

    </div>
</body>
              </html>
              `,


    }


    return  await transporter.sendMail(mailOptions);

}




export default SendEmail;

