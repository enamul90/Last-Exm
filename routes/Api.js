import express from 'express';
const router = express.Router();

import * as UserController from '../app/controllers/UserController.js';
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
import * as UploadFile from "../app/controllers/FileUplodeController.js"



// user management  Api

router.post('/register',UserController.registerController)
router.get('/login',UserController.loginController)
router.get('/read-user', AuthMiddleware,UserController.readUserController)
router.get('/update-profile', AuthMiddleware,UserController.UpdateProfileController)

router.get('/update-profile', AuthMiddleware,UserController.UpdateProfileController)
router.post('/upload-single-file',  UploadFile.UploadSingleFile)
router.get('/read-file/:fileName',UploadFile.ReadFile)
router.delete('/delete-single-file/:fileName',UploadFile.SingleDelete)



export default router;