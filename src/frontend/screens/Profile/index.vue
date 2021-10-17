<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <h1 class="text-white fw-bold">{{ me.display_name }}</h1>
        <span class="text-white">{{ me.bio || 'No bio' }}</span>
        <button>Edit Profile</button>
      </div>
      <div class="col-4">
        <img class="img-thumbnail" v-bind:src="generateAvatar(me.id)" alt="" />
      </div>
    </div>
    <div class="row">
      <div class="bg-secondary col-8">
        <h4 class="text-white fw-bold">My Teams</h4>
      </div>
      <div class="bg-secondary col-4">
        <button>Create Team</button>
      </div>
      <div v-for="team in teams" v-bind:key="team.id">
        <span>{{ team.name }}</span>
      </div>
    </div>
    <div class="row">
      <h4 class="text-white fw-bold">My Games</h4>
      <ul>
        <game-account
          v-for="gameAccount in me.gameAccounts"
          v-bind:key="gameAccount.id"
          v-bind:gameAccount="gameAccount"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import GameAccount from '../../components/GameAccount/index.vue';
import generateAvatar from '../../util/generateAvatar';

interface TeamsResponse extends App.API.ResponseBase {
  teams: App.API.Team[];
}

const Profile = Vue.extend({
  components: {
    GameAccount,
  },

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

    generateAvatar,
  },

  head: {
    title: {
      inner: 'Profile',
    },
  },
});

export default Profile;
</script>
