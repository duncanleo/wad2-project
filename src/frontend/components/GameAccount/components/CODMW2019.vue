<template>
  <div>
    <span>CODMW 2019</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const CODMW2019 = Vue.extend({
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
});

export default CODMW2019;
</script>
