import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },

    // need to make sure that the values are unique while inserting with ( $addToSet )
    subCategoryName: [{
        type: String
            // no need for unique since mongodb can't enforce unique check on a single document
            // ,
            // unique: true,
            // sparse: true
    }],

    description: {
        type: String,
        maxlength: 500
    },

    isPopular: {
        type: Boolean,
        default: false
    },
    image: {
        path: {
            type: String,
            // default: '../client/public/uploads/user.png'
        },
        contentType: {
            type: String,
            default: 'image/jpeg'
        }
    },
});


const Category = mongoose.model(`Category`, CategorySchema);

export default Category;