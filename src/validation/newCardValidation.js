import Joi from "joi";

import validation from "./validation";

const editCardSchema = Joi.object({
    img: Joi.string().required(),
    title: Joi.string().min(2).max(15).required(),
    price: Joi.number().required(),
    description: Joi.string()
        .min(2)
        .max(450)
        .required(),
});

const validateCardSchema = (userInput) =>
    validation(editCardSchema, userInput);

export default validateCardSchema;