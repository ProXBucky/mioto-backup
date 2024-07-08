function convertVietnameseToEnglish(cityName) {
    const vietnameseCharacters = 'àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđĐ';
    const englishCharacters = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydd';

    // Chuyển đổi từ có dấu thành không dấu
    let cityNameWithoutDiacritics = '';
    for (let i = 0; i < cityName.length; i++) {
        const char = cityName[i];
        const index = vietnameseCharacters.indexOf(char);
        cityNameWithoutDiacritics += index !== -1 ? englishCharacters[index] : char;
    }

    // Xóa tất cả các ký tự không phải chữ cái
    const cityNameWithoutSpecialChars = cityNameWithoutDiacritics.replace(/[^a-zA-Z]/g, '');

    return cityNameWithoutSpecialChars;
}

function convertToShortForm(cityName) {
    // Loại bỏ các ký tự không mong muốn
    const cleanedCity = cityName.replace(/(Tỉnh|Thành phố)/g, '').trim();

    // Chuyển đổi từ thành chữ cái viết thường
    const words = cleanedCity.split(' ').map((word, index) => {
        // Chỉ chuyển đổi các ký tự sau ký tự đầu tiên của từ
        if (index !== 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word.toLowerCase(); // Ký tự đầu tiên của từ viết thường
    });

    // Ghép các từ lại với nhau
    return words.join('');
}

// Kết hợp cả hai hàm
export function convertCityName(cityName) {
    const shortForm = convertToShortForm(cityName);
    return convertVietnameseToEnglish(shortForm);
}