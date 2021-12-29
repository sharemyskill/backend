import * as userInterface from '../db/interface/userInterface.js';
import * as categoryInterface from '../db/interface/categoryInterface.js';
import * as orderInterface from '../db/interface/orderInterface.js';

const handleGETsearchUser = async (req, res, next) => {
  try {
    let queryResult;

    if (req.user?.type == 'skiller') {
      //skiller can only search the buyers they have interacted with
      queryResult = await orderInterface.searchOrders(
        req.user._id,
        req.query.text
      );

      queryResult = {
        users: queryResult.data,
        status: queryResult.status,
        message: queryResult.message,
      };
    } else {
      //buyer can search both skillers and categories ( no orders shown for buyer )
      queryResult = await userInterface.getSearchedUsers(
        'skiller',
        req.query.text
      );

      const categoryQueryResult = await categoryInterface.searchCategory(
        req.query.text
      );

      queryResult = {
        users: queryResult?.data,
        categories: categoryQueryResult?.data,
        status:
          queryResult.status == 'OK' || categoryQueryResult.status == 'OK'
            ? 'OK'
            : 'ERROR',
        message: queryResult.message + categoryQueryResult.message,
      };
    }

    if (queryResult.status == 'OK') {
      return res.status(200).send(queryResult);
    }
    return res.status(400).send(queryResult);
  } catch (e) {
    console.log('In handleGETsearchUser : ' + e);
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};
export { handleGETsearchUser };
