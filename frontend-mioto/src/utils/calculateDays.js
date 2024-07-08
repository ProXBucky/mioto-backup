
/**
 * Tính số ngày giữa hai chuỗi ngày định dạng dd/mm/yyyy
 * @param {string} date1 - Ngày bắt đầu định dạng dd/mm/yyyy
 * @param {string} date2 - Ngày kết thúc định dạng dd/mm/yyyy
 * @returns {number} - Số ngày giữa hai ngày
 */
export function calculateDays(date1, date2) {
    // Kiểm tra chuỗi ngày hợp lệ
    if (!date1 || !date2) {
        console.error('Một hoặc cả hai chuỗi ngày bị trống');
        return NaN;
    }

    const parts1 = date1.split('/');
    const parts2 = date2.split('/');

    // Kiểm tra định dạng ngày
    if (parts1.length !== 3 || parts2.length !== 3) {
        console.error('Định dạng ngày không hợp lệ');
        return NaN;
    }

    const formattedDate1 = `${parts1[1]}/${parts1[0]}/${parts1[2]}`;
    const formattedDate2 = `${parts2[1]}/${parts2[0]}/${parts2[2]}`;

    const d1 = new Date(formattedDate1);
    const d2 = new Date(formattedDate2);

    // Kiểm tra đối tượng Date hợp lệ
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        console.error('Đối tượng Date không hợp lệ');
        return NaN;
    }

    const timeDiff = Math.abs(d2 - d1);

    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return dayDiff;
}
