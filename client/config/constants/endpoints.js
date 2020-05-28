const appUrl = process.env.NODE_ENV === 'production' ? `${ process.env.APP_ADDR }/api` : 'http://localhost:3000/api';
const { appHost } = require('../../../server/config');

const AUTH = {
	LOGIN: `api/auth/authenticate`,
	LOGOUT: `api/auth/logout`,
	REG_INVITE: `api/auth/register/invite`,
	REG_COMPLETE: `api/auth/register/complete`,
	PASS_RESTORE_INVITE: `api/auth/password/restore/invite`,
	PASS_RESTORE_COMPLETE: `api/auth/password/restore/complete`,
	CHECK_TOKEN: `api/auth/check/token/`
};

const USERS = {
	EDIT: `api/users/employee/edit`,
	REMOVE: `api/users/employee/remove`,
	GET_ADMINS: `api/users/admins/all`,
	GET_CLIENTS: `api/users/clients/all`,
};

export { AUTH, USERS };
