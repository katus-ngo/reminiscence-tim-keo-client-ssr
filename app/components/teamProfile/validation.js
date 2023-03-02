import Joi from '@hapi/joi';
import {generateFormError} from 'app/utils/validation.util';

const schema = Joi.object().keys({
    email: Joi.string().regex(/^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/).error(() => {
        return "Email không hợp lệ.";
    }),
    phoneNumber: Joi.string().regex(/^[0][1-9]{9}/).error(() => {
        return "Số điện thoại không hợp lệ.";
    }),
});

const validate = (values) => generateFormError(values, schema);
export {validate}