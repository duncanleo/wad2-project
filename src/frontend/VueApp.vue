<template>
  <div>
    <site-header />
    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import SiteHeader from './components/SiteHeader.vue';

const App = Vue.extend({
  components: {
    SiteHeader,
  },
  provide: function () {
    return {
      getUser: this.getUser,
    };
  },
  methods: {
    getUser: async function () {
      try {
        const response = await axios.get<App.Frontend.Models.Me>('/api/me');

        return response.data;
      } catch (e) {
        return null;
      }
    },
  },
});

export default App;
</script>
