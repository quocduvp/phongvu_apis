const cloudinary = require('cloudinary')

const config = {
    cloud_name: 'ebooking',
    api_key: "637941962498751",
    api_secret : "2jKJUtE3cN-CaTCR3s7OMjGeqqk"
}

cloudinary.config(config)

export const uploadImageToStorage = (file : any, folder : string) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.path,{public_id: file.filename,folder: `phongvu/${folder}`},(err : any, result : any)=>{
            if(err) reject(err)
            resolve(<String> result.url)
        })
    })
}