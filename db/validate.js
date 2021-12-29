import mongoose from 'mongoose';
// const urlRegex = require('url-regex-safe');

import moment from 'moment';
moment().format();

import pkg from 'validator';
const { isEmail, isMobilePhone } = pkg;

// const validateURL = (url) => {
//     if (!urlRegex({exact: true}).test(url)) {
//         throw new mongoose.Error('Invalid Image Url');
//     }
// }

const validateEmail = (email) => {
  if (!isEmail(email)) {
    throw new mongoose.Error('Invalid Email');
  }
};

const validatePhone = (phone) => {
  if (!isMobilePhone(phone)) {
    throw new mongoose.Error('Invalid Phone Number');
  }
};

const validateAge = (date) => {
  let now = moment();
  let birthDate = moment(date);
  let age = moment.duration(now.diff(birthDate)).asYears();

  if (age < 18) {
    throw new mongoose.Error('User must be at least 18 year old');
  }
};

const validateCoords = (coordinates) => {
  // longitude must be within bounds
  if (coordinates.lng > 180 || coordinates.lng < -180) {
    throw new mongoose.Error('Invalid longitude');
  }
  // latitude must be within bounds
  if (coordinates.lat > 90 || coordinates.lat < -90) {
    throw new mongoose.Error('Invalid latitude');
  }
};

const validateMinMax = (object) => {
  if (object.min > object.max) {
    throw new mongoose.Error('Invalid Min Max Value');
  }
};

const validateString = (string) => {
  if (string.trim().length === 0) {
    throw new mongoose.Error('String can not be empty');
  }
};

const validateDetails = (string) => {
  if (string.trim().length === 0) {
    throw new mongoose.Error('String can not be empty');
  }

  if (string.length > 120) {
    throw new mongoose.Error('String can not be longer than 120 characters');
  }
};

const validateProjectPrice = (val) => {
  return val <= 1000000 && val > 100;
};

const validateDriveURL = ( val )=>{
  const reg = /https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/;

  return reg.test( val );
}

export {
  validateAge,
  validateEmail,
  validatePhone,
  // validateURL,
  validateCoords,
  validateMinMax,
  validateString,
  validateDetails,
  validateProjectPrice,
  validateDriveURL
};

// module.exports = {
//     validateAge,
//     validateEmail,
//     validatePhone,
//     validateURL,
//     validateCoords,
//     validateMinMax,
//     validateString,
//     validateDetails
// }
