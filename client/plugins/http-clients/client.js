import Axios from 'axios';
import Raven from 'raven-js';
import store from '@/store';
import ls from '../storage/secure-ls';

const getClient = (baseUrl = null) => {
	let options = {
		baseURL: baseUrl,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
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
		},
		(requestError) => {
			Raven.captureException(requestError);
			
			return Promise.reject(requestError);
		}
	);
	
	// Add a response interceptors
	client.interceptors.response.use(
		response => response,
		(error) => {
			if (error.response.status === 401) {
				store.dispatch('auth/logout');
			}
			if (error.response.status >= 500) {
				Raven.captureException(error);
			}
			
			return Promise.reject(error);
		}
	);
	
	return client;
};

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