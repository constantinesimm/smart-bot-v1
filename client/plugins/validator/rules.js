import {
    validateCyrillicNames,
    validatePassword,
    validatePhoneNumber
} from "./functions";

const validateRules = {
    email: [
        { required: true, message: 'Введите email' },
        { type: 'email', message: 'Некорректный формат поля "E-mail"' }
    ],
    firstName: [
        { required: true, message: 'Введите имя' },
        { min: 4, max: 20, message: 'Длина должна быть от 4 до 20 символов' },
        { validator: validateCyrillicNames }
    ],
    lastName: [
        { required: true, message: 'Введите фамилию' },
        { min: 4, max: 20, message: 'Длина должна быть от 4 до 20 символов' },
        { validator: validateCyrillicNames }
    ],
    gender: [
        { required: true, message: 'Выберите ваш пол', trigger: 'blur' }
    ],
    phoneNumber: [
        { required: true, message: 'Введите номер телефона' },
        { len: 19, message: 'Длина номера должна быть 12 цифр' },
        { validator: validatePhoneNumber }
    ],
    secret: [
        { required: true, message: 'Введите пароль' },
        { min: 6, max: 14, message: 'Длина пароля - мин 6 и макс 14 символов' },
        { validator: validatePassword }
    ]
};

export default validateRules;