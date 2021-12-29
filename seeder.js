/* eslint-disable */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

/**Models go here */
import User from './db/models/User.js';
import Order from './db/models/Order.js';
import Review from './db/models/Review.js';
import Category from './db/models/Category.js';
import Notification from './db/models/Notification.js';
import Transaction from './db/models/Transaction.js';

//Connect DB
mongoose.connect(process.env.MONGODB_URI);

/**Load Seeder Data here */
// let users = require('./seeder_data/user_data.json')
// import * as users from './seeder_data/user_data.json'
import { createRequire } from 'module'; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const users = require('./seeder_data/user_data.json'); // use the require method
const orders = require('./seeder_data/order_data.json'); // use the require method
const reviews = require('./seeder_data/review_data.json'); // use the require method
const transactions = require('./seeder_data/transaction_data.json'); // use the require method
const categories = require('./seeder_data/category_data.json'); // use the require method
const notifications = require('./seeder_data/notification_data.json'); // use the require method

// console.log(users);

// Import data to database
const importData = async () => {
  try {
    /**create table from data here */
    
    await Category.create(categories); // needs to be seeded before user since user schema is validated using this schema
    await User.create(users);
    await Order.create(orders);
    await Notification.create(notifications);
    await Transaction.create(transactions);
    await Review.create(reviews);

    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//Delete data
const deleteData = async () => {
  try {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany();
    }

    console.log('Data Deleted...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData(); //node seeder.js -d
} else if (process.argv[2] === '-d') {
  const db = mongoose.connection;

  db.once('open', () => {
    deleteData();
  });
}
