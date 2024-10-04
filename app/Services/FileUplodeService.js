import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const UploadSingleFileService = async (req) => {


    try {
        // 'file' is the name attribute in the form
        const uploadedFile = req.files.file;

        // Set upload path
        const uploadPath = path.join(__dirname, '../../uploads', Date.now() + "-" + uploadedFile.name);


        // Use the mv() method to place the file on the server
        await uploadedFile.mv(uploadPath, (err) => {
            if (err) {
                return { status: true, data: "Error occurred while uploading the file." };
            }
        });
        return { status: 200, data: "File uploaded successfully!" };
    }
    catch (err) {
        return { status: false, data: err.toString() };
    }
}

export const ReadFileService = async (req) =>{

    const filename = req.params.fileName;
    return path.join(__dirname, '../../uploads', filename);

}

export const SingleDeleteService = async (req) =>{

    const filename = req.params.fileName;
    const filePath = path.join(__dirname, '../../uploads', filename);

    try{
        fs.unlink(filePath, (err) => {

            if (err) {
                return {status: "500", mas:'Error Deleting File', error: err.toString()};
            }
        })
        return { status: true, data: "File deleted successfully!" };
    }
    catch (e){
        return {Error:e.toString()}
    }
}