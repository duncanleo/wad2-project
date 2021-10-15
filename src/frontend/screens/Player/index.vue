<template>
  <div v-if="player != null">
    <h1>Player {{ player.display_name }}</h1>
    <span>{{ player.bio }}</span>
    <ul>
      <h1>Teams</h1>
      <li v-for="membership in player.memberships" v-bind:key="membership.id">
        <span>{{ membership.team.name }}</span>
      </li>
    </ul>
    <ul>
      <li
        v-for="gameAccount in player.gameAccounts"
        v-bind:key="gameAccount.id"
      >
        <span>{{ gameAccount.game.name }} Stats</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';

interface Response extends App.API.ResponseBase {
  player: App.API.User;
}

const Player = Vue.extend({
  data() {
    return {
      player: null as App.API.User | null,
    };
  },

  beforeMount() {
    this.fetchPlayer();
  },

  methods: {
    async fetchPlayer() {
      const id = this.$route.params.id;

      const response = await axios.get<Response>(`/api/players/${id}`);

      this.player = response.data.player;
    },
  },
});

export default Player;
</script>
