import Joi from '@hapi/joi';
import {generateFormError} from 'app/utils/validation.util';

const schema = Joi.object().keys({
    slug: Joi.string().required().min(3).max(100).error(error => {
        return error[0].type === 'any.empty' ? "Bạn chưa nhập địa chỉ truy cập."
            : "Địa chỉ truy cập phải từ 3 đến 100 ký tự. ";
    }),
    shortName: Joi.string().required().min(2).max(6).error(error => {
        return error[0].type === 'any.empty' ? "Bạn chưa nhập tên đội."
            : "Tên đội viết tắt phải từ 2 đến 6 ký tự. ";
    }),
    longName: Joi.string().required().min(2).max(40).error(error => {
        return error[0].type === 'any.empty' ? "Bạn chưa nhập tên đầy đủ."
            : "Tên đầy đủ phải từ 2 đến 40 ký tự. ";
    }),
});

const validate = (values) => generateFormError(values, schema);
export {validate}