import Vue from 'vue';
import Vuex from 'vuex';
import ls from '../plugins/storage/secure-ls';
import createPersistedState from 'vuex-persistedstate';

/**
 * Modules
 */
import auth from './modules/auth';

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
