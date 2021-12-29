import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { initializeFirebase, decodeToken } from './lib/firebase.js';
import { authMiddleware } from './middlewares/auth.js';
import rejectRequestEvery2days from './jobs/rejectRequest.js';



import categoryRouter from '../routes/category.js';
import reviewRouter from '../routes/review.js';
import userRouter from '../routes/user.js';
import adminRouter from '../routes/admin.js';
import orderRouter from "../routes/order.js";
import searchRouter from "../routes/search.js";
import notifyRouter from "../routes/notification.js";
import transactionRouter from "../routes/transaction.js";
import reportRouter from "../routes/report.js";
import projectRouter from "../routes/project.js";


initializeFirebase();

const app = express();

app.use(cors());
app.options('*', cors());

import { mongoose } from '../db/mongoose.js'

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log('You are connected to the database.');
}).catch(err => {
    console.log(err.message);
    process.exit();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', authMiddleware, async(req, res) => {
    console.log("In here: " + req.user);

    res.send('hello world');
});

app.use("/api/review", reviewRouter);
app.use("/api/order", orderRouter);
app.use('/api/category', categoryRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/search', searchRouter);
app.use('/api/notify', notifyRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/report', reportRouter);
app.use('/api/project', projectRouter);

rejectRequestEvery2days.start();


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});