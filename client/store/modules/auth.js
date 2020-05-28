import Axios from 'axios';
import router from "../../router";
import { AUTH } from "../../config/constants/endpoints";
import authClient from '../../plugins/http-client/auth';

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
			console.log('login({ commit }', AUTH.LOGIN, process.env.APP_ADDR, process.env.NODE_ENV )
			
			Axios.post(AUTH.LOGIN, payload)
				.then(response => {
					commit('auth_success', response.data);
					
					return resolve(response.data);
				})
				.catch(error => {
					commit('auth_error');
					
					return reject(error.response.data);
				});
		});
	},
	logout({ commit }) {
		return new Promise((resolve, reject) => {
			commit('auth_request');
			
			authClient.logout()
				.then(response => {
					commit('logout');
					
					return resolve(response);
				})
				.catch(error => {
					commit('err_logout');
					
					return reject(error);
				})
		});
	},
	err_logout({ commit }, payload) {
		commit('logout');
		setTimeout(() => router.push('/users/login'), 1000);
		
		return payload;
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