const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//router.get('/register', UserController.getRegister);

/** 
 * swagger
 * /register:
 *  post:
 *      description: Endpoint to Register Users
 *      requestBody:
 *          required:true
 *      content:
 *              application/json:
 *                  schema:
 *                      type:object
 *                      required:
 *                          - name
 *                          - email
 *                          - password
 *      responses:
 *          '200':
 *              description: A successful response
*/
router.post('/register', UserController.register);

// router.get('/login', UserController.getLogin);
router.post('/login', UserController.login);
// cater for anonymous users
router.get("/anon",UserController.anon);
// check the login status of a user;
router.get("/status",UserController.status);
module.exports = router;