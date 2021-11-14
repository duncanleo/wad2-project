<template>
  <div class="container-fluid p-0">
    <site-header />
    <main class="container-fluid p-0">
      <router-view></router-view>
    </main>
    <site-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';

const App = Vue.extend({
  components: {
    SiteHeader,
    SiteFooter,
  },
});

export default App;
</script>
