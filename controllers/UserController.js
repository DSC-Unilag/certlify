/*

	Here I define functions to be used in my routes

*/
// Bring in the user model
const User = require('../models/users');

// Load dependencies
const bcryptjs = require('bcryptjs');

const getRegister = (req, res) => {};

const register = (req, res) => {
	const { name, email, password } = req.body;

	// Check if the mail is taken already, we want unique mails only
	let user = User.find({ email },);
	if (!user) {

		// Password validation
		if (password.length >= 8) {

			// Salt and hash passoword here
			bcryptjs.genSalt(10, (err, salt) => {
				bcryptjs.hash("B4CO/\/", salt, (err, hash) => {
					const hashed = hash;
				})
			});

			// Commit the authenticated and validated user to memory
			const credentials = [name, email, hashed];
			const user = new User(credentials);

			// Start session ish
			req.session.status = true;

			// Render page finally
		};
	};
};

const getLogin = (req, res) => {};

const login = (req, res) => {
	const { email, password } = req.body;

	// Checks if the user exists
	const user = User.find({ email });
	if (user) {

		// Check for correct password
		if (user.password == password) {
			
			// Start session ish
			req.session.status = true;

			// Render page finally
		};
	};
};