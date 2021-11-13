<template>
  <div class="card h-100 text-white bg-transparent">
    <img
      class="card-img-top"
      v-bind:src="tournament.game.banner_image"
      alt=""
      style="height: 200px"
    />
    <div class="card-body d-flex flex-column bg-secondary">
      <span class="fw-bold text-primary text-uppercase fs-7">{{
        tournament.game.name
      }}</span>
      <h4 class="card-title fw-bold mb-2">
        {{ tournament.name }}
      </h4>
      <p class="card-text text-tertiary mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-clock-fill mb-1 me-1"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
          />
        </svg>
        {{ formattedDate }}
      </p>
      <p class="card-text text-tertiary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-person-fill mb-1 me-1"
          viewBox="0 0 16 16"
        >
          <path
            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
          />
        </svg>
        {{ tournament.owner.display_name }}
      </p>
      <div class="d-flex align-items-center justify-content-between mt-auto">
        <p class="card-text text-primary fw-bold fs-3 mb-0">
          {{ tournament.prize_pool > 0 ? `$${tournament.prize_pool}` : '-' }}
        </p>

        <router-link
          :to="tournamentLink"
          class="btn btn-primary text-white fw-bold"
        >
          More Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import moment from 'moment';

const Tournament = Vue.component('tournament', {
  props: {
    tournament: {
      type: Object as PropType<App.API.Tournament>,
      required: true,
      validator(tournament: App.API.Tournament) {
        return typeof tournament.id === 'number';
      },
    },
  },

  computed: {
    formattedDate() {
      const start = moment(this.tournament.start_at);
      const end = moment(this.tournament.end_at);

      return `${start.format('LL')} - ${end.format('LL')}`;
    },

    tournamentLink() {
      return `/tournaments/${this.tournament.id}`;
    },
  },
});

export default Tournament;
</script>
