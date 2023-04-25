import Joi from "joi";

import validation from "./validation";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })

    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .messages({
      "string.empty": "Password can't be empty",
      "string.pattern.base":
        "Password should contain at least 9 characters, upper and lowercase letters, numbers and a special sign: !@#$%",
    })
    .min(2)
    .max(10)
    .required(),
});

const validateLoginSchema = (userInput) => validation(loginSchema, userInput);

export default validateLoginSchema;
