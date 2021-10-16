<template>
  <div class="user-dropdown btn-group">
    <button
      class="btn btn-seconday dropdown-toggle"
      type="button"
      id="user-dropdown-button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img class="avatar img-thumbnail" v-bind:src="generateAvatar(user.id)" />
    </button>
    <ul
      class="dropdown-menu dropdown-menu-end"
      aria-labelledby="user-dropdown-button"
    >
      <li>
        <div class="profile dropdown-item">
          <span class="name">{{ user.display_name }}</span>
          <span class="email">{{ user.email }}</span>
        </div>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li>
        <router-link to="profile" class="dropdown-item">My Profile</router-link>
      </li>
      <li>
        <a href="/logout" class="dropdown-item">Logout</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import generateAvatar from '../util/generateAvatar';

const UserDropdown = Vue.component('user-dropdown', {
  props: ['user'],

  methods: {
    generateAvatar,
  },
});

export default UserDropdown;
</script>
