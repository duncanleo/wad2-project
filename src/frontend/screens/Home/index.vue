<template>
  <div class="container">
    <onboarding v-if="!isLoggedIn" />
    <dashboard v-else />
    <img v-bind:src="rockImage" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Dashboard from './screens/Dashboard/index.vue';
import Onboarding from './screens/Onboarding/index.vue';
import './styles.scss';

import rockImage from '../../assets/images/test.png';

const Home = Vue.extend({
  components: {
    Onboarding,
    Dashboard,
  },

  computed: {
    isLoggedIn() {
      const state = this.$store.state as App.Frontend.Store.RootState;

      return state.user != null;
    },
  },

  data() {
    return {
      rockImage,
    };
  },

  head: {
    title: {
      inner: 'Home',
    },
  },
});

export default Home;
</script>
