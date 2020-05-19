import Vue from 'vue';
import Vuex from 'vuex';
import SecureLS from 'secure-ls';
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import ls from '@/plugins/storage/secure-ls';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [
      createPersistedState({
        key: '$app_smartbot',
        getState: key => ls.get(key),
        setState: (key, state) => ls.set(key, state)
      })
  ]
});
