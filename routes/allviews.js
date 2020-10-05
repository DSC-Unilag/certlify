const express = require('express');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/signup', (req,res)=>{
    res.sendFile(__dirname+"/views/signup.html");
});
router.get("/dashboard",(req,res)=>{
    res.sendFile(__dirname+"/views/dashboard.html");
})

module.exports = router;
