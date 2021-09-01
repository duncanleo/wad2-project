import Vue from 'vue';

import App from './App.vue';

/**
 * HMR code
 **/
if (module['hot']) {
  module['hot'].accept();
}

new Vue({
  render: (h) => h(App),
}).$mount('#root');
