<template>
<div class="row justify-content-center">
  <div class="col-6 box" style="background-color: #96B8B5;">
    <div style="margin-top: 270px">
      <form method="POST" action="/login" v-on:submit="handleSubmit">
      <h6 class="center mb-2" style="font-weight: bold">Login</h6>
      <input class="form-control mb-2 center" style="background: #729B98;" name="email" type="text" placeholder="Email Address" v-model="email"/>

      <input class="form-control mb-2 center" style="background: #729B98;" name="password" type="password" placeholder="Password" v-model="password"/>

      <input class="form-control mb-2 w-25 center" style="background: #729B98; color: white" type="submit" value="Login"/>

      <span class="error text-danger">{{ error }}</span>
      </form>
    </div>
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
