const User = require("../models/User")
const APIError = require("../utility/APIError")
const CatchAsync = require("../utility/CatchAsync")
const { _sendToken } = require("../utility/JWTToken")

// registeration
exports.registerAdmin = CatchAsync(async (req, res) => {
  const { userName, name, phone, password, email, positionType, credit, level, currency } = req.body
  const alreadyExists = await User.findOne({ userName: userName })
  if (alreadyExists) throw new APIError("User already exists", 401)
  const user = await User.create({
    userName,
    name,
    phone, 
    password,
    email,
    positionType,
    credit,
    level,
    currency,
    userType: 'Admin'
  })
  _sendToken(user, 201, res)
})

// Common Controllers for all users
// login user
exports.loginUser = CatchAsync(async (req, res, next) => {
  const { userName, password } = req.body
  if(!userName || !password) throw new APIError('enter username and password')
  const user = await User.findOne({ userName }).select("+password")
  if (!user) throw new APIError("Invalid gmail or password", 402)
  let ok = await user.comparePasswords(password)
  if (!ok) throw new APIError("Invalid gmail or password", 402)
  _sendToken(user, 200, res)
})

// logout user
exports.logout = CatchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: "logged out",
  })
})

// get profile
exports.getProfile = CatchAsync(async (req, res, next) => {
  const me = await User.findById(req.user.id)
  if (!me) throw new APIError("cannot find user", 404)

  res.status(200).json({
    success: true,
    user: me,
  })
})

// change my password
exports.changeMyPassword = CatchAsync(async(req, res, next)=>{
  const user = req.user
  if(!user) throw new APIError("you are not logged in", 402)
  const foundUser = await User.findById(user.id)
  if(!foundUser) throw new APIError("you are not logged in", 402)

  const {oldPassword, newPassword} = req.body
  if(!oldPassword || !newPassword) throw new APIError("enter old password and new password", 402)
  let matched = await foundUser.comparePasswords(oldPassword)
  if(!matched) throw new APIError("old password does not match", 402)

  foundUser.password = newPassword
  await foundUser.save()

  res.status(200).json({
    success: true,
    message: 'password is successfully changed'
  })
})