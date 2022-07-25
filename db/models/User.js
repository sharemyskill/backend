/* eslint-disable */

import mongoose from 'mongoose'



import { validateString, validatePhone, validateEmail, validateDriveURL } from '../validate.js';
import Category from '../models/Category.js';


const UserSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        validate: {
            validator: validateString,
            msg: 'Invalid User Name'
        }
    },

    type: {
        type: String,
        enum: ['admin', 'buyer', 'skiller'],
        default: 'buyer' 
    },

    category: {
        type: [String],
        // validate: {
        //     validator: async function( val ) {
        //         if( !val ) 
        //             return true;
        //         const categoryQueryResult = await Category.findOne({
        //             categoryName: val
        //         });
                
        //         if( categoryQueryResult )
        //             return true;
        //         return false;
        //     },
        //     message: "This category doesn't exist"
        // }

        validate: {
            validator: async function ( val ){
                if( val.length > 2 ) 
                    return false;
                return true;
            },
            message: "A skiller can't helm from more than 2 categories"
        }
    },

    subcategory: {
        type: [String],
        // validate: {
        //     validator: async function( val ) {
        //         if( !val ) 
        //             return true;
                
        //         const categoryQueryResult = await Category.findOne({
        //             subCategoryName: val
        //         });
                
        //         if( categoryQueryResult )
        //             return true;
        //         return false;
        //     },
        //     message: "This sub-category doesn't exist"
        // }
    },

    description: {
        type: String,
        maxlength: 150
    },
    whatsapp: {
        type: String,
        validate: {
            validator: validatePhone,
            msg: 'Invalid Mobile No'
        }

    },
    joinDate: {
        type: Date,
        default: Date.now(),
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validateEmail,
            msg: 'Invalid Email'
        }
    },
    bkash: {
        type: String,
        validate: {
            validator: validatePhone,
            msg: 'Invalid Mobile No'
        }
    },

    rating: {
        type: Number,
        default: 1
    },

    isPopular: {
        type: Boolean,
        default: false
    },


    longDescription: String,

    location: {
        type: String,
        enum: ['Barisal', 'Dhaka', 'Khulna', 'Rajshahi', 'Rangpur', 'Mymenshingh', 'Sylhet', 'Chittagong']
    },

    projectDescriptions: {
        type: [String],
        maxItems: 3
    },

    projectPrice: {
        type: [Number],
        maxItems: 3,
        // validate: [{
        //     validator: validateProjectPrice,
        //     msg: 'Projet Price not within range'
        // }]
    },


    // projectDuration: {
    //     type: [Number],
    //     maxItems: 3, //small, medium, large
    // },

    portfolio: {
        type: [{
            name: {
                type: String,
                maxlength: 150,
                required: true
            },

            category: {
                type: String
            },

            subcategory: {
                type: String
            },
        
            price: {
                type: Number,
                min: 0
            },
        
            size: {
                type: String,
                enum: ['small', 'medium', 'large'],
                default: 'small'
            },
        
            link: {
                type: String,
                validate: {
                    validator: validateDriveURL,
                    message: "This is not a proper url"
                }
            }
        }]
    },

    image: {
        type: Boolean,
        default: false
    },

    isSkillerProfileCompleted: {
      type: Boolean,
      default: false
    }

    // image: {
    //     path: {
    //         type: String,
    //         // default: '../client/public/uploads/user.png'
    //     },
    //     contentType: {
    //         type: String,
    //         default: 'image/jpeg'
    //     }
    // }


});


const User = mongoose.model(`User`, UserSchema);


export default User;