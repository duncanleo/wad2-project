<template>
  <div class="game-stats">
    <div class = "row">
    <div class ="col-4"><span>{{ name }}</span></div>
    <div class ="col-4"><span>{{ stat1 }}</span></div>
    <div class ="col-4"><span>{{ stat2 }}</span></div>
    </div>
  </div>

  
</template>

<script lang="ts">
import Vue from 'vue';


const GameStats = Vue.component('game-stats', {
  props: ['name','stat1','stat2'],

  methods: {
    
  },
});

export default GameStats;
</script>
