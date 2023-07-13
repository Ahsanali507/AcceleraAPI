const Mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserSchema = new Mongoose.Schema({
    userName: {
        type: String,
        maxLength: [20, "username cannot be more than 20 chars"],
        minLength: [4, "username cannot be less than 4 chars"],
        required: [true, "please enter username"],
    },
    name: {
        type: String,
        maxLength: [20, "name cannot be more than 20 chars"],
        minLength: [4, "name cannot be less than 4 chars"],
        required: [true, "please enter name"],
    },
    password: {
        type: String,
        maxLength: [90, "password cannot be more than 90 chars"],
        minLength: [4, "password cannot be less than 4 chars"],
        required: [true, "please enter password"],
    },
    positionType: {
        type: String,
        enum: ['Reseller', 'Agent'],
        required: [true, 'please enter positiontype']
    },
    betType:{
        type: String,
        enum: ['Seamless', 'Transfer']
    },
    credit:{
        type: Number,
        min: 0,
        max: 1000,
        required: [true, 'please enter credit']
    },
    level: {
        type: String,
        enum: ['Starter', 'VIP', 'VVIP'],
        required: [true, 'please select level']
    },
    currency:{
        type: String,
        enum: ['All', 'THB'],
        required: [true, 'please enter currency type']
    },
    // needed in case of sub admin
    permissions:[{
        name: {
            type: String,
            enum: ['account', 'management', 'report', 'payment']
        },
        value: {
            type: String,
            enum: ['off', 'view', 'edit']
        }
    }],
    // not required stuff
    email: String,
    personInCharge: {
        type: String,
        maxLength: [20, "person in charge cannot be more than 20 chars"],
        minLength: [1, "person in charge cannot be less than 1 chars"],
    },
    phone:{
        type: String,
        minLength: [11, 'phone number can not be less than 11 chars'],
        maxLength: [12, 'phone number can not be more than 12 chars']
    },
    otherContact: {
        type: String,
        minLength: [5, 'contact can not be less than 5 chars'],
        maxLength: [20, 'contact can not be more than 20 chars']
    },
    financePersonInCharge: {
        type: String,
        maxLength: [20, "finance personin charge cannot be more than 20 chars"],
        minLength: [1, "finance person in charge cannot be less than 1 chars"],
    },
    financePhone:{
        type: String,
        minLength: [12, 'phone number can not be less than 12 chars'],
        maxLength: [12, 'phone number can not be more than 12 chars']
    },
    financeOtherContact: {
        type: String,
        minLength: [5, 'contact can not be less than 5 chars'],
        maxLength: [20, 'contact can not be more than 20 chars']
    },
    Referer: {
        type: String,
        minLength: [3, 'referer name can not be less than 3 chars'],
        maxLength: [13, 'referer name can not be more than 13 chars']
    },
    Remark: {
        type: String,
        minLength: [3, 'remark can not be less than 3 chars'],
        maxLength: [13, 'remark can not be more than 13 chars']
    },
    userType: {
        type: String,
        enum: ['Agent', 'Sub Admin', 'Admin'],
        default: 'Agent'
    },
    status:{
        type: String,
        enum:['Active', 'Suspend', 'Blocked'],
        default: 'Active'
    },
    products:[
        {
            productName: String,
            productCategory: {
                type: String,
                enum: ['Game Slot', 'Live Casino', 'Game Card', 'Poker', 'Lottery', 'Keno', 'Trading', 'Sportbook'],
                required: [true, 'enter category of product']
            },
            holdPercentage: {
                required:[true, 'enter percentage awarded to agent'],
                type: Number,
                min: [0.00, 'minimum hold percentage is 0.00 %'],
                max: [100.00, 'max hold percentage is 100.00 %']
            },
        }
    ]    
})

// before saving schema to db first hashing the password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
  })
  
  // schema methods
  // 1. generating web token (needed to have in cookie when logged in first time)
  UserSchema.methods.getJWTToken = function () {
    let res = jwt.sign({ id: this._id }, process.env.JWT_SECRETKEY, {
      expiresIn: process.env.JWT_EXPIRE,
    })
    return res
  }
  
  // 2. comparing passwords (needed to compare on login time bcz password typed and pswrd stored in db are diff)
  UserSchema.methods.comparePasswords = async function (enteredPassword) {
    let res = await bcrypt.compare(enteredPassword, this.password)
    return res
  }

module.exports = Mongoose.model('user', UserSchema)