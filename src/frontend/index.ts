import './index.scss';

import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';

import App from './App.vue';
import Home from './screens/Home/index.vue';
import Login from './screens/Login/index.vue';
import NotFound from './screens/NotFound.vue';

Vue.use(VueRouter);

const routes: RouterOptions['routes'] = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '*', component: NotFound },
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
  render: (h) => h(App),
}).$mount('#root');
