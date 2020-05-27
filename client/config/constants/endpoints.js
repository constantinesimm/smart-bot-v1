const appUrl = process.env.NODE_ENV === 'production' ? `${window.location.origin}/api` : 'http://localhost:3000/api';

const AUTH = {
	LOGIN: `${ appUrl }/auth/authenticate`,
	LOGOUT: `${ appUrl }/auth/logout`,
	REG_INVITE: `${ appUrl }/auth/register/invite`,
	REG_COMPLETE: `${ appUrl }/auth/register/complete`,
	PASS_RESTORE_INVITE: `${ appUrl }/auth/password/restore/invite`,
	PASS_RESTORE_COMPLETE: `${ appUrl }/auth/password/restore/complete`,
	CHECK_TOKEN: `${ appUrl }/auth/check/token/`
};

const USERS = {
	EDIT: `${ appUrl }/users/employee/edit`,
	REMOVE: `${ appUrl }/users/employee/remove`,
	GET_ADMINS: `${ appUrl }/users/admins/all`,
	GET_CLIENTS: `${ appUrl }/users/clients/all`,
};

export { AUTH, USERS };
