<template>
  <div class="row py-2">
    <div class="col-6 d-flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-joystick me-2"
        style="color: #729b98"
        viewBox="0 0 16 16"
      >
        <path
          d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z"
        />
        <path
          d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z"
        />
      </svg>
      <p class="name text-white fs-2">
        {{ team.name }}
      </p>
    </div>

    <div class="col-3 d-flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        style="color: #729b98"
        class="bi bi-people-fill me-2"
        viewBox="0 0 16 16"
      >
        <path
          d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        />
        <path
          fill-rule="evenodd"
          d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
        />
        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
      </svg>
      <p class="memberships-count text-white fs-2">
        {{ team.memberships_count }} Members
      </p>
    </div>

    <div class="col-3">
      <button
        class="btn border border-1 text-white fs-4"
        style="background-color: #729b98; float: right"
        v-if="role == 'leader'"
      >
        Join
      </button>
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
