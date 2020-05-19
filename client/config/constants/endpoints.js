const appUrl = process.env.NODE_ENV === 'production' ? `${ window.location.origin }` : 'http://localhost:3000';

const USERS = {
	LOGIN: '/authenticate',
	LOGOUT: '/logout',
	REG_INVITE: '/register/invite',
	REG_COMPLETE: '/register/complete',
	PASS_RESTORE_INVITE: '/password/restore/invite',
	PASS_RESTORE_COMPLETE: '/password/restore/complete',
	REMOVE: '/employee/remove',
	CHECK_SERVICE_TOKEN: '/check/serviceToken',
	get BASE_URL() {
		return `${ appUrl }/api/users`
	},
};

export { USERS };
