import User from '../models/User.js';
import Order from '../models/Order.js';
import Report from '../models/Report.js';

const addReport = async(body) => {
    try {

        const newReport = await Report.create({
            orderId: body.orderId,
            issuerId: body.issuerId,
            detailedReport: body.detailedReport,
        });
        return {
            data: newReport,
            status: 'OK',
            message: `New Report Added in DB`,
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

const getAllReportsForAUser = async(userId, findParams, sortBy) => {
    try {
        const allReports = await Report.find({
                issuerId: userId,
            })
            .populate({
                path: 'issuerId',
                // select: ' ',  /for specific field
            })
            .sort({
                //1 is used for ascending order while -1 is used for descending order.
                issueDate: -1,
                sortBy,
            });
        return {
            data: allReports,
            status: 'OK',
            message: `All Reports send for a specific User from the DB`,
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

const getReportsForAdmin = async() => {
    try {
        const allReports = await Report.find()
            .populate({
                path: 'issuerId',
                // select: ' ',  /for specific field
            })
            .sort({
                //1 is used for ascending order while -1 is used for descending order.
                issueDate: -1,
                status: -1
            });

        return {
            data: allReports,
            status: 'OK',
            message: `All User Reports send for the admin from the DB`,
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



const changeReportStatus = async( reportId ) => {
    try {
        const report = await Report.findByIdAndUpdate(reportId , {
            status: true
        }, {
            new: true
        });

        return {
            data: report,
            status: 'OK',
            message: `Report has been handled`,
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

export { addReport, getAllReportsForAUser, getReportsForAdmin , changeReportStatus};