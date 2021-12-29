import multer from 'multer';


const imageUpload = ( folder  ) => async (req,res,next)=>{
    
    var storage = await multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./src/uploads/${ folder }`);
        },
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

export default imageUpload;