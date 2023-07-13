const Transaction = require("../models/Transaction")
const User = require("../models/User")
const APIError = require("../utility/APIError")
const { _isSubAdmin, _isAdmin } = require("../utility/Authorization")
const CatchAsync = require("../utility/CatchAsync")

exports.createTransaction = CatchAsync(
  async (from, to, type, amount, currency, next) => {
    if (!from || !to || !currency || !type || !amount)
      throw new APIError("enter all information", 402)
    await Transaction.create({
      from: from,
      to: to,
      transactionType: type,
      creditAmount: amount,
      currency: currency,
      time: Date.now(),
    })
    next()
  }
)

exports.findMyTransactions = CatchAsync(async (req, res, next) => {
  const user = req.user
  if (!user) throw new APIError("please login first", 402)
  if (!_isAdmin || !_isSubAdmin) {
    throw new APIError(
      "You are not authorized for it - only admin and subAdmin",
      403
    )
  }
  const foundUser = await User.findById(user.id)
  const myTransactions = await Transaction.find({
    from: foundUser._id,
  }).populate("to")
  res.status(200).json({
    success: true,
    myTransactions,
    count: myTransactions.length,
  })
})
