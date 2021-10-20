<template>
  <div class="container-md">
    <div style="background-color: #96B8B5; position: absolute; width: 700px; height: 550px; left: 363px; top: 150px;">
      <form style="position: absolute; margin-top: 250px; margin-left: 45px" method="POST" action="/login" v-on:submit="handleSubmit">
        <h5>Login</h5>
        <input
          class="form-control"
          style="width: 613px; height: 75px; background: #729B98; margin-bottom: 10px; border-radius: 7px;"
          name="email"
          type="text"
          placeholder="Email Address"
          v-model="email"
        />
        <input
          class="form-control"
          style="width: 613px; height: 75px; background: #729B98; margin-bottom: 10px; border-radius: 7px;"
          name="password"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <input 
          class="form-control"
          style="width: 150px; height: 50px; background: #729B98; margin-left: 200px; border-radius: 7px;"
          type="submit" 
          value="Login" 
        />
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
