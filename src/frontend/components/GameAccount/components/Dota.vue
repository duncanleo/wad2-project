<template>
  <div>
    <span>Dota</span>
    <img v-bind:src="data.profile.avatar" alt="" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const Dota = Vue.extend({
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
});

export default Dota;
</script>
