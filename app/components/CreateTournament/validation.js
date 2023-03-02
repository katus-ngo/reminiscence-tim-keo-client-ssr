import Joi from '@hapi/joi';
import {generateFormError} from 'app/utils/validation.util';

const schema = Joi.object().keys({
    host: Joi.string().required().min(3).max(200).error(error => {
        return error[0].type === 'any.empty' ? "Bạn chưa nhập địa chỉ Đơn vị tổ chức."
            : "Đơn vị tổ chức phải từ 3 đến 200 ký tự. ";
    }),
    tournamentName: Joi.string().required().min(2).max(200).error(error => {
        return error[0].type === 'any.empty' ? "Bạn chưa nhập tên giải đấu."
            : "Tên giải đấu phải từ 3 đến 200 ký tự. ";
    }),
    description: Joi.string().required().min(50).max(20000).error(error => {
        return error[0].type === 'any.empty' ? "Bạn chưa nhập mô tả cho giải đấu."
            : "Mô tả phải từ 50 đến 20.000 ký tự. ";
    }),
    slot: Joi.number().required().min(2).max(128).error(error => {
        return "Số lượng tham gia tối thiểu là 2, tối đa là 128.";
    }),
    prizePool: Joi.number().required().error(error => {
        return "Bạn chưa nhập tổng giải thưởng.";
    }),
    firstPlacePrize: Joi.number().required().error(error => {
        return "Bạn chưa nhập giải thưởng cho nhà vô địch.";
    }),
});
const validate = (values) => generateFormError(values, schema);
export {validate}