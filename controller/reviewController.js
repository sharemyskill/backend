// var { Review } = require('../db/models/Review');
import * as reviewInterface from '../db/interface/reviewInterface.js';

const handlePOSTAddReview = async(req, res, next) => {
    try {

        if( req.user.type != 'buyer' || req.user._id != req.body.buyer ){
            return res.status(400).send({
                data: null ,
                status: "Exception",
                message: "This user can not post review"
            });
        }

        const reviewQueryResult = await reviewInterface.addReview(req.body);
        if (reviewQueryResult.status == 'OK') {
            return res.status(200).send(reviewQueryResult);
        }
        return res.status(400).send(reviewQueryResult);
    } catch (e) {
        console.log('In here: ' + e);
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message,
        });
    }
};
const handleGETAllReviews = async(req, res, next) => {
    try {
        const reviewQueryResult =
            await reviewInterface.allReviewsForSpecificSkiller(req.params.skillerId);
        if (reviewQueryResult.status == 'OK') {
            return res.status(200).send(reviewQueryResult);
        }
        return res.status(400).send(reviewQueryResult);
    } catch (e) {
        console.log('In handleGETAllReviews : ' + e);
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message,
        });
    }
};

const handleGETAvgRatingOfSkiller = async(req, res, next) => {
    try {
        const avgQueryResult = await reviewInterface.avgRatingForSpecificSKiller(
            req.params.skillerId
        );
        if (avgQueryResult.status == 'OK') {
            return res.status(200).send(avgQueryResult);
        }
        return res.status(400).send(avgQueryResult);
    } catch (e) {
        console.log('In handleGETAllReviews : ' + e);
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message,
        });
    }
};

export { handlePOSTAddReview, handleGETAllReviews, handleGETAvgRatingOfSkiller };
