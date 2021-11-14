<template>
  <div
    id="loginDetails"
    class="
      d-flex
      flex-column
      align-items-center
      mb-3
      col-12
      mx-auto
      p-5
      rounded
    "
  >
    <!--Game logo-->
    <div id="gameLogo" class="text-danger mx-auto mb-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="64"
        height="64"
        viewBox="0 0 24 24"
      >
        <path
          d="M7.97,16L5,19C4.67,19.3 4.23,19.5 3.75,19.5A1.75,1.75 0 0,1 2,17.75V17.5L3,10.12C3.21,7.81 5.14,6 7.5,6H16.5C18.86,6 20.79,7.81 21,10.12L22,17.5V17.75A1.75,1.75 0 0,1 20.25,19.5C19.77,19.5 19.33,19.3 19,19L16.03,16H7.97M7,8V10H5V11H7V13H8V11H10V10H8V8H7M16.5,8A0.75,0.75 0 0,0 15.75,8.75A0.75,0.75 0 0,0 16.5,9.5A0.75,0.75 0 0,0 17.25,8.75A0.75,0.75 0 0,0 16.5,8M14.75,9.75A0.75,0.75 0 0,0 14,10.5A0.75,0.75 0 0,0 14.75,11.25A0.75,0.75 0 0,0 15.5,10.5A0.75,0.75 0 0,0 14.75,9.75M18.25,9.75A0.75,0.75 0 0,0 17.5,10.5A0.75,0.75 0 0,0 18.25,11.25A0.75,0.75 0 0,0 19,10.5A0.75,0.75 0 0,0 18.25,9.75M16.5,11.5A0.75,0.75 0 0,0 15.75,12.25A0.75,0.75 0 0,0 16.5,13A0.75,0.75 0 0,0 17.25,12.25A0.75,0.75 0 0,0 16.5,11.5Z"
          fill="#FFF"
        />
      </svg>
    </div>

    <h4 class="text-white fw-bold mb-5">Signup</h4>
    <ul class="nav nav-pills center">
      <li class="nav-item">
        <a
          class="nav-link text-light"
          :class="type === 'gamer' && 'active fw-bold'"
          v-on:click="setTypeGamer"
        >
          Gamer
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link text-light"
          :class="type === 'organiser' && 'active fw-bold'"
          v-on:click="setTypeOrganiser"
        >
          Organiser
        </a>
      </li>
    </ul>
    <form
      class="col-md-6 col-12 mx-auto mt-2 d-flex flex-column"
      method="POST"
      action="/login"
      v-on:submit="handleSubmit"
    >
      <input
        class="form-control mb-1"
        name="display_name"
        type="text"
        placeholder="Display Name"
        v-model="display_name"
        required
      />
      <input
        class="form-control mb-1"
        name="email"
        type="text"
        placeholder="Email"
        v-model="email"
        required
      />
      <input
        class="form-control mb-4"
        name="password"
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
      <input type="hidden" name="type" v-model="type" />
      <input
        class="btn btn-primary text-white fw-bold form-control center"
        type="submit"
        value="Sign up"
      />
      <span class="error text-danger">{{ error }}</span>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import './styles.scss';

const Signup = Vue.extend({
  data: function () {
    return {
      display_name: '',
      email: '',
      password: '',
      error: '',
      type: 'gamer',
    };
  },
  methods: {
    setTypeGamer: function () {
      this.type = 'gamer';
    },
    setTypeOrganiser: function () {
      this.type = 'organiser';
    },
    handleSubmit: async function (e: SubmitEvent) {
      const { display_name, email, password, type } = this;

      e.preventDefault();

      try {
        const response = await axios.post('/signup', {
          display_name,
          email,
          password,
          type,
        });

        this.$router.push('/');
      } catch (e) {
        if ('response' in e) {
          this.error = e.response.data.message;
        } else {
          this.error = `${e}`;
        }
      }
    },
  },

  head: {
    title: {
      inner: 'Sign up',
    },
  },
});

export default Signup;
</script>
