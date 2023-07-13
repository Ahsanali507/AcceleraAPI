const {
  createSubAdmin,
  mySubAdmins,
  updateSubAdmin,
  changeSubAdminPassword,
  deleteSubAdmin,
  changeUserPassword,
  myAgents,
  deleteAgent,
  createAgent,
  updateAgent,
  addCredit,
  withdrawCredit,
} = require("../controllers/AdminControllers")
const { findMyTransactions } = require("../controllers/TransactionController")
const { _isAuthorizedUser, _isAdmin } = require("../utility/Authorization")

const Router = require("express").Router()
Router.route("/admin/create/subadmin").post(
  _isAuthorizedUser,
  _isAdmin,
  createSubAdmin
)
Router.route("/admin/mysubadmins").get(_isAuthorizedUser, _isAdmin, mySubAdmins)
Router.route("/admin/update/subadmin/:id").put(
  _isAuthorizedUser,
  _isAdmin,
  updateSubAdmin
)
Router.route("/admin/delete/subadmin/:id").delete(
  _isAuthorizedUser,
  _isAdmin,
  deleteSubAdmin
)

Router.route("/admin/create/agent").post(
  _isAuthorizedUser,
  _isAdmin,
  createAgent
)
Router.route("/admin/myagents").get(_isAuthorizedUser, _isAdmin, myAgents)
Router.route("/admin/update/agent/:id").put(
  _isAuthorizedUser,
  _isAdmin,
  updateAgent
)
Router.route("/admin/delete/agent/:id").delete(
  _isAuthorizedUser,
  _isAdmin,
  deleteAgent
)

Router.route("/admin/credit/agent/:agentId").post(
  _isAuthorizedUser,
  _isAdmin,
  addCredit
)
Router.route("/admin/withdraw/agent/:agentId").post(
  _isAuthorizedUser,
  _isAdmin,
  withdrawCredit
)

Router.route("/admin/mytransactions").get(_isAuthorizedUser, findMyTransactions)

Router.route("/admin/update/password/:id").put(
  _isAuthorizedUser,
  _isAdmin,
  changeUserPassword
)
module.exports = Router
