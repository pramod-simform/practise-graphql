import joi from "joi";

const TestValidationSchema = joi.object({
  _id: joi.string().guid().required().messages({
    "any.required": "ID is required.",
    "string.guid": "ID must be a valid uuid.",
  }),

  age: joi.number().min(5).max(100).required().messages({
    "any.required": "Age is required.",
    "number.min": "Age can not be less than 5.",
    "number.max": "Age can not be grater than 100.",
  }),

  email: joi
    .string()
    .email({
      minDomainSegments: 2,
    })
    .required().messages({
      "any.required": "Email is required.",
      "string.email": "Please enter a valid email address.",
      "number.max": "Age can not be grater than 100.",
    }),
});

export default TestValidationSchema;
