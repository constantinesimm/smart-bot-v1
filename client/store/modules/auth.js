import Axios from 'axios';
import { AUTH } from "../../config/constants/endpoints";

import authClient from '../../plugins/http-clients/auth';

let state = {
	status: '',
	token: '',
	user: {}
};

const getters = {
	isLoggedIn: state => !!state.token,
	getAuthToken: state => state.token,
	currentUser: state => state.user
};

const mutations = {
	auth_request(state) {
		state.status = 'loading';
	},
	auth_success(state, data) {
		state.status = 'success';
		state.token = data.token;
		state.user = data.user;
	},
	auth_error(state) {
		state.status = 'error';
		state.token = '';
		state.user = '';
	},
	user_update(state, data) {
		state.user = data.user;
	},
	logout(state) {
		state.status = '';
		state.token = '';
		state.user = '';
	},
};
const actions = {
	login({ commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('auth_request');
			
			Axios.post(AUTH.LOGIN, payload, {
				baseURL: AUTH.BASE_URL,
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
			})
				.then(response => {
					commit('auth_success', response.data);
					Axios.defaults.headers.common['Authorization'] = response.data.token;
					
					return resolve(response.data);
				})
				.catch(error => {
					commit('auth_error');
					delete Axios.defaults.headers.common['Authorization'];
					
					return reject(error);
				});
		});
	},
	logout({ commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('auth_request');
			
			authClient.logout(payload)
				.then(data => {
					commit('logout');
					delete Axios.defaults.headers.common['Authorization'];
					
					return resolve(data);
				})
				.catch(error => {
					commit('auth_error');
					
					return reject(error);
				});
		});
	},
	update_user({ commit }, payload) {
		commit('user_update', payload);
		
		return Promise.resolve(payload);
	},
	password_restore({ commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('auth_request');
			
			authClient.passRestoreInvite(payload)
				.then(data => resolve(data))
				.catch(error => {
					commit('auth_error');
					
					return reject(error);
				})
		})
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};