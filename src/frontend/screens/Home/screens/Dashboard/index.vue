<template>
  <div class="container">
    <h1 class="text-white">Welcome, {{ user.display_name }}</h1>
    <input
      type="text"
      style="width:80%; height:50px; background-color:#729B98; "
      class="border rounded "
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
      >
        <span>{{ player.display_name }}</span>
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

    <div 
    style="background-color: #729B98;"
    class="p-4 row">
      <h1 class="text-white">UPCOMING</h1>
      <hr>

      <div 
      class="col mx-3 px-0"
      style="background-color:#252525; width: 27%; height: 300px display:inline-block;">
        <div style="width: 100%; height: 40%; background-color:grey;"> 
            <!-- image div, styling inplace as placeholder. -->
            <img src="" alt="">
        </div>
        <div>
          <!-- Finding out if there's an api for tournaments and how to retrieve the info -->
          <p class="text-white ps-2">Tournament Name</p>
          <p class="text-white ps-2">Price Pool</p>
          <p class="text-white ps-2">Date</p>
          <hr style="color:white;">
          <p class="text-white ps-2">Organizer</p>
        </div>
      </div>

      <div 
      class="col mx-3 px-0"
      style="background-color:#252525; width: 27%; height: 300px;">
        <div style="width: 100%; height: 40%; background-color:grey;">
            <img src="" alt="">
        </div>
        <div>
          <p class="text-white ps-2">Tournament Name</p>
          <p class="text-white ps-2">Price Pool</p>
          <p class="text-white ps-2">Date</p>
          <hr style="color:white;">
          <p class="text-white ps-2">Organizer</p>
        </div>
      </div>

      <div 
      class="col mx-3 px-0"
      style="background-color:#252525; width: 27%; height: 300px;">
        <div style="width: 100%; height: 40%; background-color:grey;">
            <img src="" alt="">
        </div>
        <div>
          <p class="text-white ps-2">Tournament Name</p>
          <p class="text-white ps-2">Price Pool</p>
          <p class="text-white ps-2">Date</p>
          <hr style="color:white;">
          <p class="text-white ps-2">Organizer</p>
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
}

const Dashboard = Vue.extend({
  data() {
    return {
      searchTerm: '',
      players: [] as App.API.User[],
      teams: [] as App.API.Team[],
      tournaments: [] as App.API.Tournament[],
    };
  },

  computed: {
    user() {
      const state = this.$store.state as App.Frontend.Store.RootState;

      return state.user;
    },
  },

  methods: {
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
