const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash the whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
    port: parseInt(process.env.PORT, 10) || 5000,

    databaseURL: process.env.MONGODB_URI,

    // API configs
    api: {
        prefix: '/api',
    },

    // Log levels
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
};