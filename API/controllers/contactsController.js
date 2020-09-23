const contactsModel = require("../models/contactModel");

async function getContacts(req, res, next) {
  try {
    const result = await contactsModel.find();
    res.status(200).json(result);
  } catch (error) {
    delete error.stack;
    next(error);
  }
}

async function getContact(req, res, next) {
  try {
    console.log(req);
    const { contactId } = req.params;
    console.log(contactId);
    const contact = await contactsModel.findById(contactId);
    if (!contact) {
      return res.status(404).send({ message: "contact not found" });
    }
    res.status(200).send(contact);
  } catch (error) {
    console.log(error);
    delete error.stack;
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await contactsModel.findById(contactId);
    if (!contact) {
      return res.status(404).send({ message: "contact not found" });
    }
    const removed = await contactsModel.findByIdAndDelete(contactId);
    if (removed) {
      return res.status(200).send({ message: "contact deleted" });
    }
  } catch (error) {
    delete error.stack;
    next(error);
  }
}

async function addNewContact(req, res, next) {
  try {
    const existingContact = await contactsModel.findOne({
      email: req.body.email,
    });
    if (existingContact) {
      return res.status(409).send("Contact with such email already exists");
    }
    const newContact = await contactsModel.create(req.body);
    res.status(201).send(newContact);
  } catch (err) {
    delete err.stack;
    next(err);
  }
}

async function updateContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await contactsModel.findById(contactId);
    if (!contact) {
      return res.status(404).send({ message: "contact not found!" });
    }
    const updatedContact = await contactsModel.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send(updatedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  addNewContact,
  updateContact,
};
