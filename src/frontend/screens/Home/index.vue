<template>
  <div class="container pt-5">
    <div class="row align-items-center mb-5">
      <div class="col-12 col-lg-5 mb-5 mb-lg-0 me-auto">
        <h2 class="display-4 fw-bold mb-5">Find your gamer community.</h2>
        <p class="lead text-muted mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit
          amet ligula lacus. Vestibulum tristique, nisl consectetur commodo
          ultricies, arcu nunc rutrum sapien, non consequat enim velit at lacus.
        </p>
        <div class="d-flex flex-wrap">
          <router-link class="btn btn-primary me-2 mb-2 mb-sm-0" to="/signup">
            Sign-up
          </router-link>
          <router-link class="btn btn-outline-dark mb-2 mb-sm-0" to="/login">
            Login
          </router-link>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <img class="img-fluid" src="https://via.placeholder.com/500" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const Home = Vue.extend({
  data: function () {
    return {
      greeting: 'Sup',
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
