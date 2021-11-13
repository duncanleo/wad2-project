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

    <div class="row mt-4" v-if="players.length > 0">
      <h4 class="fw-bold text-white">Players</h4>
      <router-link
        v-bind:to="playerLink(player.id)"
        v-for="player in players"
        v-bind:key="player.id"
        style="text-decoration: none"
        class="fs-5 text-white mb-4 text-center col-lg-4 col-md-6 col-12"
      >
        <player v-bind:player="player" />
      </router-link>
    </div>
    <div class="row" v-if="teams.length > 0">
      <h4 class="fw-bold text-white">Teams</h4>
      <router-link
        v-bind:to="teamLink(team.id)"
        v-for="team in teams"
        v-bind:key="team.id"
        style="text-decoration: none"
        class="fs-5 text-white col-12 mb-3 mx-2 text-decoration-none"
      >
        <team v-bind:team="team" />
      </router-link>
    </div>
    <div class="row" v-if="tournaments.length > 0">
      <h4 class="fw-bold text-white">Tournaments</h4>
      <div
        class="col-lg-4 col-md-6 col-12 mb-5"
        v-bind:key="tournament.id"
        v-for="tournament in tournaments"
      >
        <tournament v-bind:tournament="tournament" />
      </div>
    </div>
    <div
      class="row mb-5 py-4"
      v-if="
        !loading &&
        searchTerm.length > 0 &&
        players.length === 0 &&
        teams.length === 0 &&
        tournaments.length === 0
      "
    >
      <h4 class="text-tertiary">
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
          />
        </svg>
        No results
      </h4>
    </div>
    <br />

    <div class="mb-5 row" v-if="searchTerm.length === 0">
      <h3 class="text-white fw-bold">Explore Teams</h3>
      <hr />

      <router-link
        class="fs-5 text-white col-12 mb-3 mx-2 text-decoration-none"
        v-for="team of teamsExplore"
        v-bind:key="team.id"
        v-bind:to="teamLink(team.id)"
      >
          <team v-bind:team="team" />
      </router-link>
    </div>
        </div>
      </div>
    </div>

    <div class="mb-5 row" v-if="searchTerm.length === 0">
      <h3 class="text-white fw-bold">Upcoming Tournaments</h3>
      <hr />

      <div class="row justify-content-center" style="row-gap: 1rem">
        <div
          class="col-lg-4 col-md-6 col-12"
          v-for="tournament of tournamentFilter"
          v-bind:key="tournament.id"
        >
          <tournament v-bind:tournament="tournament" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { debounce } from 'lodash';
import Vue from 'vue';
import Tournament from '../../../../components/Tournament.vue';
import Player from '../../../../components/Player.vue';
import Team from '../../../../components/Team.vue';

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
    Player,
    Team,
  },

  data() {
    return {
      searchTerm: '',
      players: [] as App.API.User[],
      teams: [] as App.API.Team[],
      teamsExplore: [] as App.API.Team[],
      tournaments: [] as App.API.Tournament[],
      games: [] as App.API.Game[],
      tournamentData: [],
      loading: false,
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
    this.apiTeamsExplore();
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

    async apiTeamsExplore() {
      const response = await axios.get('/api/teams?explore=true', {});

      this.teamsExplore = response.data.teams;
    },

    async search() {
      this.loading = true;
      const response = await axios.post<SearchResponse>('/api/search', {
        term: this.searchTerm,
      });

      this.players = response.data.players;
      this.teams = response.data.teams;
      this.tournaments = response.data.tournaments;
      this.loading = false;
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
