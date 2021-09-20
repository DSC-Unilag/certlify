const express = require('express')
const { createCertificate } = require("./controllers/createCertificate")
const { requireAuth } = require("../auth/middlewares/requireAuth")

const router = express.Router()

router.post('/create', requireAuth, createCertificate)

module.exports = router
