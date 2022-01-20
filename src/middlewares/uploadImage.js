import multer from 'multer';
import S3 from 'aws-sdk/clients/s3.js';
import * as fs from 'fs';

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });


const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})


const upload = (file) => {
    const fileStream = fs.createReadStream(file.path);


    return s3.upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file.filename
    }).promise()
}


const download = async (userId) => {
    try {    
        const downloadParams = {
            Key: `${userId}.jpeg`,
          Bucket: process.env.AWS_BUCKET_NAME
        }
    
        const ret = await s3.getObject(downloadParams).createReadStream();
        
        return ret;
    
    } catch (e) {
        return;
    }
}


const imageUpload = ( folder  ) => async (req,res,next)=>{
    
    var storage = await multer.diskStorage({
        // destination: function (req, file, cb) {
        //     cb(null, `./src/uploads/${ folder }`);
        // },
        filename: function (req, file, cb) {
            let name = ( folder == 'category' )? req.body.categoryName : req.user?._id;
            let imageName =   String(name) +"." + file.mimetype.split('/')[1];
            //imageName += "_randomstring"
            cb(null, imageName);
        }
    });
    

    const upload = multer({
        storage,
        fileFilter: (req,file,cb) => {
            if( file.mimetype == "image/jpeg" || file.mimetype == "image/png" ){
                cb(null, true);
            }
            else {
                cb( null, false );
            }
        }
    });
    
    let uploadFile = upload.single('image');
    
    uploadFile(req, res, function (err) {
        next();
    });
}

export {
    upload,
    imageUpload,
    download
};