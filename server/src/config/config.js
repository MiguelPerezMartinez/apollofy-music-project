// imports
const dotenv = require("dotenv");

// load .env into process.env
dotenv.config();

//  process.env is destructuring
const {
  NODE_ENV = "development",
  MONGO_DB_URL_PRODUCTION,
  MONGO_DB_URL_DEVELOPMENT,
  MONGO_DB_URL_TEST,
  PORT,
  ENCRYPTION_SALT_DEVELOPMENT,
  ENCRYPTION_SALT_PRODUCTION,
} = process.env;

const CONFIG = {
  production: {
    app: {
      PORT: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_PRODUCTION,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_PRODUCTION,
    },
  },
  development: {
    app: {
      PORT: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_DEVELOPMENT,
    },
  },
  test: {
    app: {
      PORT: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_TEST,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_DEVELOPMENT,
    },
  },
};

module.exports = {
  config: CONFIG[NODE_ENV],
};
