import Vue from 'vue';

import Hello from './hello.vue';

/**
 * HMR code
 **/
if (module['hot']) {
  module['hot'].accept();
}

new Vue({
  el: '#root',
  template: '<Hello />',
  components: {
    Hello,
  },
});
