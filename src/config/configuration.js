const dotenv = require("dotenv");

dotenv.config();
// This should be your own database url
module.exports = {
  database: process.env.DATABASE || "mongodb://localhost:27017/certlify",
  jwtsecret: process.env.SECRET || "secret-key-test",
};
