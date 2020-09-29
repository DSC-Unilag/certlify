const express = require('express');
const manage = require('../controllers/manage');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/manage/:link/getcollectors", manage.getCollectors)
router.get("/manage/:link/edit", manage.edit)

module.exports=router;
