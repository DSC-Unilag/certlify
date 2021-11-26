const express = require('express')
const { requireAuth } = require('../../utils/requireAuth')
const addEligibleUsers = require('./controllers/addEligibleUsers.ctrl')
const createCert = require("./controllers/createCertificates.ctrl")


const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.post('/createcertificate',requireAuth,createCert)
router.post('/addusers',requireAuth, addEligibleUsers)


module.exports = router