// Import dependencies
const Response = require('../../utils/Response').Response;
const ValidateRequest = require('../../utils/ValidateRequest').ValidateRequest;
const User = require('../../models/User').User;
const Certificate = require('../../models/Certificate').Certificate;
const FileLogger = require('../../utils/ErrorLogger').FileLogger;

exports.GetDashboard = async (req, res) => {
    try {
        let certificates = await Certificate.find({ issuer: req.user_id }, 'name link thumb')
        let data = {
            ...req.user,
            certificates
        }

        return Response(res, true, 200, 'User Dashboard fetched successfully', data);
    } catch (error) {
        FileLogger.error('Unable to fetch dashboard', { error });

        return Response(res, false, 500, 'Something went wrong while processing this request');
    }

}
