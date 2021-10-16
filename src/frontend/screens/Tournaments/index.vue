<template>
  <div>
    <h1>Tournaments</h1>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="game-dropdown-button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Game
      </button>
      <ul class="dropdown-menu" aria-labelledby="game-dropdown-button">
        <li
          v-for="game in games"
          v-bind:key="game.id"
          v-on:click="setSelectedGameId(game.id)"
        >
          <a href="#" class="dropdown-item">{{ game.name }}</a>
        </li>
      </ul>
    </div>
    <ul>
      <li v-for="tournament in results()" v-bind:key="tournament.id">
        <span>Name: {{ tournament.name }}</span>
        <span>Prize: {{ tournament.prize_pool }}</span>
        <span>Starts at: {{ tournament.start_at }}</span>
        <span>Ends at: {{ tournament.ends_at }}</span>
        <span>Organiser: {{ tournament.owner.display_name }}</span>
      </li>
    </ul>
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
    };
  },

  beforeMount() {
    this.fetchGames();
    this.fetchTournaments();
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
