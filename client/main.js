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

/* Libs and npm packages */
import Axios from 'axios';
import ls from './plugins/storage/secure-ls';

/* Directives */
import AwesomeMask from 'awesome-mask';

/* Styles */
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = process.env.NODE_ENV !== 'production';

Vue.directive('mask', AwesomeMask);
Vue.use(ElementUI);

Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')