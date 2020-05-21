const appUrl = process.env.NODE_ENV === 'production' ? `${ window.location.origin }` : 'http://localhost:3000';

const AUTH = {
	LOGIN: '/authenticate',
	LOGOUT: '/logout',
	REG_INVITE: '/register/invite',
	REG_COMPLETE: '/register/complete',
	PASS_RESTORE_INVITE: '/password/restore/invite',
	PASS_RESTORE_COMPLETE: '/password/restore/complete',
	CHECK_TOKEN: '/check/token/',
	get BASE_URL() {
		return `${ appUrl }/api/auth`
	},
};

const USERS = {
	EDIT: '/employee/edit',
	REMOVE: '/employee/remove',
	GET_ADMINS: '/admins/all',
	GET_CLIENTS: '/clients/all',
	get BASE_URL() {
		return `${ appUrl }/api/users`
	},
};

export { AUTH, USERS };