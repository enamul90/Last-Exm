import {
    loginService,
    logOutService,
    readUserService,
    registerService, resetPasswordService,
    verifyEmailService,
    verifyOTPService
} from "../Services/UserService.js";





export const registerController = async (req, res) => {
    let result = await registerService (req)
    return res.json(result)
}

export const loginController = async (req, res) => {

    let result = await loginService (req, res)
    return res.json(result)
}


export const readUserController = async (req, res) => {
    let result = await readUserService (req)
    return res.json(result)
}

export const logOutController = async (req, res) => {
    let result = await logOutService (req, res)
    return res.json(result)
}


export const verifyEmailController = async (req, res) => {
    let result = await verifyEmailService (req, res)
    return res.json(result)
}

export const verifyOTPController = async (req, res) => {
    let result = await verifyOTPService (req, res)
    return res.json(result)
}

export const resetPasswordController = async (req, res) => {
    let result = await resetPasswordService (req, res)
    return res.json(result)
}