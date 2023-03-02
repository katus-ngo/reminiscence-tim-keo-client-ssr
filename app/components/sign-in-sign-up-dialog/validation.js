import Joi from '@hapi/joi';
import {generateFormError} from 'app/utils/validation.util';

const emailRegex = /^[A-z0-9_.]{2,32}@[A-z0-9]{2,}(\.[A-z0-9]{2,}){1,5}$/i;
const phoneNumberRegex = /^[0-9]{9,11}$/i;

const schemaSignIn = Joi.object().keys({
    password: Joi.string().required().min(6).max(50).error(error => {
        return error[0].type === 'any.empty' ? "Mật khẩu không được để trống."
            : "Mật khẩu phải từ 6 đến 50 ký tự. ";
    }),
    username: Joi.alternatives().try(
        Joi.string().regex(emailRegex).error(() => "Vui lòng điền email hoặc số điện thoại hợp lệ."),
        Joi.string().regex(phoneNumberRegex).error(() => "Vui lòng điền email hoặc số điện thoại hợp lệ."))
    ,
    checked: Joi.boolean().valid(true).error(() => {
        return 'Để tham gia cộng , bạn phải đồng ý với các quy định và khoản.'
    }),
});

const schemaSignUp = Joi.object().keys({
    fullName: Joi.string().regex(new RegExp(/^[\p{L}\s]{3,60}$/, 'u')).error(error => {
        return error[0].type === 'any.empty' ? "Vui lòng nhập họ và tên."
            : "Họ và tên có độ dài từ 3 đến 60 ký tự.";
    }),
    password: Joi.string().required().min(6).max(50).error(error => {
        return error[0].type === 'any.empty' ? "Mật khẩu không được để trống."
            : "Mật khẩu phải từ 6 đến 50 ký tự. ";
    }),
    passwordConfirm: Joi.string().required().error(error => {
        return "Vui lòng nhập lại mật khẩu."
    }),
    username: Joi.alternatives().try(
        Joi.string().regex(emailRegex).error(() => "Vui lòng điền email hoặc số điện thoại hợp lệ."),
        Joi.string().regex(phoneNumberRegex).error(() => "Vui lòng điền email hoặc số điện thoại hợp lệ."))
    ,
    checked: Joi.boolean().valid(true).error(() => {
        return 'Để đăng ký , bạn phải đồng ý với các quy định và điều khoản.'
    }),
});
const validateSignIn = (values) => generateFormError(values, schemaSignIn);
const validateSignUp = (values) => generateFormError(values, schemaSignUp);
export {validateSignIn, validateSignUp}