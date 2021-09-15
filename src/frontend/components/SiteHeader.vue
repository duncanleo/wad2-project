<template>
  <header class="pb-5">
    <nav class="navbar navbar-expand-lg navbar-light py-4">
      <div class="container">
        <router-link class="navbar-brand" to="/">Places App</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#header01"
          aria-controls="header01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="header01">
          <ul class="navbar-nav ms-auto mt-3 mt-lg-0 mb-3 mb-lg-0 me-4">
            <li class="nav-item">
              <router-link class="nav-link" v-if="!isGuest" to="/app/feed">
                Feed
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-if="!isGuest" to="/app/checkin">
                Check-in
              </router-link>
            </li>
            <li class="nav-item" v-if="isGuest">
              <router-link class="btn btn-outline-dark me-2" to="/login">
                Login
              </router-link>
            </li>
            <li class="nav-item" v-if="isGuest">
              <router-link class="btn btn-primary" to="/signup">
                Sign-up
              </router-link>
            </li>
            <li class="nav-item" v-if="isHomePage && !isGuest">
              <router-link class="btn btn-primary" to="/app">
                Back to App
              </router-link>
            </li>
            <li class="nav-item" v-if="!isHomePage && !isGuest">
              <user-dropdown v-bind:user="user"></user-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import UserDropdown from './UserDropdown.vue';

interface Data {
  isGuest: boolean;
  isHomePage: boolean;
  user: App.Frontend.Models.Me | null;
}

const SiteHeader = Vue.extend({
  components: {
    UserDropdown,
  },
  data: function (): Data {
    return {
      isGuest: true,
      isHomePage: false,
      user: null,
    };
  },
  mounted: async function () {
    try {
      const response = await axios.get<App.Frontend.Models.Me>('/api/me');
      this.user = response.data;
      this.isGuest = false;
    } catch (e) {
      this.isGuest = true;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function () {
        this.isHomePage = this.$route.path === '/';
      },
    },
  },
});

export default SiteHeader;
</script>
