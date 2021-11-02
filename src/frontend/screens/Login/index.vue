<template>
  <div class="row justify-content-center">
    <div class="col box">
      <form class="form" method="POST" action="/login" v-on:submit="handleSubmit">
      <h5>Login</h5>
      <div >
        <input class="form-control" name="email" type="text" placeholder="Email Address" v-model="email"/>
      </div>

      <input class="form-control" name="password" type="password" placeholder="Password" v-model="password"/>

      <input class="form-control" type="submit" value="Login"/>

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
