import User from '../models/User.js';

/* eslint-disable */

/**
 * @description list of all projects from the skillers portfolio
 * @returns all projects
 */
const getPortfolioForSkiller = async (skillerId) => {
  try {
    const projects = await User.findById(skillerId).select('portfolio');

    if (projects) {
      return {
        data: projects,
        status: 'OK',
        message: `All projects from the portfolio found for the user from the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No projects found from the database`,
    };
  } catch (e) {
    return {
      data: null,
      status: 'EXCEPTION',
      message: e.message,
    };
  }
};

/* eslint-disable */

/* eslint-disable */

/**
 * @description Add projects to portfolio
 * @returns portfolio of a skiller
 */
const addProjectsToPortfolio = async (skillerId, body) => {
  try {
    const projects = await User.findOneAndUpdate({
      _id: skillerId,
    } , {
        $push: { portfolio : body }
    }, {
        new: true,
        runValidators: true
    }).select('portfolio');

    if (projects) {
      return {
        data: projects,
        status: 'OK',
        message: `New Projects have been added to the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No projects added to the database`,
    };
  } catch (e) {
    return {
      data: null,
      status: 'EXCEPTION',
      message: e.message,
    };
  }
};

export { getPortfolioForSkiller, addProjectsToPortfolio };
