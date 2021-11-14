<template>
  <footer class="container-fluid p-0 mx-0" v-if="!isOnboarding">
    <div class="container pt-2 pb-4">
      <div class="row">
        <div class="col-12">
          <span class="text-white fw-bold">
            &copy; GameUp {{ new Date().getFullYear() }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

const SiteFooter = Vue.component('site-footer', {
  computed: {
    isOnboarding() {
      const state = this.$store.state as App.Frontend.Store.RootState;

      return this.$router.currentRoute.path === '/' && state.user == null;
    },
  },
});

export default SiteFooter;
</script>