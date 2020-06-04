import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import AuthLogin from '../views/auth/AuthLogin';

const withPrefix = (prefix, routes) => routes.map((route) => {
	route.path = prefix + route.path;
	return route;
});

const routes = [
	{
		path: '/',
		redirect: '/dashboard'
	},
	{
		path: '/dashboard',
		name: 'AdminDashboard',
		meta: {
			layout: 'admin',
			pageTitle: 'Rice: Информационная панель',
			requiresAuth: true
		},
		component: () => import(`@/views/dashboard/AdminDashboard`)
	},
	...withPrefix('/auth', [
		{
			path: '/login',
			name: 'AuthLogin',
			meta: {
				layout: 'default',
				pageTitle: 'Rice: Аутентификация',
				requiresGuest: true
			},
			component: AuthLogin
		},
		{
			path: '/:serviceToken/password/recovery',
			name: 'PasswordRecovery',
			meta: {
				layout: 'default',
				pageTitle: 'Rice: Восстановление пароля',
				requiresGuest: true
			},
			component: () => import(`@/views/auth/PasswordRecovery`)
		},
	]),
	...withPrefix('/users', [
		{
			path: '/clients',
			name: 'ClientsList',
			meta: {
				layout: 'admin',
				pageTitle: 'Rice: Список клиентов',
				requiresAuth: true
			},
			component: () => import(`@/views/users/ClientsList`)
		},
		{
			path: '/staff',
			name: 'StaffList',
			meta: {
				layout: 'admin',
				pageTitle: 'Rice: Список сотрудников',
				requiresAuth: true
			},
			component: () => import(`@/views/users/StaffList`)
		},
		{
			path: '/profile',
			name: 'UserProfile',
			meta: {
				layout: 'admin',
				pageTitle: 'Rice: Профиль пользователя',
				requiresAuth: true
			},
			component: () => import(`@/views/users/UserProfile`)
		},
		{
			path: '/:serviceToken/register/complete',
			name: 'RegisterComplete',
			meta: {
				layout: 'default',
				pageTitle: 'Rice: Завершение регистрации',
				requiresAuth: false
			},
			component: () => import(`@/views/users/RegisterComplete`)
		}
	])
];

Vue.use(VueRouter);

const router = new VueRouter({
	routes,
	mode: 'history',
	linkActiveClass: '',
	linkExactActiveClass: 'isActive'
	
});

/**
 *  Routes options and guards
 */
router.beforeEach((to, from, next) => {
	
	// Setting pages title from route props
	if (to.matched.some(record => record.meta.pageTitle)) {
		document.title = to.meta.pageTitle;
		next();
	}
	
	/*
	// Routes guard
	// Available only for authenticated users. if guest user -> redirect to auth page
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!store.getters['auth/isLoggedIn']) {
			next({
				path: '/auth/login',
				query: { redirect: to.fullPath }
			});
		} else {
			next();
		}
	} else {
		next();
	}
	
	// Available only for guest users. if user authenticated -> redirect to prev page
	if (to.matched.some(record => record.meta.requiresGuest)) {
		if (store.getters['auth/isLoggedIn']) {
			next({
				path: from.fullPath
			});
		} else {
			next();
		}
	} else {
		next();
	}
	 */
});

export default router;