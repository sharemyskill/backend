import * as userInterface from '../db/interface/userInterface.js';
import * as categoryInterface from '../db/interface/categoryInterface.js';

/* eslint-disable */

/**
 * @description this method toggles the popularity of category or skiller in the database
 * @route - PUT /api/admin/toggle?field=skiller/category
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handlePUTTogglePopularity = async (req, res, next) => {
  try {
    let queryResult;

    if (req.query.field == 'skiller') {
      queryResult = await userInterface.togglePopularity(req.body.id);
    } else if (req.query.field == 'category') {
      queryResult = await categoryInterface.togglePopularity(req.body.id);
    }

    if (queryResult.status == 'OK') {
      return res.status(200).send(queryResult);
    }

    return res.status(400).send(queryResult);
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

export { handlePUTTogglePopularity };
