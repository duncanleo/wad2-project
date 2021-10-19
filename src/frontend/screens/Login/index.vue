<template>
  <div class="container">
    <div style="background-color: #96B8B5; position: absolute; width: 600px; height: 500px; left: 363px; top: 175px;">
      <form method="POST" action="/login" v-on:submit="handleSubmit">
        <input
          class="form-control"
          style="width: 613px; height: 50px; left: 419px; top: 525px; background: #729B98; border-radius: 7px;"
          name="email"
          type="text"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="form-control"
          style="width: 613px; height: 50px; left: 419px; top: 679px; background: #729B98; border-radius: 7px;"
          name="password"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      <input class="form-control" type="submit" value="Login" />
      <span class="error text-danger">{{ error }}</span>
     </form>
    </div>
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
