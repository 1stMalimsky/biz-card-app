import Joi from "joi";

import validation from "./validation";

const imageRegex = /.(jpg|jpeg|png|gif)$/i;

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  middleName: Joi.string().min(0).max(100),
  phone: Joi.number().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .min(6)
    .required(),
  imageUrl: Joi.string().uri().imageRegex(),
  imageAlt: Joi.string().min(0).max(15),
  state: Joi.string().min(0).max(15),
  country: Joi.string().min(2).max(20).required(),
  city: Joi.string().min(2).max(30).required(),
  street: Joi.string().min(2).max(30).required(),
  houseNumber: Joi.number().required(),
  zipCode: Joi.string().min(0).max(20),
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

export default validateRegisterSchema;
