/* eslint-disable */
import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
    skiller: {
        type: String,
        ref: 'User',
        required: true,
    },
    buyer: {
        type: String,
        ref: 'User',
        required: true,
    },
    
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        unique: true // making sure that a single order can not have more than one rating
    },

    review: {
        type: String,
        maxlength: 100,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
        immutable: true // making it immutable so that the rating can't later be changed
    },

    issueDate: {
        type: Date,
        default: Date.now
    }
});


ReviewSchema.statics.getAverageRating = async function ( userId ) {
    const obj = await this.aggregate([
        {
            $match : { skiller : userId }
        },
        {
            $group : {
                _id : '$skiller',
                averageRating : {$avg : '$rating'}
            }
        }
    ]);

    try {
        await this.model('User').findByIdAndUpdate( userId , {
            rating : obj[0].averageRating 
        });
    }catch( err ){
        console.error(err);
    }
}


ReviewSchema.pre('save' , async function(next) {
    const order = await this.model('Order').findOneAndUpdate( {
        _id: this.orderId,
        buyer: this.buyer,
        skiller: this.skiller,
        rating: -1 ,// multiple rating can't be posted,
        orderStatus: {
            $in: ['accepted' , 'completed' ]
        }
        
    } , {
        rating: this.rating
    },{
        new: true
    });

    if( order )
        next();
    else 
        throw new Error('something went wrong');
})

ReviewSchema.post('save', async function(){
    this.constructor.getAverageRating( this.skiller );
    
});


const Review = mongoose.model(`Review`, ReviewSchema);
export default Review;