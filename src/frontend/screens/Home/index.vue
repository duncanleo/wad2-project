<template>
  <div class="container">
    <onboarding v-if="!isLoggedIn" />
    <dashboard v-else />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import Logo from '../../components/Logo.vue';
import Dashboard from './screens/Dashboard/index.vue';
import Onboarding from './screens/Onboarding/index.vue';
import './styles.scss';

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

  head: {
    title: {
      inner: 'Home',
    },
  },
});

export default Home;
</script>
