import {
    loginService,
    readUserService,
    registerService,  UpdateProfileService,

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


export const UpdateProfileController = async (req, res) => {
    let result = await UpdateProfileService (req)
    return res.json(result)
}

