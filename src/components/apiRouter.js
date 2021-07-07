const express = require('express')
const apiRouter = express.Router()

const authroutes = require("./auth/auth.router")
apiRouter.use('/auth', authroutes)

apiRouter.use((req, res, next) => {
	res.status(404)
	return res.json({
		errorMessage: 'endpoint not found',
	})
})

module.exports = apiRouter
