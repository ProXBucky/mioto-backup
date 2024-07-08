function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
}

export function compareDay(dateStr1, dateStr2) {
    const date1 = parseDate(dateStr1);
    const date2 = parseDate(dateStr2);

    return date1 <= date2;
}