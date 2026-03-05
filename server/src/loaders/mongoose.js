const mongoose = require('mongoose');
const config = require('../config'); // Accesses your .env via the config vault

module.exports = async () => {
    try {
        // 1. Attempt the connection
        const connection = await mongoose.connect(config.databaseURL);

        // 2. Log success with the specific database name
        console.log(`✌️ MongoDB Connected: ${connection.connection.name}`);

        // 3. Return the underlying DB object (optional, for advanced use)
        return connection.connection.db;
    } catch (error) {
        // 4. Critical failure: If DB is down, the app shouldn't run
        console.error('🔥 Mongoose Loader Error:', error.message);
        process.exit(1);
    }
};