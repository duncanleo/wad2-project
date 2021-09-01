<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
import Vue from 'vue';

const App = Vue.extend({
  data: function () {
    return {
      greeting: 'Sup',
    };
  },
});

export default App;
</script>
