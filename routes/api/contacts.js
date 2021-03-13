const express = require("express");
const router = express.Router();
const validate = require("../../validation/validation");
const {
  getContactsCntr,
  getContactByIdCntr,
  removeContactCntr,
  addContactCntr,
  updateContactCntr,
} = require("../../controller");

router
  .get("/", getContactsCntr)
  .post("/", validate.createContact, removeContactCntr);

router
  .get("/:contactId", getContactByIdCntr)
  .delete("/:contactId", addContactCntr)
  .patch("/:contactId", validate.updateContact, updateContactCntr);

module.exports = router;
