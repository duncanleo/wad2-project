import './index.scss';
import 'bootstrap';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';

import CheckIn from './screens/CheckIn/index.vue';
import Feed from './screens/Feed/index.vue';
import Home from './screens/Home/index.vue';
import Login from './screens/Login/index.vue';
import NotFound from './screens/NotFound.vue';
import Signup from './screens/Signup/index.vue';
import VueApp from './VueApp.vue';

Vue.use(VueRouter);

const routes: RouterOptions['routes'] = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '*', component: NotFound },
  {
    path: '/feed',
    component: Feed,
  },
  {
    path: '/checkin',
    component: CheckIn,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
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
}).$mount('#root');
