const contentFormat = {
	phone(number) {
		let countryCode = number.substr(0,2);
		let operatorCode = number.substr(2,3);
		let phone = {
			start: number.substr(5, 3),
			middle: number.substr(8, 2),
			end: number.substr(10, 2)
		}
		
		return `+${countryCode} (${operatorCode}) ${phone.start} ${phone.middle} ${phone.end}`;
	}
};

export default contentFormat;