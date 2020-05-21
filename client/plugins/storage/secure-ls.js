import SecureLS from 'secure-ls';

const ls = new SecureLS({
	encodingType: '',
	isCompression: false,
	encryptionSecret: process.env.LS_CONTROL_STRING
});

export default ls;