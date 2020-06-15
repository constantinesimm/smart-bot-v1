const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://rice-smart-bot.herokuapp.com' : 'http://localhost:3000';

const AUTH = {
	LOGIN: `/api/auth/authenticate`,
	LOGOUT: `/api/auth/logout`,
	CHECK_TOKEN: `/api/auth/check/token/`
};

const USERS = {
	EDIT: `/api/users/employee/edit`,
	REMOVE: `/api/users/employee/remove`,
	GET_ADMINS: `/api/users/admins/all`,
	GET_CLIENTS: `/api/users/clients/all`,
	REG_INVITE: `/api/users/register/invite`,
	REG_COMPLETE: `/api/users/register/complete`,
	PASS_RESTORE_REQUEST: `/api/users/password/restore/invite`,
	PASS_RESTORE_COMPLETE: `/api/users/password/restore/complete`,
};

export { BASE_URL, AUTH, USERS };
