const jwt = require("jsonwebtoken")
const User = require("../models/User")
const ApiError = require("./APIError")
const CatchAsync = require("./CatchAsync")
// for generalized user
exports._isAuthorizedUser = CatchAsync(async (req, res, next) => {
  const { token } = req.cookies
  if (!token) throw new ApiError("login first to access", 401)
  let jwtData = jwt.verify(token, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE,
  })
  let user = await User.findById(jwtData.id)
  req.user = user
  next()
})

exports._isAdmin = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
  if (user.userType === "Admin") next()
  else throw new ApiError("You are not authorized for it - only admin", 403)
})

exports._isSubAdmin = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
  if (user.userType === "Sub Admin") next()
  else
    throw new ApiError("You are not authorized for it - only sub acccount", 403)
})
