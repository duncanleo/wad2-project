<template>
  <div class="row min-vh-100 d-flex flex-lg-row">
    <div class="col-lg-4 col-md-12 col-12 pe-0">
      <div class="px-3 mt-2 mb-3">
        <logo />
        <h3 class="text-white fs-5 text-uppercase">Start playing today</h3>
      </div>
      <div class="gy-2 px-3">
        <div
          class="game-card card px-0 bg-transparent text-white mb-3"
          style="height: 20vh"
          v-for="(game, index) in games"
          v-bind:key="game.id"
          v-on:click="setSelectedGameIndex(index)"
        >
          <img
            class="card-img"
            :class="{ active: game.id === selectedGame.id }"
            v-bind:src="game.banner_image"
            alt="Banner image"
          />
          <div class="card-img-overlay d-flex flex-column-reverse">
            <h5
              class="card-title fw-bold"
              :class="{ 'fs-4': game.id === selectedGame.id }"
            >
              {{ game.name }}
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8 col-md-12 col-12 bg-dark ps-0">
      <div
        class="content py-sm-0 py-5 mb-sm-0 mb-3"
        v-if="selectedGame != null"
      >
        <img
          class="background-image"
          v-bind:src="selectedGame.background_image"
          alt="Background image"
        />
        <div class="content-inner rounded-3">
          <h2 class="display-3 fw-bold mb-1 lh-1 py-2">
            Find your gamer community
          </h2>
          <p class="lead text-tertiary mb-4 fs-4">It's just a tap away.</p>
          <div class="d-flex flex-wrap" v-if="$store.state.user == null">
            <router-link
              class="btn btn-primary me-2 mb-2 mb-sm-0 text-white fw-bold"
              to="/signup"
            >
              Sign-up
            </router-link>
            <router-link
              class="btn btn-outline-light mb-2 mb-sm-0 fw-bold"
              to="/login"
            >
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
