const urlencoded = require('body-parser/lib/types/urlencoded');
const { response } = require('../../utils/response');

const ValidateRequest = require('../../utils/ValidateRequest').ValidateRequest;
const User = require('../../models/User').User;
const Certificate = require('../../models/Certificate').Certificate;


const GetDashboard = async (req, res) => {

    try {
        let certificates = await Certificate.find({ issuer: req.user_id }, 'name link thumb')
        let data = {
            ...req.user,
            certificates
        }
        return response(res, true, 200, 'User Dashboard fetched successfully', data);
    } catch (error) {
        return response(res, false, 500, 'Something went wrong while processing this request');
    }

}

exports.GetDashboard = GetDashboard