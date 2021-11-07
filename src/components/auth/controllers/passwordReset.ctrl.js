const { User } = require("../../users/users.model");
const { validateToken } = require("../../../utils/token");
const { genSalt, hash } = require('bcrypt')
const { generateResponse, createError, createSuccessMessage } = require("../../../utils/response");


exports.passwordReset=async (req,res)=>{
    let token=req.params.jwt
    let password=req.body.password
  
try {
    if(!req.params.jwt){
        const result = generateResponse(400,"invalid link");
        return res.status(result.status).json(result.result);
      }
      if(!req.body.password){
        const result = generateResponse(400,"Password is required");
        return res.status(result.status).json(result.result);
      }
  
      const verifiedToken = await validateToken(token)
      if(!verifiedToken){
          const result = generateResponse(400,"Invalid user token");
          return res.status(result.status).json(result.result);
      }
  
      const user = await User.findById(verifiedToken.id)
      if(user){
          let passwordHash = await hash(password, await genSalt());
          await user.update({
              password:passwordHash
          });
  
          const result = generateResponse(201, createSuccessMessage({
              message:"Password reset successful"
            }));
            return res.status(result.status).json(result.result)
  
        }else{
          const result = generateResponse(404, createError("User not found"));
            return res.status(result.status).json(result.result)
        }
} catch (error) {
    const result = generateResponse(404, createError(error.message));
    return res.status(result.status).json(result.result)
}
  
    
  }