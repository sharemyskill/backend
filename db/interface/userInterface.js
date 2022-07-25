import User from '../models/User.js';
import { mongoose } from '../mongoose.js';
import * as fs from 'fs';
import { upload, download } from '../../src/middlewares/uploadImage.js';

/* eslint-disable */

/**
 * @description list of all users
 * @returns all users
 */
const getAllUsers = async (popular, limitCount, sortBy) => {
  if (!limitCount) limitCount = 10;
  try {
    let users = await User.find(popular)
      .sort(sortBy) // sort the users in descending rating and ascending join date
      .limit(limitCount);

    let images = [];
    for (let user of users) {
      if (user.image) {
        images.push(download(user._id));
      }
    }

    if (users.length != 0) {
      return {
        data: users,
        images,
        status: 'OK',
        message: `All users found from the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No users found from the database`,
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

/**
 * @description finds user by id
 * @returns user
 */
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    // const image = await download(userId);
    let image;

    if (user.image) image = await download(userId);
    if (user) {
      return {
        data: user,
        image,
        status: 'OK',
        message: `User found from the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No user found from the database`,
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
 * @description create new user
 * @returns user
 */
const createUser = async (body, signInAs) => {
  try {
    const user = await User.create({
      _id: body.uid,
      email: body.email,
      type: signInAs
    });

    if (user) {
      return {
        data: user,
        status: 'OK',
        message: `User added to the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No user added to the database`,
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

/**
 * @description toggle user popularity
 * @returns user
 */
const togglePopularity = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      [{ $set: { isPopular: { $not: '$isPopular' } } }],
      {
        new: true,
      }
    );

    if (user) {
      return {
        data: user,
        status: 'OK',
        message: `User popularity has been toggled in the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No users popularity toggled in the database`,
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
 * @description register a user
 * @returns newly registered user
 */
const registerUser = async (body, file) => {
  try {
    let user;

    if (file) {
      const img = await upload(file);

      user = await User.findOneAndUpdate(
        { _id: body.id },
        {
          name: body.name,
          type: body.type,
          category: body.type == 'skiller' ? body.category : null,
          subcategory: body.type == 'skiller' ? body.subcategory : null,
          description: body.description,
          whatsapp: body.whatsapp,
          bkash: body.bkash,
          longDescription: body.longDescription,
          location: body.location,
          projectDescriptions: body.projectDescriptions,
          projectPrice: body.projectPrice,
          projectDuration: body.projectDuration,
          image: img ? true : false,
          isSkillerProfileCompleted: true
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      user = await User.findOneAndUpdate(
        { _id: body.id },
        {
          name: body.name,
          type: body.type,
          category: body.category,
          subcategory: body.subcategory,
          description: body.description,
          whatsapp: body.whatsapp,
          bkash: body.bkash,
          longDescription: body.longDescription,
          location: body.location,
          projectDescriptions: body.projectDescriptions,
          projectPrice: body.projectPrice,
          projectDuration: body.projectDuration,
          isSkillerProfileCompleted: true
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    if (user) {
      return {
        data: user,
        status: 'OK',
        message: `User has been added to the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No user added to the database`,
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

/**
 *
 * @param {id of user} id
 * @returns
 */
const getSearchedUsers = async (searchType, text) => {
  try {
    let users = await User.find({
      type: searchType,
      $or: [
        { name: new RegExp(text, 'i') },
        { subcategory: new RegExp(text, 'i') },
        { category: new RegExp(text, 'i') },
      ],
    });

    let images = [];
    for (let user of users) {
      if (user.image) images.push(download(user._id));
    }

    if (users.length != 0) {
      return {
        data: users,
        status: 'OK',
        message: `searched users found from the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No users found from the database`,
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

/* eslint-disable */

/* eslint-disable */

/**
 * @description list of all users of this category or subcategory
 * @returns users
 */
const getUsersSubCategory = async (sub) => {
  try {
    let users = await User.find({
      subcategory: {
        $in: sub,
      },
    });

    let images = [];
    for (let user of users) {
      if (user.image) images.push(download(user._id));
    }

    if (users) {
      return {
        data: users,
        images,
        status: 'OK',
        message: `All users from this category or subcategory found from the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No users found from the database`,
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
 * @description list of all users for this category
 * @returns users
 */
const getUsersFromCategory = async (cat) => {
  try {
    const users = await User.find({
      category: {
        $in: cat,
      },
    });

    let images = [];
    for (let user of users) {
      if (user.image) images.push(download(user._id));
    }

    if (users) {
      return {
        data: users.filter((item) => item.category),
        images,
        status: 'OK',
        message: `All users for this category from the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No users found from the database`,
    };
  } catch (e) {
    return {
      data: null,
      status: 'EXCEPTION',
      message: e.message,
    };
  }
};

export {
  getAllUsers,
  getUserById,
  createUser,
  togglePopularity,
  registerUser,
  getSearchedUsers,
  getUsersSubCategory,
  getUsersFromCategory,
};
