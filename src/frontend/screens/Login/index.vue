<template>
<div class="row justify-content-center">
  <div class="col-6" style="background-color: #96B8B5;">
    <img src="/Login/logo.png">
    <form class="form" method="POST" action="/login" v-on:submit="handleSubmit">
      <h5 class="ms-1">Login</h5>
      <input class="form-control mb-1 ms-1 me-1" style="background: #729B98;" name="email" type="text" placeholder="Email Address" v-model="email"/>

      <input class="form-control mb-1 ms-1 me-1" style="background: #729B98;" name="password" type="password" placeholder="Password" v-model="password"/>

      <input class="form-control mb-1 ms-1 me-1" style="background: #729B98;" type="submit" value="Login"/>

      <span class="error text-danger">{{ error }}</span>
    </form>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import './styles.scss';

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
