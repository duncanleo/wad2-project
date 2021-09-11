<template>
  <p>{{ greeting }} World!</p>
</template>

<script lang="ts">
import Vue from 'vue';

const Home = Vue.extend({
  data: function () {
    return {
      greeting: 'Sup',
    };
  },
});

export default Home;
</script>
