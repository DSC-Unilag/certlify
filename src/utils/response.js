exports.generateResponse = function (status = 404, payload) {
    return {
      status,
      result: payload,
    };
  };
  
  exports.createError = function (errors) {
    return {
      data: null,
      errors,
    };
  };
  
  exports.createSuccessMessage = function(payload){
    return {
      data:payload,
      errors: null
    }
  }
  
  exports.getErrorFromJoiFormat = function(err){
    return err.details.map(detail => detail.message)
  }