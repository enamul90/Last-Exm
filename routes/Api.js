import express from 'express';
const router = express.Router();

import * as UserController from '../app/controllers/UserController.js';
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";








// user management  Api

router.post('/register',UserController.registerController)
router.get('/login',UserController.loginController)
router.get('/read-user', AuthMiddleware,UserController.readUserController)
router.get('/logOut', AuthMiddleware,UserController.logOutController)
router.get('/verify-email/:email',UserController.verifyEmailController)
router.get('/verify-OTP/:email/:otp',UserController.verifyOTPController)
router.get('/reset-password/:email/:otp',UserController.resetPasswordController)






export default router;