import * as projectInterface from '../db/interface/projectInterface.js';

/* eslint-disable */

/**
 * @description this method returns all projects from a skiller's portfolio from the database
 * @route - GET /api/project/:skillerId
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handleGETProjectsForASpecificSkiller = async (req, res, next) => {
  try {
    const projectQueryResult = await projectInterface.getPortfolioForSkiller(
      req.params.skillerId
    );

    if (projectQueryResult.status == 'OK') {
      return res.status(200).send(projectQueryResult);
    }

    return res.status(400).send(projectQueryResult);
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

/* eslint-disable */

/**
 * @description this method adds all project to the portfolio from the database
 * @route - PUT /api/project
 * @access - self
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const handleAddProjectsToSkillerPortfolio = async (req, res, next) => {
  try {
    let projectQueryResult = await projectInterface.getPortfolioForSkiller(
      req.user._id
    );

    if (projectQueryResult.data?.portfolio.length < 6) {
      projectQueryResult = await projectInterface.addProjectsToPortfolio(
        req.user._id,
        req.body
      );
    }
    else if(projectQueryResult.data?.portfolio.length >= 6 ) {
        projectQueryResult.message = "Can not add anymore project to the database"
    }

    if (projectQueryResult.status == 'OK') {
      return res.status(200).send(projectQueryResult);
    }

    return res.status(400).send(projectQueryResult);
  } catch (e) {
    return res.status(500).send({
      status: 'EXCEPTION',
      message: e.message,
    });
  }
};

export {
  handleGETProjectsForASpecificSkiller,
  handleAddProjectsToSkillerPortfolio,
};
