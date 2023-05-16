import Joi from "joi";
import validation from "./validation";

const customTlds = ['com', 'org', 'net', 'edu']
const imageRegex = new RegExp(/.(jpg|jpeg|png|gif)$/i);
const urlRegex = new RegExp(
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
);


const editCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subTitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string().email(({
    tlds: {
      allow: customTlds
    }
  })).min(2).max(256).required(),
  url: Joi.string().allow("").uri().regex(imageRegex).required(),
  alt: Joi.string().min(2).max(256).allow("").required(),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().max(999999999).required(),
  zipCode: Joi.number().min(10000000).max(99999999).required(),
  web: Joi.string().uri().regex(urlRegex)

});

const editCardParamsSchema = Joi.object({
  id: Joi.string().min(1).required(),
});

const validateEditSchema = (userInput) => validation(editCardSchema, userInput);

const validateEditCardParamsSchema = (userInput) =>
  validation(editCardParamsSchema, userInput);

export { validateEditCardParamsSchema };

export default validateEditSchema;
