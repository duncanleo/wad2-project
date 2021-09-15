import './index.scss';
import 'bootstrap';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import axios from 'axios';
import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';
import Vuex from 'vuex';

import CheckIn from './screens/CheckIn/index.vue';
import Feed from './screens/Feed/index.vue';
import Home from './screens/Home/index.vue';
import Login from './screens/Login/index.vue';
import NotFound from './screens/NotFound.vue';
import Signup from './screens/Signup/index.vue';
import VueApp from './VueApp.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store<App.Frontend.Store.RootState>({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user: App.Frontend.Models.Me | null) {
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, payload) {
      commit('setUser', payload);
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
});

export default store;

/**
 * Route protection
 * https://webomnizz.com/protecting-route-for-authenticated-users-in-vue-js/
 **/

const routes: RouterOptions['routes'] = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '*', component: NotFound },
  {
    path: '/feed',
    component: Feed,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/checkin',
    component: CheckIn,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (!requiresAuth) {
    next();
    return;
  }

  if (store.state.user != null) {
    next();
  } else {
    // Check auth
    try {
      const response = await axios.get<App.Frontend.Models.Me>('/api/me');
      store.dispatch('setUser', response.data);
      next();
    } catch (e) {
      next('login');
    }
  }
});

/**
 * HMR code
 **/
if (module['hot']) {
  module['hot'].accept();
}

new Vue({
  router,
  render: (h) => h(VueApp),
  store,
}).$mount('#root');
