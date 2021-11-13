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
        players.length === 0 && teams.length === 0 && tournaments.length === 0
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

    <div style="background-color: #729b98" class="p-4 mb-5 row">
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
          style="width: 18rem; background-color: #31625f"
          v-for="tournament of tournamentFilter"
        >
          <div class="card-body">
            <h4>
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
              {{ gameName(tournament.game_id) }}
            </h4>
            <h5 class="card-title">{{ tournament.name }}</h5>
            <p class="card-text">
              <span style="font-weight: bold; font-size: 18px; color: #729b98"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-clock-fill mb-1 me-1"
                  style="color: #729b98"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                  /></svg
                >From:
              </span>
              {{ tournament.start_at }}
            </p>
            <p class="card-text">
              <span style="font-weight: bold; font-size: 18px; color: #729b98"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-clock-fill mb-1 me-1"
                  style="color: #729b98"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                  /></svg
                >To:
              </span>
              {{ tournament.end_at }}
            </p>
            <p class="card-text">
              <span style="font-weight: bold; font-size: 18px; color: #729b98">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-cash-stack mb-1 me-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                  />
                  <path
                    d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"
                  /></svg
                >Pool: USD </span
              >{{ tournament.prize_pool }}
            </p>
            <p class="card-text">
              <span style="font-weight: bold; font-size: 18px; color: #729b98"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-fill mb-1 me-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  /></svg
                >Organizer:
              </span>
              {{ tournament.owner.display_name }}
            </p>
            <a
              :href="tournament.url"
              class="btn border border-1 text-white"
              style="background-color: #729b98"
              target="_blank"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-link-45deg mb-1 me-1"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"
                />
                <path
                  d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"
                /></svg
              >More Details</a
            >
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
