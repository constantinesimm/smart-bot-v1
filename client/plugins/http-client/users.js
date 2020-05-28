import { ApiClient } from './client';
import { USERS } from "../../config/constants/endpoints";

const client = new ApiClient(process.env.APP_ADDR);

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
	}
};