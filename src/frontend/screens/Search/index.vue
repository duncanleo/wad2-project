<template>
  <div class="container">
    <h1 class="text-white fw-bold">Search</h1>
    <input type="text" name="" v-model="searchTerm" v-on:input="handleInput" />
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
      class="row"
      v-if="
        players.length === 0 && teams.length === 0 && tournaments.length === 0
      "
    >
      <h4 class="text-white">No results</h4>
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

const Search = Vue.extend({
  data() {
    return {
      searchTerm: '',
      players: [] as App.API.User[],
      teams: [] as App.API.Team[],
      tournaments: [] as App.API.Tournament[],
    };
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

export default Search;
</script>
