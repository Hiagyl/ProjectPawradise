const express = require('express');
const loaders = require('./loaders');
require('dotenv').config();

async function startServer() {
    const app = express();

    // This calls the "Master Loader" to set up DB, Express, etc.
    await loaders({ expressApp: app });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`
      ################################################
      🛡️  Server listening on port: ${PORT} 🛡️
      ################################################
    `);
    });
}

startServer();