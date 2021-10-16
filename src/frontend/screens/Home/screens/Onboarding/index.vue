<template>
  <div class="row d-flex flex-lg-row flex-column-reverse">
    <div class="col-lg-4 col-md-12 col-12">
      <logo />
      <h3 class="text-white text-uppercase fw-bold">Start playing today</h3>
      <div class="row gy-2">
        <div
          class="card px-0 bg-transparent text-white"
          v-for="(game, index) in games"
          v-bind:key="game.id"
          v-on:click="setSelectedGameIndex(index)"
        >
          <img
            class="card-img"
            v-bind:src="game.banner_image"
            alt="Banner image"
          />
          <div class="card-img-overlay">
            <h5 class="card-title">{{ game.name }}</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8 col-md-12 col-12 bg-dark">
      <div class="content" v-if="selectedGame != null">
        <img
          class="background-image"
          v-bind:src="selectedGame.background_image"
          alt="Background image"
        />
        <div class="content-inner">
          <h2 class="display-4 fw-bold mb-5">Find your gamer community.</h2>
          <p class="lead mb-5">It's just a tap away</p>
          <div class="d-flex flex-wrap" v-if="$store.state.user == null">
            <router-link class="btn btn-primary me-2 mb-2 mb-sm-0" to="/signup">
              Sign-up
            </router-link>
            <router-link class="btn btn-outline-dark mb-2 mb-sm-0" to="/login">
              Login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { sample } from 'lodash';
import Vue from 'vue';
import Logo from '../../../../components/Logo.vue';

interface GamesResponse extends App.API.ResponseBase {
  games: App.API.Game[];
}

const Onboarding = Vue.extend({
  components: {
    Logo,
  },

  data: function () {
    return {
      selectedGameIndex: null as number | null,
      games: [] as App.API.Game[],
      intervalId: null as NodeJS.Timer | null,
    };
  },

  beforeMount() {
    this.fetchGames();

    this.intervalId = setInterval(() => {
      if (this.selectedGameIndex == null) {
        return;
      }

      let targetIndex = this.selectedGameIndex + 1;
      if (targetIndex >= this.games.length) {
        targetIndex = 0;
      }

      this.selectedGameIndex = targetIndex;
    }, 5000);
  },

  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },

  methods: {
    async fetchGames() {
      const response = await axios.get<GamesResponse>('/api/games');

      this.games = response.data.games;
      this.selectedGameIndex = 0;
    },

    setSelectedGameIndex(index: number) {
      this.selectedGameIndex = index;
    },
  },

  computed: {
    selectedGame() {
      if (this.selectedGameIndex == null) {
        return null;
      }
      return this.games[this.selectedGameIndex] ?? null;
    },
  },

  head: {
    title: {
      inner: 'Home',
    },
  },
});

export default Onboarding;
</script>
