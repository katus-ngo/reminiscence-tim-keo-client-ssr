import Joi from "@hapi/joi";

const generateFormError = (values, schema) => {
    const errors = {};
    const {error: joiError} = Joi.validate(values, schema, { abortEarly: false });
    joiError && joiError.details.map(item => errors[item['path'][0]] = item.message);
    return Object.keys(errors).length === 0 ? null : errors;
};

export {generateFormError};