<template>
  <div class="d-flex align-items-center bg-secondary px-4 py-2 rounded">
    <div class="d-flex align-items-center w-75">
      <img
        class="bg-light"
        style="width: 36px; height: 36px; border-radius: 100%"
        v-bind:src="generateAvatar(player.id)"
        alt=""
      />
      <h5 class="text-white mb-0 ms-2 fw-bold text-start">
        {{ player.display_name }}
      </h5>
    </div>
    <div
      v-if="player.gameAccounts != null"
      class="d-flex flex-column ms-auto flex-shrink w-25 ps-2"
    >
      <span class="fs-6 fw-bold text-primary text-uppercase text-end">
        {{ player.gameAccounts.length }} game{{
          player.gameAccounts.length !== 1 ? 's' : ''
        }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import generateAvatar from '../util/generateAvatar';

const Player = Vue.component('player', {
  props: {
    player: {
      type: Object as PropType<App.API.User>,
      required: true,
      validator(value) {
        return typeof value.id === 'number';
      },
    },
  },

  methods: {
    generateAvatar,
  },
});

export default Player;
</script>