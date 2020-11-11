// Bring in the user model
const User = require("../models/users");
const Link = require("../models/links");
const config = require("../config/database");
const rounds = Number(process.env.ROUNDS) || config.rounds;
// Load dependencies
const bcrypt = require("bcryptjs");
var uniqid = require('uniqid');
var jwt = require("jsonwebtoken");
var mailer=require("./mailer");
let secret = process.env.SECRET || config.secret;
let emailverify=require("./UserVerificationMail");

const register = (req, res) => {
	// console.log("a register")
	if (!req.body.name || !req.body.password || !req.body.email) {
		res.status(400);
		res.json({
			status: false,
			message: "Invalid or incomplete input"
		})
	} else {
		const { name, password } = req.body;
		const email = req.body.email.toLowerCase();
		// Check if the mail is taken already, we want unique mails only
		User.findOne({ email }, function (err, user) {
			if (err) throw err;
			if (!user) {
				// Password validation
				if (password.length >= 8) {
					// Salt and hash passoword here
					bcrypt.genSalt(rounds, (err, salt) => {
						bcrypt.hash(password, salt, (err, passwordhash) => {
							// Commit the authenticated and validated user to memory
							if (req.session.anon) {
								User.findOne({ email: req.session.anon }, function (err, Anon) {
									Anon.name = name;
									Anon.email = email;
									Anon.passwordhash = passwordhash;
									Anon.save((err) => {
										if (err) {
											res.send("err")
											return err;
										}	
										Link.updateMany({ issuer: req.session.anon }, { issuer: email }, function (error) {
											if (err) throw err;
											else {

												jwt.sign({ email}, secret, function (err, token) {
													emailverify(`${req.hostname}/verify/${token}`)
													let mailOptions = {
														from: "info@certlify.com", // sender address
														to: `${email}`, // list of receivers
														subject: "Getting started with Certlify!", // Subject line
														html: emailverify(`http://${req.hostname}/verify/${token}`), // html body
													};
													mailer(mailOptions);
												})
												req.session.destroy(function(err) {
													res.status(200);
													return	res.json({
														status: true,
														message: "user created successfully"
													})
												 })
												
											}
										})
									});
								})
							} else {
								const credentials = { name, email, passwordhash };
								const user = new User(credentials);
								user.save((err) => {
									if (err) {
										res.send("err")
										throw err;
									}
									// Start session ish
									jwt.sign({ email}, secret, function (err, token) {
										emailverify(`${req.hostname}/verify/${token}`)
										let mailOptions = {
											from: "info@certlify.com", // sender address
											to: `${email}`, // list of receivers
											subject: "Getting started with Certlify!", // Subject line
											html: emailverify(`http://${req.hostname}/verify/${token}`), // html body
										};
										mailer(mailOptions);
									})
									
									req.session.destroy(function(err) {
										res.status(201);
										return	res.json({
											status: true,
											message: "user created successfully"
										})
									 })
								});
							}
						});
					});

				} else {
					res.status(401)
					res.json({
						status: false,
						message: "invalid password"
					})
				}
			} else {
				res.status(409)
				res.json({
					status: false,
					message: "duplicate user"
				})
			}
		});
	}

};

const login = (req, res) => {
	const { password } = req.body;
	const email = req.body.email.toLowerCase();
	if (!email || !password) {
		res.status(400)
		return res.json({
			status: false,
			message: "incomplete login data"
		})
	}
	// Checks if the user exists
	User.findOne({ email }, function (err, user) {
		if (user) {
			// Check for correct password
			bcrypt.compare(password, user.passwordhash, function (err, stats) {
				if (stats) {
					if(!user.confirmed){
						res.status(401);
						return	res.json({
							status: false,
							message: "user not verified"
						})
					}
					if (req.session.anon) {
						User.findOne({ email: req.session.anon }, function (err, anon) {
							if (anon) {
								user.certificateUrls = user.certificateUrls.concat(anon.certificateUrls);
								user.save((err)=>{
									if(err)console.log(err);
								})
								Link.updateMany({ issuer: req.session.anon }, { issuer: email }, function (error) {
									if (err) throw err;
									else {
										req.session.regenerate((err)=>{
											req.session.status = true;
											req.session.email = email;
											res.json({
												status: true,
												message: "user logged in successfully"
											})
										})
										
									}
								})
							}

						})
					} else {
						req.session.regenerate((err)=>{
							if (err) console.log(err)
							else{
								req.session.status = true;
								req.session.email = email;
								res.json({
									status: true,
									message: "user logged in successfully"
								})
							}
						})
						
					}

				} else {
					res.status(403)
					res.json({
						status: false,
						message: "incorrect username or password"
					})
				}
			});

			// Render page finally
		} else {
			res.status(401)
			res.json({
				status: false,
				message: "incorrect username or password"
			})
		}
	});

};


// allow anonymous validation
const anon = (req, res) => {
	if (req.session.anon) {
		res.json({
			status: false,
			message: "already anonymous"
		})
	} else {
		req.session.regenerate((err) => {
			if (err) return res.send("regenerate " + err)
			else {
				let anonId = uniqid();
				req.session.anon = anonId
				let anonymous = {
					name: "Anonymous",
					email: anonId
				}
				const user = new User(anonymous);
				user.save((err) => {
					if (err) {
						res.send("err")
						throw err;
					}
					res.status(201)
					res.json({
						status: true,
						message: "anoned"
					})
				});
			}
		})
	}
}

const status=(req,res)=>{
	if(req.user.email){
		res.json({
			status:true,
			message:"logged in"
		})
	}else{
		res.json({
			status:false,
			message:"not logged in"
		})
	}
}

let logout=(req,res)=>{
		if (req.session) {
		  req.session.destroy(err => {
			if (err) {
			  res.status(400)
			  res.json({
				  status:false,
				message:"unable to logout"
			})
			} else {
			  res.json({
				  status:true,
				  message:"logout successful"
			  })
			}
		  });
		} else {
		  res.end()
		}
	  
}

let userverification=(req,res)=>{
	let email=req.body.email
	User.findOne({ email: email }, function (err, user) {
		if(user){
			jwt.sign({ email}, secret, function (err, token) {
				emailverify(`${req.hostname}/verify/${token}`)
				let mailOptions = {
					from: "info@certlify.com", // sender address
					to: `${email}`, // list of receivers
					subject: "Getting started with Certlify!", // Subject line
					html: emailverify(`http://${req.hostname}/verify/${token}`), // html body
				};
				mailer(mailOptions);
			})
			res.json({
				status: true,
				message: "email has been sent"
			})
		}else{
			res.status(404);
			res.json({
				status:false,
				message:"user not found"
			})
		}
	})
}

module.exports.login = login;
module.exports.register = register;
module.exports.anon = anon;
module.exports.status = status;
module.exports.logout=logout;
module.exports.userverification=userverification