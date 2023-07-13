const Mongoose = require("mongoose")
const APIError = require("../utility/APIError")

const TransactionSchema = new Mongoose.Schema({
  from: {
    type: Mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "please enter sender (admin or subadmin)"],
  },
  to: {
    type: Mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "please enter receiver"],
  },
  creditAmount: {
    type: Number,
    required: [true, "please enter credit for transaction"],
  },
  transactionType: {
    type: String,
    enum: ["Deposit", "Withdrawal"],
    required: [true, "please enter transaction type ( withdrawal / deposit )"],
  },
  currency: {
    type: String,
    enum: ["All", "THB"],
    required: [true, "please enter currency type"],
  },
  time: {
    type: Date,
    default: Date.now(),
  },
})

TransactionSchema.statics.createTransaction = async function (
  from,
  to,
  type,
  amount,
  currency
) {
  if (!from || !to || !currency || !type || !amount)
    throw new APIError("enter all information", 402)
  await this.create({
    from: from,
    to: to,
    transactionType: type,
    creditAmount: amount,
    currency: currency,
    time: Date.now(),
  })
  return
}
module.exports = Mongoose.model("transaction", TransactionSchema)
