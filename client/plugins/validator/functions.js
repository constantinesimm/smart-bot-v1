const validatePassword = (rule, value, callback) => {
    const reDigit = /(?=.*[\d])/g;
    const reLowerLetter = /(?=.*[a-z])/g;
    const reUpperLetter = /(?=.*[A-Z])/g;
    const reAllFormat = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[\w])[\w]{6,14}$/;

    if (!reLowerLetter.test(value)) return callback('Нужна хотя бы 1 буква латиницы в нижнем регистре');
    if (!reUpperLetter.test(value)) return callback('Нужна хотя бы 1 буква латиницы в верхнем регистре');
    if (!reDigit.test(value)) return callback('Нужна хотя бы 1 цифра');
    if (!reAllFormat.test(value)) return callback('Некорректный формат поля "Пароль');


    else return callback();
};

const validateCyrillicNames = (rule, value, callback) => {
    const reCyrillicLetters = /^[А-Яа-яЁёЇїІіЄєҐґ]{4,20}$/;

    return reCyrillicLetters.test(value) ? callback() : callback('Поле может содержать только буквы кириллицы (Укр/Рус)')
};

const validatePhoneNumber = (rule, value, callback) => {
    //regExp for mask +99 (999) 999 99 99
    const rePhoneNumber = /(?=\+\d{2}\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2})/g;

    return rePhoneNumber.test(value) ? callback() : callback('Номер телефона должен содержать только цифры')
};

export {
    validatePassword,
    validateCyrillicNames,
    validatePhoneNumber
}