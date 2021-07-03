const express = require('express');
const apiRouter = express.Router();

const authroutes = require("./auth/auth.router");
apiRouter.use('/auth', authroutes);

apiRouter.get('*', (req, res) => {
	res.status(404);
	return res.json({
		errorMessage: 'endpoint not found',
	});
});

apiRouter.post('*', (req, res) => {
  res.status(404);
  return res.json({
    errorMessage: 'endpoint not found',
  });
});

apiRouter.put('*', (req, res) => {
  res.status(404);
  return res.json({
    errorMessage: 'endpoint not found',
  });
});

apiRouter.delete('*', (req, res) => {
  res.status(404);
  return res.json({
    errorMessage: 'endpoint not found',
  });
});

module.exports = apiRouter;
