<template>
<div class="row justify-content-center">
  <div class="col-6 box mb-3" style="background-color: #96B8B5;">
     <div style="margin-top: 250px">
       <span class="error text-danger">{{ error }}</span>
    <h6 class="mb-1 center" style="font-weight: bold">Sign Up</h6>
    <ul class="nav nav-pills center">
      <li class="nav-item">
        <a
          class="nav-link text-light"
          :class="type === 'gamer' && 'active'"
          v-on:click="setTypeGamer"
          >Gamer</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link text-light"
          :class="type === 'organiser' && 'active'"
          v-on:click="setTypeOrganiser"
          >Organiser</a
        >
      </li>
    </ul>
    <form method="POST" action="/login" v-on:submit="handleSubmit">
      <input
        class="form-control mb-1 center"
        style="background: #729B98;"
        name="display_name"
        type="text"
        placeholder="Display Name"
        v-model="display_name"
        required
      />
      <input
        class="form-control mb-1 center"
        style="background: #729B98;"
        name="email"
        type="text"
        placeholder="Email"
        v-model="email"
        required
      />
      <input
        class="form-control mb-4 center"
        style="background: #729B98;"
        name="password"
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
      <input type="hidden" name="type" v-model="type" />
      <input class="form-control w-25 center" style="background: #729B98; color: white" type="submit" value="Sign up" />
    </form>
    </div>
  </div>
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
