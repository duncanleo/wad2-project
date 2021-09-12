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
              <router-link class="nav-link" to="/somewhere">
                Somewhere
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-outline-dark me-2" to="/login">
                Login
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-primary" to="/signup">
                Sign-up
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

const SiteHeader = Vue.extend({});

export default SiteHeader;
</script>
