<template>
  <div class="container">
    <h1 class="text-white">Welcome, {{ user.display_name }}</h1>
    <input
      type="text"
      class="form-control border-0 fw-bold"
      name=""
      v-model="searchTerm"
      v-on:input="handleInput"
      placeholder="Search"
    />

    <div class="row" v-if="players.length > 0">
      <h1 class="text-white">Players</h1>
      <router-link
        v-bind:to="playerLink(player.id)"
        v-for="player in players"
        v-bind:key="player.id"
        style="text-decoration: none"
        class="fs-5 text-white col-2 mb-4 text-center"
      >
        <br />
        <span class="mx-auto d-block text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            class="bi bi-person-circle mb-1"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </span>
        {{ player.display_name }}
      </router-link>
    </div>
    <div class="row" v-if="teams.length > 0">
      <h1 class="text-white">Teams</h1>
      <router-link
        v-bind:to="teamLink(team.id)"
        v-for="team in teams"
        v-bind:key="team.id"
        style="text-decoration: none"
        class="fs-5 text-white col-2 mb-4 mx-2 text-center"
      >
        <br />
        <span class="mx-auto d-block text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-joystick mb-1 me-1"
            viewBox="0 0 16 16"
          >
            <path
              d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z"
            />
            <path
              d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z"
            /></svg></span
        >{{ team.name }}
      </router-link>
    </div>
    <div class="row" v-if="tournaments.length > 0">
      <h1 class="text-white">Tournaments</h1>
      <tournament
        v-bind:key="tournament.id"
        v-for="tournament in tournaments"
        v-bind:tournament="tournament"
      />
    </div>
    <div
      class="row mb-5"
      v-if="
        searchTerm.length > 0 &&
        players.length === 0 &&
        teams.length === 0 &&
        tournaments.length === 0
      "
    >
      <h4 class="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-search mb-1 me-2"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          /></svg
        >No results
      </h4>
    </div>
    <br />

    <div class="mb-5 row" v-if="searchTerm.length === 0">
      <h3 class="text-white fw-bold">Upcoming Tournaments</h3>
      <hr />

      <div class="row justify-content-center">
        <tournament
          v-for="tournament of tournamentFilter"
          v-bind:key="tournament.id"
          v-bind:tournament="tournament"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { debounce } from 'lodash';
import Vue from 'vue';
import Tournament from '../../../../components/Tournament.vue';

interface SearchResponse extends App.API.ResponseBase {
  players: App.API.User[];
  teams: App.API.Team[];
  tournaments: App.API.Tournament[];
  games: App.API.Game[];
}

const Dashboard = Vue.extend({
  name: 'Dashboard',

  components: {
    Tournament,
  },

  data() {
    return {
      searchTerm: '',
      players: [] as App.API.User[],
      teams: [] as App.API.Team[],
      tournaments: [] as App.API.Tournament[],
      games: [] as App.API.Game[],
      tournamentData: [],
    };
  },

  computed: {
    tournamentFilter() {
      var upcomingTournament = [];
      // var today = new Date()
      var tournamentData = this.tournamentData;

      for (let tournament of tournamentData) {
        const now = new Date();
        let startDate = new Date(tournament.start_at);
        let endDate = new Date(tournament.end_at);
        if (startDate.valueOf() > now.valueOf()) {
          tournament.start_at =
            startDate.toDateString() + ' ' + startDate.toTimeString();
          tournament.end_at =
            endDate.toDateString() + ' ' + endDate.toTimeString();
          upcomingTournament.push(tournament);
        } else {
          continue;
        }
      }

      return upcomingTournament;
    },

    user() {
      const state = this.$store.state as App.Frontend.Store.RootState;

      return state.user;
    },
  },

  beforeMount() {
    this.apiTournament();
    this.apiGames();
  },

  methods: {
    async apiTournament() {
      const response = await axios.get('/api/tournaments', {});

      this.tournamentData = response.data.tournaments;
    },

    async apiGames() {
      const response = await axios.get('/api/games', {});

      this.games = response.data.games;
    },

    async search() {
      const response = await axios.post<SearchResponse>('/api/search', {
        term: this.searchTerm,
      });

      this.players = response.data.players;
      this.teams = response.data.teams;
      this.tournaments = response.data.tournaments;
    },

    handleInput: debounce(function () {
      if (this.searchTerm.length === 0) {
        this.players = [];
        this.teams = [];
        this.tournaments = [];
        return;
      }
      this.search();
    }, 500),

    gameName(game_id) {
      let games = this.games;

      for (let gameDetails of games) {
        if (game_id == gameDetails.id) {
          return gameDetails.name;
        }
      }
    },

    redirect(url) {
      window.open(url, '_blank');
    },

    playerLink(id: number) {
      return `/players/${id}`;
    },

    teamLink(id: number) {
      return `/teams/${id}`;
    },
  },
});

export default Dashboard;
</script>
