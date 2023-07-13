const {
  registerAdmin,
  loginUser,
  logout,
  getProfile,
  changeMyPassword,
} = require("../controllers/UserController")
const { _isAuthorizedUser } = require("../utility/Authorization")

const Router = require("express").Router()
Router.route("/admin/signup").post(registerAdmin)

// common routes
Router.route("/public/login").post(loginUser)
Router.route("/user/logout").get(_isAuthorizedUser, logout)
Router.route("/user/profile").get(_isAuthorizedUser, getProfile)
Router.route("/user/password/update").put(_isAuthorizedUser, changeMyPassword)

module.exports = Router
