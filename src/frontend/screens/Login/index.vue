

<template>

  <div class="d-block justify-content-center w-100 h-50">
    


    <!--login box-->
    <div id = "loginDetails" class="mb-3 col-6 mx-auto p-5 rounded" style="background-color: #96B8B5;" >
        <span class="error text-danger">{{ error }}</span>

    <!--Game logo-->
        <div id = "gameLogo" class="text-danger col-6 mx-auto mb-5" style="border-style:solid; text-align:centre">
          <img style="height:200px; display:block" v-bind:src="gamelogo" alt = "waiting">
        </div>

        <div style="display:flex">
   
        <div class="col-6 mx-auto mb-2">
          <span class="h5"><b>Login</b></span></div>
        </div>

        
        <form class = "col-6 mx-auto"  method="POST" action="/login" v-on:submit="handleSubmit" >
        
        
        
          <input 
            style="background-color:#729B98; border-color:#729B98"
            class="form-control mb-1"
            name="email"
            type="text"
            placeholder="Email"
            v-model="email"
            
          />
          <input
            style="background-color:#729B98; border-color:#729B98"
            class="form-control mb-2"
            name="password"
            type="password"
            placeholder="Password"
            v-model="password"
          />

          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
          <label for="vehicle1"><b>Remember Me</b></label><br>

          <input id ="loginButton" style="background-color:#729B98; color:white; border-color:#729B98" class="form-control mt-4 mx-auto mb-3" type="submit" value="Login" />
          <a class="text-danger" href="../Signup">Dont have an account? Sign up here</a>
        </form>
        
        
    </div>
  </div>
  
  
</template>

<style scoped lang="scss">



</style>



<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import "./styles.scss";

const Login = Vue.extend({
  data: function () {
    return {
      email: '',
      password: '',
      error: '',
      gamelogo: require("../../../assets/images/gamelogo.jpg"), 
      alt:"loll"
      
      
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
