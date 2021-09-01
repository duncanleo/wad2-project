import Vue from 'vue';

import Hello from './hello.vue';

new Vue({
  el: '#root',
  template: '<Hello />',
  components: {
    Hello,
  },
});
