<template>
  <form method="POST" action="/login">
    <input type="text" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <input type="submit" value="Login" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
const Login = Vue.extend({});

export default Login;
</script>
