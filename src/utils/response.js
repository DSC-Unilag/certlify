/**
 * generateResponse
 * @param { int } status 
 * @param { Express.Response } payload 
 * @example generateResponse (400, createError(err.message))
 * @example generateResponse(200, createSuccessMessage({ token, user }));
 */
exports.generateResponse = function (status = 404, payload) {
	return {
		status,
		result: payload,
	};
};

/**
 * createError
 * @param errors
 * @returns Error as returnable JSON
 */
exports.createError = function (errors) {
	return {
		data: null,
		errors,
	};
};

/**
 * createSuccessMessage
 * @param payload
 * @returns Response as returnable JSON
 */
exports.createSuccessMessage = function(payload){
	return {
		data: payload,
		errors: null
	}
}

exports.getErrorFromJoiFormat = function(err){
	return err.details.map(detail => detail.message)
}
