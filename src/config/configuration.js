const dotenv = require("dotenv");

dotenv.config();
// This should be your own database url
module.exports = {
  // database: process.env.DATABASE || "mongodb://localhost:27017/certlify",
  database: process.env.DATABASE || "mongodb+srv://zubair:ethene20@cluster0.7cehy.mongodb.net/certlify?retryWrites=true&w=majority",
  jwtsecret: process.env.SECRET || "secret-key-test",
};
