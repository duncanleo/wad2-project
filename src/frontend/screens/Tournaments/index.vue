<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-12 d-flex align-items-center mb-sm-0 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#FFF"
          class="bi bi-trophy-fill mb-1 me-2"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"
          />
        </svg>
        <h3 class="text-white col fw-bold mb-0 d-inline-block flex-grow-0">
          Tournaments
        </h3>
        <router-link
          to="/tournaments/new"
          v-if="isOrganiser"
          class="btn btn-primary text-white fw-bold border-0 ms-3"
        >
          Create
        </router-link>
      </div>
      <div class="col-md-6 col-12 d-flex align-items-center">
        <div class="dropdown w-100">
          <button
            class="
              btn btn-secondary
              dropdown-toggle
              w-100
              d-flex
              align-items-center
            "
            type="button"
            id="game-dropdown-button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-controller me-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"
              />
              <path
                d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"
              />
            </svg>
            {{ (selectedGame != null && selectedGame.name) || 'Select a game' }}
          </button>

          <ul
            class="dropdown-menu"
            aria-labelledby="game-dropdown-button"
            style="width: 100%"
          >
            <li>
              <a
                href="#"
                class="dropdown-item text-tertiary"
                v-on:click="setSelectedGameId(null)"
                >Select a game</a
              >
            </li>
            <li
              v-for="game in games"
              v-bind:value="game.name"
              v-bind:key="game.id"
              v-on:click="setSelectedGameId(game.id)"
            >
              <a href="#" class="dropdown-item">{{ game.name }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-12 mt-4 mb-5" v-if="selectedGame !== 'Select a game'">
        <h4 class="text-tertiary fw-bold mb-3">Upcoming</h4>

        <span class="text-tertiary" v-if="upcomingTournaments.length === 0">
          There are no upcoming tournaments.
        </span>

        <div class="row justify-content-center" style="row-gap: 1rem">
          <div
            class="col-lg-4 col-md-6 col-12"
            v-for="tournament of upcomingTournaments"
            v-bind:key="tournament.id"
          >
            <tournament v-bind:tournament="tournament" />
          </div>

          <div v-if="results.length < 1">
            <h2 class="text-white">No upcoming tournaments available</h2>
          </div>
        </div>
      </div>
      <div class="col-12 mt-4 mb-5" v-if="selectedGame !== 'Select a game'">
        <h4 class="text-tertiary fw-bold mb-3">Past</h4>

        <span class="text-tertiary" v-if="pastTournaments.length === 0">
          There are no past tournaments.
        </span>

        <div class="row justify-content-center" style="row-gap: 1rem">
          <div
            class="col-lg-4 col-md-6 col-12"
            v-for="tournament of pastTournaments"
            v-bind:key="tournament.id"
          >
            <tournament v-bind:tournament="tournament" />
          </div>

          <div v-if="results.length < 1">
            <h2 class="text-white">No upcoming tournaments available</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import moment from 'moment';
import Tournament from '../../components/Tournament.vue';

interface GamesResponse extends App.API.ResponseBase {
  games: App.API.Game[];
}

interface TournamentsResponse extends App.API.ResponseBase {
  tournaments: App.API.Tournament[];
}

const Tournaments = Vue.extend({
  components: {
    Tournament,
  },

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

    isOrganiser() {
      const state = this.$store.state as App.Frontend.Store.RootState;

      return state.user?.type === 'organiser';
    },

    results() {
      if (this.selectedGameId == null) {
        return this.tournaments;
      }

      return this.tournaments.filter(
        (tournament) => tournament.game_id === this.selectedGameId
      );
    },

    upcomingTournaments() {
      const now = moment();

      return this.results.filter((tournament) => {
        const start = moment(tournament.start_at);

        return start.isAfter(now);
      });
    },

    pastTournaments() {
      const now = moment();

      return this.results.filter((tournament) => {
        const start = moment(tournament.start_at);

        return start.isSameOrBefore(now);
      });
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

    setSelectedGameId(id: number | null) {
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
