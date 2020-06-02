import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "../store";
import el from "element-ui/src/locale/lang/el";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/dashboard/dashboard'),
    meta: {
      title: 'Rice: Дашборд',
      layout: 'admin-panel',
      privateRoute: true
    }
  },
  {
    path: '/users',
    name: 'UsersIndex',
    component: () => import('../views/index/users-index'),
    redirect: '/users/admins/list',
    children: [
      {
        path: 'account',
        name: 'UsersAccount',
        meta: {
          title: 'Rice: Детали пользователя',
          layout: 'admin-panel',
          privateRoute: true
        },
        component: () => import('../views/users/users-account')
      },
      {
        path: 'admins/list',
        name: 'UsersAdminsList',
        meta: {
          title: 'Rice: Сотрудники',
          layout: 'admin-panel',
          privateRoute: true
        },
        component: () => import('../views/users/users-admins-list')
      },
      {
        path: 'client/list',
        name: 'UsersClientsList',
        meta: {
          title: 'Rice: Клиенты',
          layout: 'admin-panel',
          privateRoute: true
        },
        component: () => import('../views/users/users-client-list')
      },
      {
        path: 'login',
        name: 'UsersLogin',
        meta: {
          title: 'Rice: Авторизация',
          layout: 'default',
          publicRoute: true
        },
        component: () => import('../views/users/users-login')
      },
      {
        path: ':token/register/complete',
        name: 'UserRegisterComplete',
        meta: {
          title: 'Rice: Регистрация',
          layout: 'default',
          publicRoute: true
        },
        component: () => import('../views/users/users-register-complete')
      },
      {
        path: ':token/password/restore',
        name: 'UserPasswordRestore',
        meta: {
          title: 'Rice: Восстановление пароля',
          layout: 'default',
          publicRoute: true
        },
        component: () => import('../views/users/users-password-restore')
      }
    ]
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  //устанавливаем title страницы из мета-тега маршрута.
  //если он не указан - присваиваем дефолтное значение
  if (to.matched.some(record => record.meta.title)) {
    document.title = to.meta.title;
    next();
  }
  
  //privateRoute доступен только авторизированным юзерам.
  //если не авторизирован - перенаправляем на страницу логина
  if (to.matched.some(record => record.meta.privateRoute)) {
    if (!store.getters['auth/isLoggedIn']) {
      next({
        path: '/users/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next();
    }
  } else {
    next();
  }
  
  //publicRoute доступен только неавторизированным юзерам.
  //если юзер авторизован - перенаправляем его обратно.
  if (to.matched.some(record => record.meta.publicRoute)) {
    if (store.getters['auth/isLoggedIn']) {
      next({
        path: from.fullPath
      })
    } else {
      next();
    }
  } else {
    next();
  }
  
  //serviceRoute доступен только юзерам c уровнем прав доступа - супер админ.
  //если прав доступа недостаточно - перенаправляем его обратно.
  if (to.matched.some(record => record.meta.serviceRoute)) {
    if (store.getters['auth/currentUser'].role === 'super') {
      next({
        path: from.fullPath
      })
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;