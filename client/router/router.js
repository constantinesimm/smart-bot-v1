import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routesPrefix = (prefix, routes) => {
	return routes.map(route => route.path = `${ prefix }/${ route.path }`);
};

const routes = [
	{
		path: '/',
		redirect: '/dashboard'
	},
	...routesPrefix('/auth', [
		{
			path: 'login',
			name: 'AuthLogin',
			meta: {
				layout: 'default',
				pageTitle: 'Rice: Аутентификация',
				requiresAuth: false
			},
			component: () => import(`@/views/auth/AuthLogin`)
		},
		{
			path: ':serviceToken/password/recovery',
			name: 'PasswordRecovery',
			meta: {
				layout: 'default',
				pageTitle: 'Rice: Восстановление пароля',
				requiresAuth: false
			},
			component: () => import(`@/views/auth/PasswordRecovery`)
		},
	]),
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
	...routesPrefix('/users', [
		{
			path: 'client',
			name: 'ClientsList',
			meta: {
				layout: 'admin',
				pageTitle: 'Rice: Список клиентов',
				requiresAuth: true
			},
			component: () => import(`@/views/users/ClientsList`)
		},
		{
			path: 'staff',
			name: 'StaffList',
			meta: {
				layout: 'admin',
				pageTitle: 'Rice: Список сотрудников',
				requiresAuth: true
			},
			component: () => import(`@/views/users/StaffList`)
		},
		{
			path: 'profile',
			name: 'UserProfile',
			meta: {
				layout: 'admin',
				pageTitle: 'Rice: Профиль пользователя',
				requiresAuth: true
			},
			component: () => import(`@/views/users/UserProfile`)
		},
		{
			path: ':serviceToken/register/complete',
			name: 'RegisterComplete',
			meta: {
				layout: 'default',
				pageTitle: 'Rice: Завершение регистрации',
				requiresAuth: false
			},
			component: () => import(`@/views/users/RegisterComplete`)
		}
	]),
	{
		path: '*',
		redirect: '/dashboard'
	}
];

const router = new VueRouter({
	mode: 'history',
	routes
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
	
	// Checking routes guard
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	
	// Available only for authenticated users
	// if guest user -> redirect to auth page
	if (requiresAuth && !store.getters['auth/isLoggedIn']) {
		next({
			path: '/auth/login',
			query: { redirect: to.fullPath }
		});
	} else next();
	
	// Available only for guest users
	// if user authenticated -> redirect to prev page
	if (!requiresAuth && store.getters['auth/isLoggedIn']) {
		next({
			path: from.fullPath
		});
	} else next();
});

export default router;