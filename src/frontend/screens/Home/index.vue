<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-4">
        <h3 class="text-white text-uppercase fw-bold">Start playing today</h3>
        <div class="row gy-2">
          <div
            class="card bg-transparent text-white"
            v-for="game in games"
            v-bind:key="game.id"
            v-on:click="setSelectedGameId(game.id)"
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
      <div class="col-8 col-lg-8 mb-5 mb-lg-0 me-auto bg-dark">
        <div class="card" v-if="selectedGameId != null">
          <img
            class="card-img"
            v-bind:src="selectedGame.background_image"
            alt="Background image"
          />
          <div class="card-img-overlay">
            <h5 class="card-title">{{ selectedGame.name }}</h5>
            <div class="bg-light">
              <h2 class="display-4 fw-bold mb-5">Find your gamer community.</h2>
              <p class="lead text-muted mb-5">It's just a tap away</p>
              <div class="d-flex flex-wrap" v-if="$store.state.user == null">
                <router-link
                  class="btn btn-primary me-2 mb-2 mb-sm-0"
                  to="/signup"
                >
                  Sign-up
                </router-link>
                <router-link
                  class="btn btn-outline-dark mb-2 mb-sm-0"
                  to="/login"
                >
                  Login
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';

interface GamesResponse extends App.API.ResponseBase {
  games: App.API.Game[];
}

const Home = Vue.extend({
  data: function () {
    return {
      selectedGameId: null as number | null,
      games: [] as App.API.Game[],
    };
  },

  beforeMount() {
    this.fetchGames();
  },

  methods: {
    async fetchGames() {
      const response = await axios.get<GamesResponse>('/api/games');

      this.games = response.data.games;
      this.selectedGameId = this.games[0].id;
    },

    setSelectedGameId(id: number) {
      this.selectedGameId = id;
    },
  },

  computed: {
    selectedGame() {
      if (this.selectedGameId == null) {
        return null;
      }

      return (
        this.games?.find((game) => game.id === this.selectedGameId) ?? null
      );
    },
  },

  head: {
    title: {
      inner: 'Home',
    },
  },
});

export default Home;
</script>
