<template>
  <div>
    <h1 class="text-white">Tournaments</h1>
    <div class="dropdown mb-5">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="game-dropdown-button"
        style="
          width: 100%;
          height: 50px;
          background-color: #729b98;
          font-size: 25px;
          text-align: start;
        "
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ (selectedGame != null && selectedGame.name) || 'Select a game' }}
      </button>

      <ul
        class="dropdown-menu"
        aria-labelledby="game-dropdown-button"
        style="width: 100%"
      >
        <li
          style="height: 50px; font-size: 25px; background-image: url()"
          v-for="game in games"
          v-bind:value="game.name"
          v-bind:key="game.id"
          v-on:click="setSelectedGameId(game.id)"
        >
          <a href="#" class="dropdown-item">{{ game.name }}</a>
        </li>
      </ul>
    </div>
    <router-link to="/tournaments/new" v-if="isOrganiser">
      New Tournament
    </router-link>
    <ul>

    <br />

    <div
      style="background-color: #729b98"
      class="p-4 row mt-4"
      v-if="selectedGame !== 'Select a game'"
    >
      <h1 class="text-white">UPCOMING</h1>
      <hr />

      <div class="row justify-content-center">
        <div
          class="col-4 card m-4 text-white"
          style="width: 18rem; background-color: black"
          v-for="tournament of tournamentDetails"
        >
          <div class="card-body">
            <h5 class="card-title">{{ tournament.name }}</h5>
            <p class="card-text">{{ tournament.start_at }}</p>
            <p class="card-text">{{ tournament.end_at }}</p>
            <p class="card-text">USD {{ tournament.prize_pool }}</p>
            <p class="card-text">{{ tournament.owner.display_name }}</p>
            <a :href="tournament.url" class="btn btn-success">More Details</a>
          </div>
        </div>

        <div v-if="results().length < 1">
          <h2 class="text-white">No upcoming tournaments available</h2>
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

interface TournamentsResponse extends App.API.ResponseBase {
  tournaments: App.API.Tournament[];
}

const Tournaments = Vue.extend({
  data() {
    return {
      games: [] as App.API.Game[],
      tournaments: [] as App.API.Tournament[],
      selectedGameId: null as number | null,
      tournamentData: [],
    };
  },

  beforeMount() {
    this.fetchGames();
    this.fetchTournaments();
  },

  computed: {
    selectedGame() {
      return this.games.find((game) => game.id === this.selectedGameId);
    },

    tournamentDetails() {
      var tournamentData = this.results();

      for (let tournament of tournamentData) {
        const now = new Date();
        let startDate = new Date(tournament.start_at);
        let endDate = new Date(tournament.end_at);
        tournament.start_at =
          startDate.toDateString() + ' ' + startDate.toTimeString();
        tournament.end_at =
          endDate.toDateString() + ' ' + endDate.toTimeString();
      }
      return tournamentData;
    },
  },

  computed: {
    isOrganiser() {
      const state = this.$store.state as App.Frontend.Store.RootState;

      return state.user?.type === 'organiser';
    },
  },

  methods: {
    async fetchGames() {
      const response = await axios.get<GamesResponse>('/api/games');

      this.games = response.data.games;
    },

    async fetchTournaments() {
      const response = await axios.get<TournamentsResponse>('/api/tournaments');

      this.tournaments = response.data.tournaments;
    },

    results() {
      if (this.selectedGameId == null) {
        return this.tournaments;
      }

      return this.tournaments.filter(
        (tournament) => tournament.game_id === this.selectedGameId
      );
    },

    setSelectedGameId(id: number) {
      this.selectedGameId = id;
    },
  },

  head: {
    title: {
      inner: 'Tournaments',
    },
  },
});

export default Tournaments;
</script>
