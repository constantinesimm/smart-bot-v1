import { ApiClient } from './client';
import { AUTH } from "../../config/constants/endpoints";

const client = new ApiClient();

export default {
	login(data) {
		return client.post(AUTH.LOGIN, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	logout(data) {
		return client.post(AUTH.LOGOUT, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error))
	},
	
	registerInvite(data) {
		return client.post(AUTH.REG_INVITE, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	registerComplete(data) {
		return client.post(AUTH.REG_COMPLETE, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	passRestoreInvite(data) {
		return client.post(AUTH.PASS_RESTORE_INVITE, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	passwordRestoreComplete(data) {
		return client.post(AUTH.PASS_RESTORE_COMPLETE, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},
	
	checkToken(type, data) {
		return client.post(`${ AUTH.CHECK_TOKEN }${ type }`, data)
			.then(response => {
				console.log(response)
				return Promise.resolve(response.data)
			})
			.catch(error => Promise.reject(error.response.data));
	}
};