/* Core */
import Vue from 'vue';
import App from './App.vue';

/* Components */
import ElementUI from 'element-ui';
import DefaultLayout from './layouts/default-layout';
import AdminPanelLayout from './layouts/admin-panel-layout';

/* Vue layouts */
Vue.component('default-layout', DefaultLayout);
Vue.component('admin-panel-layout', AdminPanelLayout);

/* Router & Store */
import router from './router';
import store from './store';

/* Directives */
import AwesomeMask from 'awesome-mask';

/* Libs and Plugins */
import locale from 'element-ui/lib/locale/lang/ru-RU'

/* Styles */
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = process.env.NODE_ENV !== 'production';

Vue.prototype.$eventHub = new Vue();

Vue.directive('mask', AwesomeMask);
Vue.use(ElementUI, { locale });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')