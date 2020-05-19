import usersClient from '@/plugins/http-clients/users';

let state = {
	status: '',
	token: '',
	user: {}
};
const getters = {
	isLoggedIn: state => !!state.token,
	currentUser: state => state.user,
	getAuthToken: state => state.token
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
		state.user = {};
	},
	logout(state) {
		state.status = '';
		state.token = '';
		state.user = {};
	},
};
const actions = {
	login({ commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('auth_request');
			
			usersClient.login(payload)
				.then(data => {
					console.log(data)
					commit('auth_success', data);
					
					return resolve(data);
				})
				.catch(error => {
					commit('auth_error');
					
					return reject(error);
				})
		});
	},
	logout({ commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('auth_request');
			usersClient.logout(payload)
				.then(data => {
					commit('logout');
					return resolve(data);
				})
				.catch(error => {
					commit('auth_error');
					return reject(error);
				})
		});
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};