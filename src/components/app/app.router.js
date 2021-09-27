const express = require('express')
const getPackagedVars = require('../../utils/getEnv').getPackagedVars

const router = express.Router()

const { name, version, contributors } = getPackagedVars()

router.get('/', (req, res) => {
    res.status(200).json({
        data: {
            name,
            version,
            contributors
        }
    })
})

module.exports = router
