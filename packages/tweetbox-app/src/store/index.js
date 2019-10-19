import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import authModule from './modules/auth/auth.module';

Vue.use(Vuex);

const vuexSession = new VuexPersistence({
  storage: window.sessionStorage
});

export default new Vuex.Store({
  plugins: [vuexSession.plugin],
  modules: {
    auth: authModule
  }
});
