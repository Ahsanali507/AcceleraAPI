const User = require("../models/User");
const APIError = require("../utility/APIError");
const CatchAsync = require("../utility/CatchAsync");
const { createAgent, updateAgent, addCredit, withdrawCredit, myAgents, changeUserPassword, deleteAgent } = require("./AdminControllers");
const { getProfile, changeMyPassword } = require("./UserController");

// permissions
// 1. account 2. management 3. report  4. payment

// managements -> add edit

exports._addAgent = CatchAsync(async (req, res, next) => {
    const subAdmin = await User.findById(req.user.id)
    // check permission
    subAdmin.permissions.forEach(perm => {
        if (perm.name === 'management')
            if (perm.value !== 'edit')
                throw new APIError("you have no permission to add agent", 403)
            else if (perm.value === 'edit')
                createAgent(req, res, next)
    })
})

exports._updateAgents = CatchAsync(async(req, res, next)=>{
    const subAdmin = await User.findById(req.user.id)
    // check permission
    subAdmin.permissions.forEach(perm => {
        if (perm.name === 'management')
            if (perm.value !== 'edit')
                throw new APIError("you have no permission to update agent", 403)
            else if (perm.value === 'edit')
                updateAgent(req, res, next)
    })
})

exports._deleteAgent =  CatchAsync(async(req, res, next)=>{
    const subAdmin = await User.findById(req.user.id)
    // check permission
    subAdmin.permissions.forEach(perm => {
        if (perm.name === 'management')
            if (perm.value !== 'edit')
                throw new APIError("you have no permission to update agent", 403)
            else if (perm.value === 'edit')
               deleteAgent(req, res, next)
    })
})
exports._changeUserPassword = CatchAsync(async(req, res, next)=>{
    const subAdmin = await User.findById(req.user.id)
    // check permission
    subAdmin.permissions.forEach(perm => {
        if (perm.name === 'management')
            if (perm.value !== 'edit')
                throw new APIError("you have no permission to update agent", 403)
            else if (perm.value === 'edit')
                changeUserPassword(req, res, next)
    })
})

exports._myAgents = CatchAsync(async(req, res, next)=>{
    const subAdmin = await User.findById(req.user.id)
    // check permission
    subAdmin.permissions.forEach(perm => {
        if (perm.name === 'management')
            if (perm.value === 'off' || perm.value === 'edit')
                throw new APIError("you have no permission to see your agents", 403)
            else if (perm.value === 'view')
                myAgents(req, res, next)
    })
})

// account
exports._myProfile = CatchAsync(async(req, res, next)=>{
    const subAdmin = await User.findById(req.user.id)
    // check permission
    subAdmin.permissions.forEach(perm => {
        if (perm.name === 'account')
            if (perm.value === 'off' || perm.value === 'edit' )
                throw new APIError("you have no permission to view profile", 403)
            else if (perm.value === 'view')
                getProfile(req, res, next)
    })
})

exports._changePassword = CatchAsync(async(req, res, next)=>{
    const subAdmin = await User.findById(req.user.id)
    // check permission
    subAdmin.permissions.forEach(perm => {
        if (perm.name === 'account')
            if (perm.value === 'off' || perm.value === 'view' )
                throw new APIError("you have no permission to change password", 403)
            else if (perm.value === 'edit')
                changeMyPassword(req, res, next)
    })
})

// payments

exports._addCredit = CatchAsync(async(req, res, next)=>{
    const subAdmin = await User.findById(req.user.id)
    // check permission
    subAdmin.permissions.forEach(perm => {
        if (perm.name === 'payment')
            if (perm.value === 'off' || perm.value === 'view' )
                throw new APIError("you have no permission to add credit", 403)
            else if (perm.value === 'edit')
                addCredit(req, res, next)
    })
})

exports._withdrawCredit = CatchAsync(async(req, res, next)=>{
    const subAdmin = await User.findById(req.user.id)
    // check permission
    subAdmin.permissions.forEach(perm => {
        if (perm.name === 'payment')
            if (perm.value === 'off' || perm.value === 'view' )
                throw new APIError("you have no permission to add credit", 403)
            else if (perm.value === 'edit')
                withdrawCredit(req, res, next)
    })
})
