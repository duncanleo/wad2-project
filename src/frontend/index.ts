import './index.scss';
import 'bootstrap';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import axios from 'axios';
import Vue from 'vue';
import VueHead from 'vue-head';
import VueRouter, { RouterOptions } from 'vue-router';
import Vuex from 'vuex';

import Home from './screens/Home/index.vue';
import Login from './screens/Login/index.vue';
import NotFound from './screens/NotFound.vue';
import Player from './screens/Player/index.vue';
import Profile from './screens/Profile/index.vue';
import Signup from './screens/Signup/index.vue';
import SingleTeam from './screens/SingleTeam/index.vue';
import SingleTournament from './screens/SingleTournament/index.vue';
import Teams from './screens/Teams/index.vue';
import TournamentNew from './screens/TournamentNew/index.vue';
import Tournaments from './screens/Tournaments/index.vue';
import VueApp from './VueApp.vue';

Vue.use(VueHead);
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
    path: '/teams',
    component: Teams,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/teams/:id',
    component: SingleTeam,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/players/:id',
    component: Player,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tournaments/new',
    component: TournamentNew,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tournaments',
    component: Tournaments,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tournaments/:id',
    component: SingleTournament,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    component: Profile,
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

  if (store.state.user != null) {
    next();
  } else if (to.path !== '/login') {
    // Check auth
    try {
      const response = await axios.get<App.Frontend.Models.Me>('/api/me');
      store.commit('setUser', response.data);
      next();
    } catch (e) {}
  }

  if (!requiresAuth) {
    next();
    return;
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
