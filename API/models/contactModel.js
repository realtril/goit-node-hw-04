const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: true, unique: true },
});

contactSchema.plugin(mongoosePaginate);
// collection -> users
const ContactModel = mongoose.model("Contact", contactSchema, "contacts");
module.exports = ContactModel;
