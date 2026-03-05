// ecosystem.config.js
module.exports = {
    apps: [{
        name: 'pawradise-api',
        script: './src/app.js',
        instances: 'max',       // <--- This is the magic line
        exec_mode: 'cluster',   // <--- This ensures they work together
    }]
}