<template>
  <div>
    <h1 class="text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="currentColor"
        class="bi bi-trophy-fill mb-1 me-2"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"
        /></svg
      >Tournaments
    </h1>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-controller"
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
      <h1 class="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          class="bi bi-calendar-event-fill mb-2 me-2"
          style="color: #31625f"
          viewBox="0 0 16 16"
        >
          <path
            d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"
          /></svg
        >UPCOMING
      </h1>
      <hr />

      <div class="row justify-content-center">
        <div
          class="col-4 card m-4 text-white"
          style="width: 18rem; background-color: black"
          v-for="tournament of tournamentDetails"
        >
          <div class="card-body">
            <h4 class="card-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-dpad-fill mb-2"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.5 0A1.5 1.5 0 0 0 5 1.5v3a.5.5 0 0 1-.5.5h-3A1.5 1.5 0 0 0 0 6.5v3A1.5 1.5 0 0 0 1.5 11h3a.5.5 0 0 1 .5.5v3A1.5 1.5 0 0 0 6.5 16h3a1.5 1.5 0 0 0 1.5-1.5v-3a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 0 16 9.5v-3A1.5 1.5 0 0 0 14.5 5h-3a.5.5 0 0 1-.5-.5v-3A1.5 1.5 0 0 0 9.5 0h-3Zm1.288 2.34-.799 1.278A.25.25 0 0 0 7.201 4H8.8a.25.25 0 0 0 .212-.382l-.799-1.279a.25.25 0 0 0-.424 0Zm0 11.32-.799-1.277A.25.25 0 0 1 7.201 12H8.8a.25.25 0 0 1 .212.383l-.799 1.278a.25.25 0 0 1-.424 0Zm-4.17-4.65-1.279-.798a.25.25 0 0 1 0-.424l1.279-.799A.25.25 0 0 1 4 7.201V8.8a.25.25 0 0 1-.382.212Zm10.043-.798-1.278.799A.25.25 0 0 1 12 8.799V7.2a.25.25 0 0 1 .383-.212l1.278.799a.25.25 0 0 1 0 .424Z"
                />
              </svg>
              {{ tournament.name }}
            </h4>
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
        let startDate = tournament.start_at;
        let endDate = tournament.end_at;
        let date = startDate.split('T')[0];
        let edate = endDate.split('T')[0];
        tournament.start_at = date;
        tournament.end_at = edate;
      }
      return tournamentData;
    },
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
      console.log(this.tournaments);
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
