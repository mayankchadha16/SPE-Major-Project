const winston = require('winston');

// Set up winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
		format: 'DD/MMM/YYYY:HH:mm:ss ZZ', // Customize the format here
	  }),
    winston.format.json() // Use JSON format
  ),
  transports: [
    new winston.transports.Console(), // Log to console for development
    new winston.transports.File({ filename: 'app.log' }), // Log to file
  ],
});

module.exports = logger;