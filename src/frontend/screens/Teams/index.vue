<template>
  <div>
    <h1 class="text-white">Teams</h1>
    <input
      type="text"
      style="width: 100%; height: 50px; background-color: #729b98"
      class="border border-1 form-control"
      name=""
      v-model="searchTerm"
      v-on:input="handleInput"
      placeholder="Search..."
    />
    <div class="teams-list">
      <router-link
        class="team"
        v-for="team in results()"
        v-bind:key="team.id"
        v-bind:to="getTeamLink(team.id)"
      >
        <span class="name">{{ team.name }}</span>
        <span class="memberships-count">
          {{ team.memberships_count }} Members
        </span>
        <button>Join</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';

interface Response extends App.API.ResponseBase {
  teams: App.API.Team[];
}

const Teams = Vue.extend({
  data() {
    return {
      searchTerm: '',
      teams: [] as App.API.Team[],
    };
  },

  beforeMount() {
    this.fetchTeams();
  },

  methods: {
    async fetchTeams() {
      const { data } = await axios.get<Response>('/api/teams');

      this.teams = data.teams;
      console.log(this.teams);
    },

    results() {
      if (this.searchTerm === '') {
        console.log(this.teams);
        return this.teams;
      }

      console.log(
        this.teams.filter((team) =>
          team.name.toLowerCase().includes(this.searchTerm)
        )
      );
      return this.teams.filter((team) =>
        team.name.toLowerCase().includes(this.searchTerm)
      );
    },

    getTeamLink(id: number) {
      return `/teams/${id}`;
    },
  },

  head: {
    title: {
      inner: 'Teams',
    },
  },
});

export default Teams;
</script>
