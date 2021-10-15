<template>
  <div>
    <span>Fortnite</span>
    <span>{{ data.user.displayName }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const Fortnite = Vue.extend({
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
});

export default Fortnite;
</script>
