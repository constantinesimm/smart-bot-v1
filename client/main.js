/* Core */
import Vue from 'vue';
import App from './App.vue';

/* UI libraries and components */
import ElementUI from 'element-ui';
import { AdminLayout, DefaultLayout } from './layouts';

/* Register components */
Vue.use(AdminLayout);
Vue.use(DefaultLayout);

/* Router & Store */
import router from './router/router';
import store from './store';

/* Directives */
import AwesomeMask from 'awesome-mask';

/* Libs and Plugins */
import locale from 'element-ui/lib/locale/lang/ru-RU'

/* Styles */
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

Vue.config.productionTip = process.env.NODE_ENV !== 'production';

Vue.prototype.$eventHub = new Vue();

Vue.directive('mask', AwesomeMask);
Vue.use(ElementUI, { locale });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')