import * as reportInterface from '../db/interface/reportInterface.js';

const handlePOSTaddReport = async(req, res, next) => {
    try {
        const reportQueryResult = await reportInterface.addReport(req.body);
        if (reportQueryResult.status == 'OK') {
            return res.status(200).send(reportQueryResult);
        }
        return res.status(400).send(reportQueryResult);
    } catch (e) {
        console.log('In handlePOSTaddReport: ' + e);
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message,
        });
    }
};

const handleGETallReportsForAUser = async(req, res, next) => {
    try {
        const reportQueryResult = await reportInterface.getAllReportsForAUser(
            req.params.userId
        );
        if (reportQueryResult.status == 'OK') {
            return res.status(200).send(reportQueryResult);
        }
        return res.status(400).send(reportQueryResult);
    } catch (e) {
        console.log('In handleGETallReportsForAUser: ' + e);
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message,
        });
    }
};

const handleGETReportsForAdmin = async(req, res, next) => {
    try {
        const reportQueryResult = await reportInterface.getReportsForAdmin();
        if (reportQueryResult.status == 'OK') {
            return res.status(200).send(reportQueryResult);
        }
        return res.status(400).send(reportQueryResult);
    } catch (e) {
        console.log('In handleGETReportsForAdmin: ' + e);
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message,
        });
    }
};

export {
    handlePOSTaddReport,
    handleGETallReportsForAUser,
    handleGETReportsForAdmin,
};