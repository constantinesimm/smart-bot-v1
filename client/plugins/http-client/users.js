import { ApiClient } from './client';
import { AUTH, BASE_URL, USERS } from "../../config/constants/endpoints";

const client = new ApiClient(BASE_URL);

export default {
	getAll(type) {
		let endpoint = type === 'admins' ? USERS.GET_ADMINS : USERS.GET_CLIENTS;
		
		return client.post(endpoint)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},

	employeeEdit(docId, data) {
		return client.post(`${ USERS.EDIT }/${ docId }`, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},

	employeeRemove(docId, data) {
		return client.post(`${ USERS.REMOVE }/${ docId }`, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
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
	}
};