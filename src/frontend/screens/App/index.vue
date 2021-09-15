<template>
  <div v-if="isAuthenticated">
    <ul class="nav nav-pills nav-fill">
      <li class="nav-item">
        <router-link class="nav-link" active-class="active" to="/app/feed">
          Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" active-class="active" to="/app/checkin">
          Check in
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';

interface Data {
  isAuthenticated: boolean | null;
  user: App.Frontend.Models.Me | null;
}

const App = Vue.extend({
  data: function (): Data {
    return {
      isAuthenticated: null,
      user: null,
    };
  },
  created: async function () {
    let user = null;
    let isAuthenticated = false;

    try {
      const response = await axios.get<App.Frontend.Models.Me>('/api/me');
      this.user = response.data;

      this.isAuthenticated = true;
    } catch (e) {
      this.isAuthenticated = false;
    }

    if (!this.isAuthenticated) {
      this.$router.push('/404');
    }
  },
});

export default App;
</script>
