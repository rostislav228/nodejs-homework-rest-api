const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    subscription: {
      type: String,
      default: "free",
      enum: ["free", "pro", "vip"],
    },
    password: {
      type: String,
      default: "password",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
