import { isToday, isThisWeek, format, addMinutes, parse } from 'date-fns';


function getCurrentDate() {
    const currentDate = new Date();
    return currentDate;
}

function formatDate(date) {
    const formatedDate = new Date(date);
    return format(formatedDate, 'dd MMM yyyy')
}

function reFormatDate(date){
    const formatedDate = parse(date, 'dd MMM yyyy', new Date());
    return format(formatedDate, 'yyyy-MM-dd');
}

function checkIsToday(date) {
    return isToday(date);
}

function checkIsThisWeek(date) {
    return isThisWeek(date);
}

function adjustTimezone(date) {
    let newDate = new Date(date);
    const localTimeZoneOffset = newDate.getTimezoneOffset();
    const adjustedDate = addMinutes(newDate, localTimeZoneOffset);
    return adjustedDate;
}

export {
    getCurrentDate as currentDate,
    checkIsToday as checkToday,
    checkIsThisWeek as checkThisWeek,
    formatDate,
    reFormatDate,
    adjustTimezone
};

