import moment from "moment";


export const formatDayOfWeek = (time) => {
    let ddd = moment(time).day();
    switch (ddd) {
        case 0:
            return 'CN';
        case 1:
            return 'Thứ hai';
        case 2:
            return 'Thứ ba';
        case 3:
            return 'Thứ tư';
        case 4:
            return 'thứ năm';
        case 5:
            return 'thứ sáu';
        case 6:
            return 'thứ bảy';
        default:
            return '';
    }
};
export const formatDateTime = (time) => {
    const HH = moment(time).hour();
    const mm = moment(time).minute();
    const DD = moment(time).date();
    let MM = moment(time).month();
    const YYYY = moment(time).year();
    const ddd = formatDayOfWeek(time);
    MM = MM < 10 ? '0' + MM : DD;
    return HH + ':' + mm + ' ' + ddd + ' ' + DD + '-' + MM + '-' + YYYY;
};