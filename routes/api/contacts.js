const express = require("express");
const router = express.Router();
const validate = require("../../validation/validation");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }

    return res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", validate.createContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }

    return res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (err) {
    next(err);
  }
});

router.patch("/:contactId", validate.updateContact, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!(name || email || phone)) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }

    const contact = await updateContact(req.params.contactId, req.body);
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
