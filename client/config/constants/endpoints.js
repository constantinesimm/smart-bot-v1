const appUrl = process.env.NODE_ENV === 'production' ? 'https://rice-smart-bot.herokuapp.com/' : 'http://localhost:3000/api';

const AUTH = {
	LOGIN: `${appUrl}api/auth/authenticate`,
	LOGOUT: `${appUrl}api/auth/logout`,
	REG_INVITE: `${appUrl}api/auth/register/invite`,
	REG_COMPLETE: `${appUrl}api/auth/register/complete`,
	PASS_RESTORE_INVITE: `${appUrl}api/auth/password/restore/invite`,
	PASS_RESTORE_COMPLETE: `${appUrl}api/auth/password/restore/complete`,
	CHECK_TOKEN: `${appUrl}api/auth/check/token/`
};

const USERS = {
	EDIT: `${appUrl}api/users/employee/edit`,
	REMOVE: `${appUrl}api/users/employee/remove`,
	GET_ADMINS: `${appUrl}api/users/admins/all`,
	GET_CLIENTS: `${appUrl}api/users/clients/all`,
};

export { AUTH, USERS };
