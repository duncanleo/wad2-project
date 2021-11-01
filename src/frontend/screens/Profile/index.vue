


<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <h1 class="text-white fw-bold">{{ me.display_name }}</h1>
        <span class="text-white">{{ me.bio || 'No bio' }}</span>
        <button>Edit Profile</button>
      </div>
      <div class="col-4">
        <img class="img-thumbnail" v-bind:src="generateAvatar(me.id)" alt="" />
      </div>
    </div>
   

    <!-- Teams row to show what teams you are in and to create teams -->
    <div class="row">
      <div class="bg-secondary col-8">
        <h4 class="text-white fw-bold">My Teams</h4>
      </div>
      <div class="bg-secondary col-4">
        <button class="btn btn-primary">Create Team</button>
      </div>
      <div v-for="team in teams" v-bind:key="team.id">
        <span>{{ team.name }}</span>
      </div>
    </div>


    <!-- Games row  to display games you have and to link games -->
    <div class="row mt-4 pt-3 bg-danger">
        <div class="bg-secondary col-8  ">
        <h4 class="text-white fw-bold">My Games</h4>
        </div>

        <div class="bg-secondary col-4 ">

        <!-- <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown button
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
    </div> -->


      <button v-on:click="linkGame" class="" v-if="linkedGame==false">Link an account</button>

      

      </div>
      
      


      <ul>
        <game-account
          v-for="gameAccount in me.gameAccounts"
          v-bind:key="gameAccount.id"
          v-bind:gameAccount="gameAccount"
        />
      </ul>
    </div>

    <div class="row mt-3">
      <div v-if="linkedGame==true" class="bg-danger">
        <form>
          <div class="form-group">
            <div class="d-flex pe-2">
              <label for="game" class="bg-danger text-center pe-3" style="padding-top:6px;">Game you want to link:</label>
              <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
              </div>
            </div>
            

          </div>
          <div class="form-group pt-2" >
            <label for="gameName">In Game Name</label>
            <input type="text" class="form-control" id="inGameName" placeholder="IGN">
          </div>
          
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>

      </div>
    </div>
    
  </div>
  
  
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import GameAccount from '../../components/GameAccount/index.vue';
import generateAvatar from '../../util/generateAvatar';


//glennhamrocks@gmail.com
//Test123!

interface TeamsResponse extends App.API.ResponseBase {
  teams: App.API.Team[];
}

const Profile = Vue.extend({
  components: {
    GameAccount,
  },

  data() {
    return {
      me: this.$store.state.user as App.API.CurrentUser,
      teams: [] as App.API.Team[],
      linkedGame:false,
      inGameName:"",
      games:{
        
      }

    };
  },

  beforeMount() {
    this.fetchMyTeams();
  },

  methods: {
    async fetchMyTeams() {
      const response = await axios.get<TeamsResponse>('/api/teams?self=true');

      this.teams = response.data.teams;
    },

    generateAvatar,


    linkGame(){
      this.linkedGame=true
    }
  },

  head: {
    title: {
      inner: 'Profile',
    },
  },
});

export default Profile;
</script>

