import { decodeToken } from '../lib/firebase.js';
import User from '../../db/models/User.js'

/**
 * @description this method decodes the token & sets the user only if the user is already in the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const authMiddleware = async (req, res, next) => {
  const token = req.headers['x-firebase-token'];
  if (!token) {
    return res.status(401).json({
      error: 'No token provided',
    });
  }

  const user = await decodeToken(token);
  if (!user) {
    return res.status(401).json({
      error: 'Invalid token',
    });
  }

  // check if user is in the database
  const userQueryResult = await User.findById( user.uid );

  if( !userQueryResult ){
    return res.status(401).json({
      
      error: 'User not authenticated',
    });
  }

  req.user = userQueryResult;
  next();
};



/**
 * @description this method only decodes the token and sets the user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const firebaseMiddleware = async (req, res, next) => {
  const token = req.headers['x-firebase-token'];
  if (!token) {
    return res.status(401).json({
      error: 'No token provided',
    });
  }

  const user = await decodeToken(token);
  if (!user) {
    return res.status(401).json({
      error: 'Invalid token',
    });
  }

  req.user = user;
  next();
};


/**
 * @description this method sets the user if someone is signed in otherwise avoids it
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 export const publicMiddleware = async (req, res, next) => {
  const token = req.headers['x-firebase-token'];
  if (!token) {
    next();
  }

  else {
    const user = await decodeToken(token);
    if (!user) {
      return res.status(401).json({
        error: 'Invalid token',
      });
    }

    // check if user is in the database
    const userQueryResult = await User.findById( user.uid );

    if( !userQueryResult ){
      return res.status(401).json({
        error: 'User not authenticated',
      });
    }

    req.user = userQueryResult;
    next();
  }
};