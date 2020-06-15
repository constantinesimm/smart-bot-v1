/* Core */
import Vue from 'vue';
import App from './App.vue';

/* UI libraries and components */
import ElementUI from 'element-ui';

/* Register components */
Vue.component('AdminLayout', () => import('./layouts/admin-layout'));
Vue.component('DefaultLayout', () => import('./layouts/default-layout'));

/* Router & Store */
import router from './router';
import store from './store';

/* Directives */
import AwesomeMask from 'awesome-mask';

/* Libs and Plugins */
import locale from 'element-ui/lib/locale/lang/ru-RU'

/* Styles */
import './assets/css/theme-chalk/index.css';
import './assets/css/theme-chalk/display.css';

Vue.config.productionTip = process.env.NODE_ENV !== 'production';

Vue.prototype.$eventHub = new Vue();

Vue.directive('mask', AwesomeMask);
Vue.use(ElementUI, { locale });

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')