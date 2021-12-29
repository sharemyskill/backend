import Review from '../models/Review.js';

/***
 * @description add a new review
 * @returns the newly added review
 */
const addReview = async (body) => {
  try {
    const newReview = await Review.create({
      skiller: body.skiller,
      buyer: body.buyer,
      review: body.review,
      rating: body.rating,
      orderId: body.orderId
    });

    return {
      data: newReview,
      status: 'OK',
      message: `New Review Added in DB`,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      status: 'EXCEPTION',
      message: e.message,
    };
  }
};

/***
 * @description list all reviews for a single user
 * @returns all reviews for a specific skiller
 */
const allReviewsForSpecificSkiller = async (skillerId, sortBy, order) => {
  try {
    sortBy = !sortBy ? 'rating' : sortBy;
    order = !order || order == 'desc' ? -1 : 1;

    let sortParam = `{"${sortBy}" : ${order}}`;


    const allReviews = await Review.find({ skiller: skillerId })
      .populate({
        path: 'buyer',
        select: 'name',
      })
      .sort(JSON.parse(sortParam));

    if (allReviews.length != 0) {
      return {
        data: {
          allReviews,
          total: allReviews.length,
        },
        status: 'OK',
        message: `All Reviews send for a specific Skiller from the DB`,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      data: null,
      status: 'EXCEPTION',
      message: e.message,
    };
  }
};

const avgRatingForSpecificSKiller = async (skillerId) => {
  try {
    const avgRating = db.Review.aggregate([
      {
        $group: {
          _id: '$skillerId',
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    return {
      data: avgRating,
      status: 'OK',
      message: `Avg Rating of A Skiller`,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      status: 'EXCEPTION',
      message: e.message,
    };
  }
};

export { addReview, allReviewsForSpecificSkiller, avgRatingForSpecificSKiller };
