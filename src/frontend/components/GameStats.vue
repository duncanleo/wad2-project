<template>
  

    
   <div class="col-lg-4 col-md-6 col-sm-12 g-0">
    <div class="card bg-dark mt-3 mx-auto" style="width: 19rem;">
          <img class="card-img-top" v-bind:src='image' alt="Card image cap" style=" height: 15vw;
        object-fit: cover;">
          <div class="card-body">
            <p class="text-white fw-bold">{{ name }}</p>
            <div class ="text-center align-items-center mt-auto mb-auto bg-white"><h5 class="text-white fw-bold bg-primary ">{{ stat1 }}</h5></div>
            <div class =" text-center mt-auto mb-auto bg-secondary"><h5 class="text-white fw-bold">{{ stat2 }}</h5></div>
          </div>
    </div>

   </div>

      

    
    
 

  
</template>

<script lang="ts">
import Vue from 'vue';


const GameStats = Vue.component('game-stats', {
  props: ['image','name','stat1','stat2'],

  methods: {
    
  },
});

export default GameStats;
</script>
