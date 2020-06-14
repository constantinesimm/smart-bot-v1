import { ApiClient } from './client';
import { BASE_URL, AUTH } from "../../config/constants/endpoints";

const client = new ApiClient(BASE_URL);

export default {
	logout(data) {
		return client.post(AUTH.LOGOUT, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data))
	},
	
	checkToken(type, data) {
		return client.post(`${ AUTH.CHECK_TOKEN }${ type }`, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	}
};