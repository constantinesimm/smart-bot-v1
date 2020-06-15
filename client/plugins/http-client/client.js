import Axios from 'axios';
import store from '../../store';

const getClient = (baseUrl = null) => {
	let options = {
		baseURL: baseUrl,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8'
		}
	};
	
	const client = Axios.create(options);
	
	// Add a request interceptor
	client.interceptors.request.use(
		requestConfig => {
			if (store.getters['auth/isLoggedIn']) {
				requestConfig.headers.Authorization = store.getters['auth/getAuthToken'];
				
				return requestConfig;
			}
			return requestConfig
		}
	);
	
	// Add a response interceptors
	client.interceptors.response.use(
		response => response,
		(error) => {
			if (error.response.status === 401) {
				store.dispatch('auth/err_logout', error);
				
				return Promise.reject(error);
			}
			
			return Promise.reject(error);
		}
	);
	
	return client;
};

export { getClient };

/**
 * API Clients constructor
 */
class ApiClient {
	constructor(baseUrl = null) {
		this.client = getClient(baseUrl);
	}
	
	get(url, conf = {}) {
		return this.client.get(url, conf)
			.then(response => Promise.resolve(response))
			.catch(error => Promise.reject(error));
	}
	
	post(url, data = {}, conf = {}) {
		return this.client.post(url, data, conf)
			.then(response => Promise.resolve(response))
			.catch(error => Promise.reject(error));
	}
}

export { ApiClient };

/**
 * Base HTTP client
 */
const client = {
	get(url, conf = {}) {
		return getClient().get(url, conf)
			.then(response => Promise.resolve(response))
			.catch(error => Promise.reject(error));
	},
	
	post(url, data = {}, conf = {}) {
		return getClient().post(url, data, conf)
			.then(response => Promise.resolve(response))
			.catch(error => Promise.reject(error));
	}
};

export default client;