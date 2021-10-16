<template>
  <div class="mb-3">
    <span class="error text-danger">{{ error }}</span>
    <span>I am a...</span>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="type === 'gamer' && 'active'"
          v-on:click="setTypeGamer"
          >Gamer</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="type === 'organiser' && 'active'"
          v-on:click="setTypeOrganiser"
          >Organiser</a
        >
      </li>
    </ul>
    <form method="POST" action="/login" v-on:submit="handleSubmit">
      <input
        class="form-control"
        name="display_name"
        type="text"
        placeholder="Display Name"
        v-model="display_name"
        required
      />
      <input
        class="form-control"
        name="email"
        type="text"
        placeholder="Email"
        v-model="email"
        required
      />
      <input
        class="form-control"
        name="password"
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
      <input type="hidden" name="type" v-model="type" />
      <input class="form-control" type="submit" value="Sign up" />
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

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
