<template>
  <div class="container" v-if="player != null">
    <div class="row">
      <div class="col-8">
        <h1 class="text-white fw-bold">{{ player.display_name }}</h1>
        <span class="text-white">{{ player.bio || 'No bio' }}</span>
      </div>
      <div class="col-4">
        <img
          class="img-thumbnail"
          v-bind:src="generateAvatar(player.id)"
          alt=""
        />
      </div>
    </div>
    <div class="row">
      <h4 class="text-white fw-bold">Teams</h4>
      <div v-for="membership in player.memberships" v-bind:key="membership.id">
        <span>{{ membership.team.name }}</span>
      </div>
    </div>
    <div class="row">
      <h4 class="text-white fw-bold">Games</h4>
      <game-account
        v-for="gameAccount in player.gameAccounts"
        v-bind:key="gameAccount.id"
        v-bind:gameAccount="gameAccount"
      />
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import GameAccount from '../../components/GameAccount/index.vue';
import generateAvatar from '../../util/generateAvatar';

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
    const state = this.$store.state as App.Frontend.Store.RootState;

    const id = this.$route.params.id;

    if (id === state.user?.id.toString()) {
      this.$router.push('/profile');
      return;
    }

    this.fetchPlayer();
  },

  methods: {
    async fetchPlayer() {
      const id = this.$route.params.id;

      const response = await axios.get<Response>(`/api/players/${id}`);

      this.player = response.data.player;
    },

    generateAvatar,
  },

  head: {
    title: {
      inner: 'Player Details',
    },
  },
});

export default Player;
</script>
