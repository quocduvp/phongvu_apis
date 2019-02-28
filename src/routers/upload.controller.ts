import { Router } from 'express'
import multer from 'multer'
import { uploadImageToStorage } from '../config/cloudinary.config';

export const uploadRouter = Router()

// Upload
const formdata = multer({storage: multer.diskStorage({
    filename: function (req, file, callback) { 
        const ori =  file.originalname
        callback(null, ori.substring(0,(ori.length -4)));
    }}),
    fileFilter: function (req : any, file : any, cb : any) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|ico|svg)$/)) {
            return cb(new Error('Only image files are allowed! ex: jpg|jpeg|png|gif'));
        }
        if(file.size >= 5242880){
            return cb(new Error('More than size!'));
        }
        cb(null, true);
    }
}).single('source')

uploadRouter.post("/image", formdata ,async (req, res) => {
    const file = req.file
    const url = await uploadImageToStorage(file, 'products')
    return res.json({url})
})