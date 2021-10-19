<template>
  <div class="mb-3">
    <form method="POST" action="/login" v-on:submit="handleSubmit">
      <input
        class="form-control"
        name="email"
        type="text"
        placeholder="Email"
        v-model="email"
      />
      <input
        class="form-control"
        name="password"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <input class="form-control" type="submit" value="Login" />
      <span class="error text-danger">{{ error }}</span>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

const Login = Vue.extend({
  data: function () {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    handleSubmit: async function (e: SubmitEvent) {
      const { email, password } = this;

      e.preventDefault();

      try {
        const response = await axios.post('/login', {
          email,
          password,
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
      inner: 'Login',
    },
  },
});

export default Login;
</script>
