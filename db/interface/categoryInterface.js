/* eslint-disable */
import Category from '../models/Category.js';
// import * as imageUpload from '../../src/middlewares/uploadImage';
/**
 * @description list of all categories
 * @returns all categories
 */
const getAllCategories = async (popular, limitCount, sortBy) => {
  try {
    let categories;

    if (popular) {
      categories = await Category.find(popular).limit(limitCount);
    } else {
      categories = await Category.find();
    }

    if (categories.length != 0) {
      return {
        data: categories,
        status: 'OK',
        message: `All categories found from the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No categories have been found from the database`,
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

/**
 * @description toggle category popularity
 * @returns category
 */
const togglePopularity = async (id) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      [{ $set: { isPopular: { $not: '$isPopular' } } }],
      {
        new: true,
      }
    );

    if (category) {
      return {
        data: category,
        status: 'OK',
        message: `category popularity has been toggled in the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No categorys popularity toggled in the database`,
    };
  } catch (e) {
    return {
      data: null,
      status: 'EXCEPTION',
      message: e.message,
    };
  }
};

/**
 * @description create new category
 * @returns new category
 */
const createCategory = async (body, filename, mimetype) => {
  try {
    const categories = await Category.create({
      categoryName: body.categoryName,
      subCategoryName: body.subCategoryName,
      image: {
          path: './src/uploads/category/' + filename,
          contentType: mimetype
      },
    });

    if (categories.length != 0) {
      return {
        data: categories,
        status: 'OK',
        message: `New Category added to the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No categories added to the database`,
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
 * @description list of all categories
 * @returns a category found by it's id
 */
const getCategoryById = async (categoryId) => {
  try {
    const category = await Category.findById(categoryId);

    if (category) {
      return {
        data: category,
        status: 'OK',
        message: `Desired Category found from the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No category has been found from the database`,
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
 * @description add subcategories
 * @returns add a subcategory in a category found by it's id
 */
const updateSubCategory = async (categoryId, body) => {
  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        // add to set allows unique values in an array
        $addToSet: {
          subCategoryName: body.subCategoryName,
        },
      },
      {
        new: true,
      }
    );

    if (category) {
      return {
        data: category,
        status: 'OK',
        message: `SubCategory added to category in the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No subcategory was added to the database`,
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
 * @description list of searched categories
 * @returns category result
 */
const searchCategory = async (text) => {
  try {
    const searchResults = await Category.find({
      $or: [
        { categoryName: new RegExp(text, 'i') },
        { subCategoryName: new RegExp(text, 'i') },
      ],
    });

    if (searchResults) {
      return {
        data: searchResults,
        status: 'OK',
        message: `Categories Found from the database`,
      };
    }

    return {
      data: null,
      status: 'ERROR',
      message: `No category found from the database`,
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
  getAllCategories,
  getCategoryById,
  createCategory,
  updateSubCategory,
  togglePopularity,
  searchCategory,
};
