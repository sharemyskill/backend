import User from '../../db/models/User.js'

// checks if the user is admin type
const checkIfAdmin = () => async ( req, res , next ) =>  {
    
    try {
        const user = await User.findById( req.user.uid , 'type');


        if( user && user.type == 'admin' ){
            next();
        }

        else {
            return res.status(400).send({
                data: null,
                message: 'Non admins can not access this route',
                status: 'ERROR'
            });
        }
        
    }catch( e ){
        return res.status(500).send({
            data: null,
            message: e.message,
            status: 'EXCEPTION'
        });
    }

}


//user is checked for their self 
//will have id in the params
// will come after auth middleware - since we need to makes sure the user is signed in
const userCheck = async ( req,res,next ) =>{
    try{
        //self check
        if( req.user?._id == req.params.id ){
            req.self = true;
        }
        // skiller to buyer or buyer to buyer
        else {
            
            req.self = false;
            
        }

        next();
    }catch(e){
        return res.status(500).send({
            data: null,
            message: e.message,
            status: 'EXCEPTION'
        });
    }
}


export {
     checkIfAdmin,
     userCheck
}