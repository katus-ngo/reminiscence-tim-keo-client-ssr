import moment from "moment";
import {
    formatDateTime,
    formatDayOfWeek
} from "./formatDateTime.helper";

export const convertTournamentStatus = (text) => {
    switch (text) {
        case 'registering':
            return {
                status: 'Đang đăng kí',
                color: '#00af00'
            };
        case 'waiting':
            return {
                status: 'Sắp diễn ra',
                color: '#10baa8'
            };
        case 'playing':
            return {
                status: 'Đang thi đấu',
                color: '#bc952c'
            };
        case 'ended':
            return {
                status: 'Kết thúc',
                color: '#c43855'
            };
        default:
            return {
                status: 'Bản nháp',
                color: '#acacac'
            };
    }
};
export const convertTournamentDaysAround = (date, dates = {}, status) => {
    const time = date ? date : (status !== 'ended' ? dates.startAt : dates.endAt);
    const today = moment().endOf('day').format('X');
    const tomorrow = moment().add(1, 'day').endOf('day').format('X');
    const yesterday = moment().subtract(1, 'day').endOf('day').format('X');
    const theDayBefore = moment().subtract(2, 'day').endOf('day').format('X');
    const thisWeek = moment().endOf('week').format('X');
    const lastWeek = moment().subtract(1, 'week').endOf('week').format('X');
    const timeStamp = moment(time).format('X');
    if (theDayBefore < timeStamp && timeStamp < yesterday) {
        return 'Hôm qua lúc ' + moment(time).locale('vi').format("HH:mm");
    }
    if (yesterday < timeStamp && timeStamp < today) {
        return 'Hôm nay lúc ' + moment(time).locale('vi').format("HH:mm");
    }
    if (today < timeStamp && timeStamp < tomorrow) {
        return 'Ngày mai lúc ' + moment(time).locale('vi').format("HH:mm");
    }
    if (lastWeek < timeStamp && timeStamp < thisWeek) {
        return formatDayOfWeek(time) + ' lúc ' + moment(time).hour() + ':' + moment(time).minute();
    }
    return formatDateTime(time);
};