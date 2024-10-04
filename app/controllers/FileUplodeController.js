
import {UploadSingleFileService, ReadFileService,SingleDeleteService} from "../Services/FileUplodeService.js"

export const UploadSingleFile = async (req, res) => {
    let result = await UploadSingleFileService (req)
    return res.json(result)
}

export const ReadFile = async (req, res) => {
    let result = await ReadFileService (req, res)
    return res.sendFile(result)
}

export const SingleDelete = async (req,res) => {
    let result = await SingleDeleteService (req,res)
    return res.json(result)
}

