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
      <game-account
        v-for="gameAccount in player.gameAccounts"
        v-bind:key="gameAccount.id"
        v-bind:gameAccount="gameAccount"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import GameAccount from '../../components/GameAccount/index.vue';

interface Response extends App.API.ResponseBase {
  player: App.API.User;
}

const Player = Vue.extend({
  components: {
    GameAccount,
  },

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

  head: {
    title: {
      inner: 'Player Details',
    },
  },
});

export default Player;
</script>
