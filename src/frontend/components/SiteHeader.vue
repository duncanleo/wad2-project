<template>
  <header class="pb-5">
    <nav
      v-bind:class="[
        'navbar',
        'navbar-expand-lg',
        'navbar-dark',
        !isHomePage && 'navbar-bg',
        'py-4',
      ]"
    >
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">
          WAD Project
        </router-link>
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
            <li class="nav-item" v-if="user != null">
              <router-link class="nav-link" to="/" exact active-class="active">
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                v-if="user != null"
                to="/teams"
                active-class="active"
              >
                Teams
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                v-if="user != null"
                to="/tournaments"
                active-class="active"
              >
                Tournaments
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                v-if="user != null"
                to="/search"
                active-class="active"
              >
                Search
              </router-link>
            </li>
            <li class="nav-item" v-if="user == null">
              <router-link
                class="btn btn-outline-dark me-2"
                to="/login"
                active-class="active"
              >
                Login
              </router-link>
            </li>
            <li class="nav-item" v-if="user == null">
              <router-link
                class="btn btn-primary"
                to="/signup"
                active-class="active"
              >
                Sign-up
              </router-link>
            </li>
            <li v-if="user != null">
              <user-dropdown v-bind:user="user"></user-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import UserDropdown from './UserDropdown.vue';

interface Data {
  isHomePage: boolean;
  user: App.Frontend.Models.Me | null;
}

const SiteHeader = Vue.extend({
  components: {
    UserDropdown,
  },
  computed: {
    user() {
      const state = this.$store.state as App.Frontend.Store.RootState;

      return state.user;
    },
  },
  data: function () {
    return {
      isHomePage: false,
    };
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
