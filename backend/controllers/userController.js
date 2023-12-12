const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const logger = require('../logger')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

	logger.info("User successfully logged in", { username : email });
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
	logger.error('An error occurred', { error });
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

	logger.info("User created", { username : email });
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
	logger.error('An error occurred', { error });
  }
}

module.exports = { signupUser, loginUser }