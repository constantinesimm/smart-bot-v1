import { ApiClient } from './client';
import { USERS } from "../../config/constants/endpoints";

const client = new ApiClient(USERS.BASE_URL);

export default {
	login(data) {
		return client.post(USERS.LOGIN, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	logout(data) {
		return client.post(USERS.LOGOUT, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	registerInvite(data) {
		return client.post(USERS.REG_INVITE, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	registerComplete(data) {
		return client.post(USERS.REG_COMPLETE, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	passRestoreInvite(data) {
		return client.post(USERS.PASS_RESTORE_INVITE, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	passwordRestoreComplete(data) {
		return client.post(USERS.PASS_RESTORE_COMPLETE, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	employeeRemove(data) {
		return client.post(USERS.REMOVE, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	checkServiceToken(data) {
		return client.post(USERS.CHECK_SERVICE_TOKEN, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	}
};