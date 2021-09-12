<template>
  <div class="mb-3">
    <span class="error text-danger">{{ error }}</span>
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
    };
  },
  methods: {
    handleSubmit: async function (e: SubmitEvent) {
      const { display_name, email, password } = this;

      e.preventDefault();

      try {
        const response = await axios.post('/signup', {
          display_name,
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
});

export default Signup;
</script>
