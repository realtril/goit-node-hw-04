const Joi = require("joi");
const { Router } = require("express");
const { validate } = require("../helpers/validate");
const contactsController = require("../controllers/contactsController");
const {
  Types: { ObjectId },
} = require("mongoose");
const router = Router();

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
  subscription: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string().required(),
});

const updateContactScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number(),
  subscription: Joi.string(),
  password: Joi.string(),
  token: Joi.string(),
}).min(1);

router.post(
  "/",
  validate(createContactSchema),
  contactsController.addNewContact
);

router.get("/", contactsController.getContacts);
router.get("/:contactId", contactsController.getContact);

router.delete("/:contactId", contactsController.deleteContact);

router.patch(
  "/:contactId",
  validate(updateContactScheme),
  contactsController.updateContact
);

exports.contactRouter = router;
