const response = (res, success, code, message, data) => {
    return res.status(code).json({
      success,
      message,
      data
    })
  };
  
  exports.response= response;
  