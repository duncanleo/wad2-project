<template>
  <div>
    <site-header />
    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SiteHeader from './components/SiteHeader.vue';

const App = Vue.extend({
  components: {
    SiteHeader,
  },
});

export default App;
</script>
