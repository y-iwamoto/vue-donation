import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import wallets from './modules/wallets';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    users,
    wallets
  }
});
