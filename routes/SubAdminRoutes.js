const { _addAgent, _updateAgents, _addCredit, _withdrawCredit, _myAgents, _myProfile, _changePassword, _changeUserPassword, _deleteAgent } = require('../controllers/SubAdminControllers')
const { _isAuthorizedUser, _isSubAdmin } = require('../utility/Authorization')

const Router = require('express').Router()

// account
Router.route('/subadmin/profile').get(_isAuthorizedUser, _isSubAdmin, _myProfile)
Router.route('/subadmin/password/update').put(_isAuthorizedUser, _isSubAdmin, _changePassword)

// management
Router.route('/subadmin/create/agent').post(_isAuthorizedUser, _isSubAdmin, _addAgent)
Router.route('/subadmin/update/agent/:id').post(_isAuthorizedUser, _isSubAdmin, _updateAgents)
Router.route('/subadmin/delete/agent/:id').delete(_isAuthorizedUser, _isSubAdmin, _deleteAgent)
Router.route('/subadmin/myagents').get(_isAuthorizedUser, _isSubAdmin, _myAgents)
Router.route('/subadmin/update/password/:id').put(_isAuthorizedUser, _isSubAdmin, _changeUserPassword)

// payments
Router.route('/subadmin/credit/agent/:agentId').post(_isAuthorizedUser, _isSubAdmin, _addCredit)
Router.route('/subadmin/withdraw/agent/:agentId').post(_isAuthorizedUser, _isSubAdmin, _withdrawCredit)

// reports


module.exports = Router
