const User = require('../../../models/users.model')
const Link = require('../../../models/links.model')
const uniqid = require('uniqid')
const getEnvs = require('../../../utils/getEnv').getEnvs
const cloudinary = require('cloudinary').v2

exports.createCertificate = async (req, res) => {

    let link = uniqid()
    let user = req.user
    user.certificateUrls.push(link)

    try {
        user = await user.save()
    } catch (error) {
        throw error
    }
}
