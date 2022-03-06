// Import dependencies
const express = require('express');
const getPackagedVars = require('../utils/GetPackagedVars').GetPackagedVars;

const router = express.Router();

const { name, version, contributors } = getPackagedVars();

router.get('/', (req, res) => {
    res.status(200).json({
        data: {
            name,
            version,
            contributors
        }
    });
});

module.exports = router;
