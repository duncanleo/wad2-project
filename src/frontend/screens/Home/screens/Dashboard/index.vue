<template>
  <div class="container">
    <h1 class="text-white">Welcome, {{ user.display_name }}</h1>
    <input
      type="text"
      style="width: 100%; height: 50px; background-color: #729b98"
      class="border border-1 form-control"
      name=""
      v-model="searchTerm"
      v-on:input="handleInput"
      placeholder="Search..."
    />

    <div class="row" v-if="players.length > 0">
      <h1 class="text-white">Players</h1>
      <router-link
        v-bind:to="playerLink(player.id)"
        v-for="player in players"
        v-bind:key="player.id"
        class="fs-5 text-white"
      >
        <div
          style="background-color: #729b98; height: 100px"
          class="col-2 text-center"
        >
          <img src="" alt="" />
          <span class="mx-auto d-block">
            <img
              class="rounded-circle"
              src="src/frontend/assets/images/test.png"
            />
            {{ player.display_name }}
          </span>
        </div>
      </router-link>
    </div>
    <div class="row" v-if="teams.length > 0">
      <h1 class="text-white">Teams</h1>
      <router-link
        v-bind:to="teamLink(team.id)"
        v-for="team in teams"
        v-bind:key="team.id"
      >
        <span>{{ team.name }}</span>
      </router-link>
    </div>
    <div class="row" v-if="tournaments.length > 0">
      <h1 class="text-white">Tournaments</h1>
      <div v-for="tournament in tournaments" v-bind:key="tournament.id">
        <span>{{ tournament.name }}</span>
      </div>
    </div>
    <div
      class="row mb-5"
      v-if="
        players.length === 0 && teams.length === 0 && tournaments.length === 0
      "
    >
      <h4 class="text-white">No results</h4>
    </div>
    <br />

    <div style="background-color: #729b98" class="p-4 row">
      <h1 class="text-white">UPCOMING</h1>
      <hr />

      <div class="row justify-content-center">
        <div
          class="col-4 card m-4 text-white"
          style="width: 18rem; background-color: black"
          v-for="tournament of tournamentFilter"
        >
          <div class="card-body">
            <h4>
              {{ gameName(tournament.game_id) }}
            </h4>
            <h5 class="card-title">{{ tournament.name }}</h5>
            <p class="card-text">{{ tournament.start_at }}</p>
            <p class="card-text">{{ tournament.end_at }}</p>
            <p class="card-text">USD {{ tournament.prize_pool }}</p>
            <p class="card-text">{{ tournament.owner.display_name }}</p>
            <a :href="tournament.url" class="btn btn-success">More Details</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { debounce } from 'lodash';
import Vue from 'vue';

interface SearchResponse extends App.API.ResponseBase {
  players: App.API.User[];
  teams: App.API.Team[];
  tournaments: App.API.Tournament[];
  games: App.API.Game[];
}

const Dashboard = Vue.extend({
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
        let startDate = tournament.start_at;
        let endDate = tournament.end_at;
        let date = startDate.split('T')[0];
        let edate = endDate.split('T')[0];
        tournament.start_at = date;
        tournament.end_at = edate;
        let dateValues = date.split('-');

        if (Number(dateValues[0]) >= 2021) {
          if (Number(dateValues[1]) >= 10) {
            if (Number(dateValues[2]) >= 15) {
              upcomingTournament.push(tournament);
            }
          } else {
            continue;
          }
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
