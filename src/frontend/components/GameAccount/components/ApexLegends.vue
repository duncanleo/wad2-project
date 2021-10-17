<template>
  <div>
    <span>Apex Legends</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const ApexLegends = Vue.extend({
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
});

export default ApexLegends;
</script>
