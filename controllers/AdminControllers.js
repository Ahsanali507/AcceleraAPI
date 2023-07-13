const Transaction = require("../models/Transaction")
const User = require("../models/User")
const APIError = require("../utility/APIError")
const { _isAdmin } = require("../utility/Authorization")
const CatchAsync = require("../utility/CatchAsync")
const { createTransaction } = require("./TransactionController")

// 1. a create new agent
exports.createAgent = CatchAsync(async (req, res, next) => {
  const adminId = req.user
  const admin = await User.findById(adminId.id)
  if (!admin) throw new APIError("please login first", 402)
  const {
    userName,
    name,
    password,
    level,
    positionType,
    currency,
    credit,
    betType,
    personInCharge,
    email,
    otherContact,
    phone,
    financePersonInCharge,
    financeEmail,
    FinancePhone,
    financeOtherContact,
    Referer,
    Remark,
    products,
  } = req.body

  if (!userName) throw new APIError("enter username of agent", 402)
  const alreadyExists = await User.findOne({ userName })
  if (alreadyExists)
    throw new APIError("a user already exists with this username", 401)

  if (positionType === "Agent") {
    if (!betType)
      throw new APIError("enter bet type as your position type is agent", 401)
  }

  if (credit > admin.credit) throw new APIError("insufficient credit", 402)
  const agent = await User.create({
    userName,
    name,
    phone,
    password,
    userType: "Agent",
    credit,
    level,
    currency,
    betType,
    positionType,

    personInCharge,
    email,
    otherContact,
    financePersonInCharge,
    financeEmail,
    FinancePhone,
    financeOtherContact,
    Referer,
    Remark,
    products,
  })

  admin.credit = admin.credit - credit // charge credit to agent from admin

  await admin.save()

  res.status(201).json({
    success: true,
    message: "agent is created successfully",
    created_agent: agent,
  })
})

// 1. b create new sub admin
exports.createSubAdmin = CatchAsync(async (req, res, next) => {
  const admin = req.user
  if (!admin) throw new APIError("please login first", 402)
  if (!_isAdmin)
    throw new APIError("You are not authorized for it - only admin", 403)
  const { userName, name, phone, password, permissions } = req.body
  if (!userName) throw new APIError("enter username of sub admin", 402)
  const newUserName = admin.userName + "@" + userName
  const alreadyExists = await User.findOne({
    userName: newUserName,
  })
  if (alreadyExists)
    throw new APIError("a sub admin already exists with this username", 401)
  const subAdmin = await User.create({
    userName: newUserName,
    name,
    phone,
    password,
    permissions,
    userType: "Sub Admin",
    credit: admin.credit,
    level: admin.level,
    currency: admin.currency,
    positionType: admin.positionType,
  })

  res.status(201).json({
    success: true,
    message: "sub admin created successfully",
    created_subAdmin: subAdmin,
  })
})

// 2. a add credit to any agent
exports.addCredit = CatchAsync(async (req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  // res.setHeader("Access-Control-Allow-Credentials", "true")

  const admin = req.user
  const { agentId } = req.params
  let { creditToTransfer } = req.body

  const foundAgent = await User.findById(agentId)
  const foundAdmin = await User.findById(admin.id)

  if (!creditToTransfer)
    throw new APIError("enter credit to transfer to agent", 403)
  if (!foundAgent) throw new APIError("agent with this id not found", 404)
  if (!foundAdmin) throw new APIError("admin with this id not found", 404)
  creditToTransfer = parseInt(creditToTransfer)
  if (foundAdmin.credit < creditToTransfer)
    throw new APIError("insufficient balance to credit", 403)
  foundAgent.credit += creditToTransfer //charge agent
  foundAdmin.credit -= creditToTransfer // withdraw from admin

  await Transaction.createTransaction(
    foundAdmin._id,
    foundAgent._id,
    "Deposit",
    creditToTransfer,
    foundAdmin.currency
  )

  await foundAgent.save()
  await foundAdmin.save()

  res.status(200).json({
    sucess: true,
    message: `amount of ${creditToTransfer} is creditted to ${foundAgent.userName} successfully`,
  })
})
// 2. b withdraw credit from any agent
exports.withdrawCredit = CatchAsync(async (req, res, next) => {
  const admin = req.user
  const { agentId } = req.params
  let { creditToTransfer } = req.body

  const foundAgent = await User.findById(agentId)
  const foundAdmin = await User.findById(admin.id)

  if (!creditToTransfer) throw new APIError("enter credit to add to agent", 403)
  creditToTransfer = parseInt(creditToTransfer)

  if (!foundAgent) throw new APIError("agent with this id not found", 404)
  if (!foundAdmin) throw new APIError("admin with this id not found", 404)

  if (foundAgent.credit < creditToTransfer)
    throw new APIError("insufficient credit to withdraw", 403)
  foundAgent.credit -= creditToTransfer // withdraw from agent
  foundAdmin.credit += creditToTransfer // recharge admin

  await Transaction.createTransaction(
    foundAdmin._id,
    foundAgent._id,
    "Withdrawal",
    creditToTransfer,
    foundAdmin.currency
  )

  await foundAgent.save()
  await foundAdmin.save()

  res.status(200).json({
    sucess: true,
    message: `amount of ${creditToTransfer} is withdrawn from ${foundAgent.userName} successfully`,
  })
})
// 3. show list of subadmins
exports.mySubAdmins = CatchAsync(async (req, res, next) => {
  const admin = req.user
  if (!admin) throw new APIError("please login first", 402)
  if (!_isAdmin)
    throw new APIError("You are not authorized for it - only admin", 403)
  const subAdmins = await User.find({
    userName: {
      $regex: `^${admin.userName}`,
    },
    userType: "Sub Admin",
  })

  res.status(200).json({
    success: true,
    subAdmins,
    total_subadmins: subAdmins.length,
  })
})

// 4. show list of created agents
exports.myAgents = CatchAsync(async (req, res, next) => {
  const admin = req.user
  if (!admin) throw new APIError("please login first", 402)
  if (!_isAdmin)
    throw new APIError("You are not authorized for it - only admin", 403)
  const agents = await User.find({
    userType: "Agent",
  })

  res.status(200).json({
    success: true,
    agents,
    total_agents: agents.length,
  })
})

// 5. update information of any agent
exports.updateAgent = CatchAsync(async (req, res, next) => {
  const { id } = req.params
  const targetAgent = await User.findById(id)
  if (!targetAgent) throw new APIError("agent with this id not found", 404)
  if (targetSubAdmin.userType !== "Agent")
    throw new APIError("you can not update as it is not agent", 403)
  const {
    name,
    password,
    level,
    status,
    personInCharge,
    phone,
    email,
    otherContact,
    financePersonInCharge,
    financeEmail,
    FinancePhone,
    financeOtherContact,
    Referer,
    Remark,
  } = req.body
  const updatedData = {
    name,
    password,
    level,
    status,
    personInCharge,
    phone,
    email,
    otherContact,
    financePersonInCharge,
    financeEmail,
    FinancePhone,
    financeOtherContact,
    Referer,
    Remark,
  }

  await User.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(202).json({
    message: "agent is updated successfully",
    success: true,
  })
})
// 6. a update information of any subadmin
exports.updateSubAdmin = CatchAsync(async (req, res, next) => {
  const { id } = req.params
  const targetSubAdmin = await User.findById(id)
  if (!targetSubAdmin)
    throw new APIError("sub admin with this id not found", 404)
  if (targetSubAdmin.userType !== "Sub Admin")
    throw new APIError("you can not update as it is not sub admin", 403)
  const { name, phone, status, permissions } = req.body
  const updatedData = { name, phone, status, permissions }
  await User.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(202).json({
    message: "sub admin is updated successfully",
    success: true,
  })
})

// 6 b change Password of Subadmin and agent
exports.changeUserPassword = CatchAsync(async (req, res, next) => {
  const { id } = req.params
  const targetUser = await User.findById(id)
  if (!targetUser) throw new APIError("user with this id not found", 404)
  const { newPassword } = req.body
  targetUser.password = newPassword
  await targetUser.save()

  res.status(202).json({
    message: `password of ${targetUser.userType} is updated successfully`,
    success: true,
  })
})

// 7. a delete a subadmin or agent
exports.deleteSubAdmin = CatchAsync(async (req, res, next) => {
  // find id of victim subadmin from req.params
  const { id } = req.params
  const targetSubAdmin = await User.findById(id)
  if (!targetSubAdmin)
    throw new APIError("sub admin with this id not found", 404)
  if (targetSubAdmin.userType !== "Sub Admin")
    throw new APIError("you can not update as it is not sub admin", 403)
  await targetSubAdmin.delete()

  res.status(202).json({
    message: "sub admin is deleted successfully",
    success: true,
  })
})

// 7. b delete an agent
exports.deleteAgent = CatchAsync(async (req, res, next) => {
  // find id of victim subadmin from req.params
  const { id } = req.params
  const targetAgent = await User.findById(id)
  if (!targetAgent) throw new APIError("agent with this id not found", 404)
  if (targetAgent.userType !== "Agent")
    throw new APIError("you can not update as it is not agent", 403)
  await targetAgent.delete()

  res.status(202).json({
    message: "agent is deleted successfully",
    success: true,
  })
})
