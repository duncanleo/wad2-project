<template>
  <div>
    <h1>{{ me.display_name }}</h1>
    <span>{{ me.bio }}</span>
    <button>Edit Profile</button>
    <div>
      <h1>My Teams</h1>
      <button>Create Team</button>
      <ul>
        <li v-for="team in teams" v-bind:key="team.id">
          <span>{{ team.name }}</span>
        </li>
      </ul>
    </div>
    <div>
      <h1>Games</h1>
      <ul>
        <li v-for="gameAccount in me.gameAccounts" v-bind:key="gameAccount.id">
          <span>{{ gameAccount.game.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';

interface TeamsResponse extends App.API.ResponseBase {
  teams: App.API.Team[];
}

const Profile = Vue.extend({
  data() {
    return {
      me: this.$store.state.user as App.API.CurrentUser,
      teams: [] as App.API.Team[],
    };
  },

  beforeMount() {
    this.fetchMyTeams();
  },

  methods: {
    async fetchMyTeams() {
      const response = await axios.get<TeamsResponse>('/api/teams?self=true');

      this.teams = response.data.teams;
    },
  },
});

export default Profile;
</script>
