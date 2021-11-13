<template>
  <div class="container" v-if="player != null">
    <div class="row">
      <div class="col-8">
        <h1 class="text-white fw-bold text-capitalize">
          {{ player.display_name }}
        </h1>
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
      <div class="rounded-top mt-5">
        <h4 class="text-white fw-bold pt-1">Teams</h4>
      </div>
      <div
        class="rounded-bottom"
        style="background: #729b98"
        v-for="membership in player.memberships"
        v-bind:key="membership.id"
      >
        <span>{{ membership.team.name }}</span>
      </div>
      <span class="text-tertiary" v-if="player.memberships.length === 0">
        Not in any teams
      </span>
    </div>
    <div class="row mb-4">
      <div class="rounded-top mt-5">
        <h4 class="text-white fw-bold pt-1">Games</h4>
      </div>
      <span class="text-tertiary" v-if="player.gameAccounts.length === 0">
        No games found
      </span>
      <game-stats
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
import GameStats from '../../components/GameStats/index.vue';
import generateAvatar from '../../util/generateAvatar';

interface Response extends App.API.ResponseBase {
  player: App.API.User;
}

const Player = Vue.extend({
  components: {
    GameStats,
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
      this.$router.replace('/profile');
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
