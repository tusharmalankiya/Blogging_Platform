const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isNumeric, isStrongPassword } = require("validator");

// const phone_validator = (v)=>{
//   if(v.length === 0){
//     return true
//   }
//   return isNumeric(v);
// }

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "please enter your firstname"],
      maxLength: [20, "your firstname should not be more than 20 characters"],
    },
    lastname: {
      type: String,
      required: [true, "please enter your lastname"],
      maxLength: [20, "your lastname should not be more than 20 characters"],
    },
    username: {
      type: String,
      required: [true, "please enter username"],
      unique: true,
      lowercase: true,
      maxLength: [20, "username should not be more than 20 characters"],
    },
    phone: {
      type: String,
      minLength: [10, 'phone number should be of 10 letters only'],
      maxLength: [10, 'phone number should be of 10 letters only'],
      // unique: true,
      validate: [isNumeric, 'please enter a valid phone number'],
      // default: ''
    },
    email: {
      type: String,
      required: [true, "please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "please enter a password"],
      minLength: [8, "please enter at least 8 characters"],
      validate: [isStrongPassword, 'please choose strong password']
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  // console.log(this);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
