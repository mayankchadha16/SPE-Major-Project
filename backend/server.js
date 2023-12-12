require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const morgan = require('morgan');
const logger = require('./logger');

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

const stream = {
	write: function (message) {
	  const logArray = message.trim().split(' ');
  
	  // Extract values from the logArray
	  const method = logArray[0];
	  const url = logArray[1];
	  const status = logArray[2];
	  const responseTime = logArray[3];
  
	  // Log the values with winston
	  logger.info(
		"morgan",
		{
		method,
		url,
		status,
		responseTime: `${responseTime} ms`,
	  });
	},
  };
  
  app.use(
	morgan(':method :url :status :response-time ms', { stream: stream })
  );

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

module.exports = app;