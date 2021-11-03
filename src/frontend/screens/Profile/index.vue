


<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <h1 class="text-white fw-bold">{{ me.display_name }}</h1>
        <span class="text-white d-block mb-3">{{
          me.bio ||
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }}</span>
        <button class="btn btn-dark text-white" v-on:click="editBio">
          Edit Profile
        </button>
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
    <div class="row bg-danger">
      <div class="bg-secondary col-8">
        <h4 class="text-white fw-bold">My Games</h4>
      </div>

      <div class="bg-secondary col-4">
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

        <button
          v-on:click="linkGame"
          class="btn btn-dark"
          v-if="linkedGame == false"
        >
          Link an account
        </button>
      </div>

      <ul>
        <game-account
          v-for="gameAccount in me.gameAccounts"
          v-bind:key="gameAccount.id"
          v-bind:gameAccount="gameAccount"
        />
      </ul>
    </div>

    <div class="row">
      <div v-if="linkedGame == true" class="bg-dark">
        <form>
          <div class="form-group">
            <div class="d-flex pe-2">
              <label
                for="game"
                class="text-white text-center pe-3"
                style="padding-top: 6px"
                ><h4 class="fw-bold">Game you want to link:</h4></label
              >

              <select v-model="userSelectedGame">
                <option
                  v-for="(game, index) in gameDropdown"
                  v-bind:value="game[index + 1]"
                >
                  {{ game[index + 1] }}
                </option>
              </select>

              <!-- <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Games
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1"  v-model="userSelectedGame">
                  <li v-for="(game,index) in gameDropdown">
                    <a class="dropdown-item" href="#" v-bind:value="game[index+1]">{{ game[index+1]}}</a>
                  </li>
                </ul>
              </div> -->
            </div>
          </div>
          <div class="form-group pt-2">
            <label for="gameName" class="text-white">In Game Name</label>
            <input
              type="text"
              class="form-control w-50"
              id="inGameName"
              placeholder="IGN"
            />

            <label for="gameName" class="text-white">In Game Name</label>
            <input
              type="text"
              class="form-control w-50"
              id="inGameName"
              placeholder="IGN"
            />
          </div>

          <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
      {{ gamesList }}
      {{ gameDropdown }}
      {{ userSelectedGame }}
      here
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
      linkedGame: false,
      inGameName: '',
      gameDropdown: [],
      userSelectedGame: '',
      test: [],
    };
  },

  beforeMount() {
    this.fetchMyTeams();
    this.apiMe();
  },

  methods: {
    async fetchMyTeams() {
      const response = await axios.get<TeamsResponse>('/api/teams?self=true');

      this.teams = response.data.teams;
    },

    generateAvatar,

    linkGame() {
      this.linkedGame = true;
    },
    
    async apiMe() {
      const response = await axios.get('/api/me', {});

      console.log(response.data);
      console.log(
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'
      );
    },

    editBio() {
      console.log('edit bio');
    },
  },

  computed: {
    //gameList function to return all games supported on our website.
    gamesList: function () {
      axios
        .get('http://localhost:5000/api/games')

        .then((response) => {
          console.log(response.data.games);
          for (let i in response.data.games) {
            let obj = {};
            obj[response.data.games[i].id] = response.data.games[i].name;
            this.gameDropdown.push(obj);
          }
        });
    },
  },

  head: {
    title: {
      inner: 'Profile',
    },
  },
});

export default Profile;
</script>

