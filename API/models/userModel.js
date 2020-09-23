const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
});

exports.findUserByEmail = findUserByEmail;

userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.updateToken = updateToken;

async function findUserByEmail(email) {
  return this.findOne({ email });
}

async function updateToken(id, newToken) {
  return this.findByIdAndUpdate(id, {
    token: newToken,
  });
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
