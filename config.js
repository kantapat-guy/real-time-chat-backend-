require("dotenv").config();

const config = {
  isVercel: process.env.IS_VERCEL || false,
};

module.exports = config;
