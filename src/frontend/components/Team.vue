<template>
  <div class="row py-3 bg-secondary rounded-3">
    <div
      class="
        col-lg-1 col-sm-2 col-3
        d-flex
        align-items-center
        justify-content-center
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-joystick me-2"
        viewBox="0 0 16 16"
      >
        <path
          d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z"
        />
        <path
          d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z"
        />
      </svg>
    </div>
    <div class="col-lg-10 col-sm-8 col-6 d-flex flex-column">
      <p class="name text-white fs-4 fw-bold mb-0 lh-1 mb-1">
        {{ team.name }}
      </p>
      <p class="memberships-count text-tertiary fs-6 mb-0 lh-1">
        {{ team.memberships_count }} Members
      </p>
    </div>

    <div class="col-lg-1 col-sm-2 col-3 d-flex align-items-center">
      <span class="text-tertiary" v-if="team.is_member">Member</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

const Team = Vue.component('team', {
  props: {
    team: {
      type: Object as PropType<App.API.Team>,
      required: true,
      validator(team) {
        return typeof team.id === 'number';
      },
    },
  },
});

export default Team;
</script>
