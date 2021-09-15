<template>
  <div v-if="isAuthenticated">
    <h1>Hi, {{ user.display_name }}</h1>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';

interface Data {
  isAuthenticated: boolean | null;
  user: {
    email: string;
    display_name: string;
  } | null;
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
      const response = await axios.get<{ email: string; display_name: string }>(
        '/api/me'
      );
      console.log(response);
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
