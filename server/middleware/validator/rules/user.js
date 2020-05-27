module.exports = {
	mongoId: {
		type: 'string',
		regexp: '/^[0-9a-fA-F]{24}$/',
		errorMessage: {
			regexp: 'Некорректный формат идентификатора документа'
		}
	},
	email: {
		type: 'string',
		regexp: '/^\\S+@\\S+\\.\\S{2,10}$/',
		errorMessage: {
			regexp: 'Некорректный формат эл. почты'
		}
	},
	secret: {
		type: 'string',
		minLength: 6,
		maxLength: 14,
		regexp: '/^(?=.*[\\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[\\w])[\\w]{6,14}$/',
		errorMessage: {
			minLength: 'Длина пароля должна быть минимум 6 символов',
			maxLength: 'Длина пароля должна быть не более 14 символов',
			regexp: 'Пароль должен длинной от 6 до 14 символов и содержать хотя бы 1 цифру, 1 заглавную и 1 строчную буквы латинского алфавита!'
		}
	},
	userId: {
		type: 'number',
		errorMessage: {
			type: 'Некорректный формат идентификатора пользователя'
		}
	},
	token: {
		type: 'string',
		minLength: 125,
		errorMessage: {
			minLength: 'Некорректный формат токена'
		}
	},
	role: {
		type: 'string',
		enum: ['manager', 'admin', 'super'],
		errorMessage: {
			enum: 'Некорректный уровень прав доступа пользователя'
		}
	},
	firstName: {
		type: 'string',
		minLength: 4,
		maxLength: 20,
		regexp: '/^[a-zA-ZА-Яа-яЁёЇїІіЄєҐґ]+$/',
		errorMessage: {
			minLength: 'Длина имени должна быть не менее 4 символов',
			maxLength: 'Длина имени должна быть не более 20 символов',
			regexp: 'Имя может состоять только из кириллических букв (Укр/Рус)'
		}
	},
	lastName: {
		type: 'string',
		minLength: 4,
		maxLength: 20,
		regexp: '/^[a-zA-ZА-Яа-яЁёЇїІіЄєҐґ]+$/',
		errorMessage: {
			minLength: 'Длина фамилии должна быть не менее 4 символов',
			maxLength: 'Длина фамилии должна быть не более 20 символов',
			regexp: 'Фамилия может состоять только из кириллических букв (Укр/Рус)'
		}
	},
	gender: {
		type: 'string',
		enum: ['male', 'female'],
		errorMessage: {
			enum: 'Нужно выбрать корректное значение поля "Пол"'
		}
	},
	phoneNumber: {
		type: 'string',
		regexp: '/(?=\\+\\d{2}\\s\\(\\d{3}\\)\\s\\d{3}\\s\\d{2}\\s\\d{2})/g',
		errorMessage: {
			regexp: 'Некорректный формат номера телефона'
		}
	},
	birthday: {
		type: 'string',
		format: 'date-time',
		errorMessage: {
			format: 'Некорректный формат даты рождения'
		}
	}
};