


<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <h1 class="text-white fw-bold">{{ me.display_name }}</h1>
        <span class="text-white d-block mb-3">{{
          me.bio ||
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }}</span>
        <button
          class="btn btn-dark text-white"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#bioModal"
          v-on:click="editBio"
        >
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
          v-if="linkedGame == false"
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Link a game
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
      <!-- <div v-if="linkedGame == true" class="bg-dark">
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
              </div> 
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
      </div> -->
      <!-- {{test}} -->
      {{ linkAccountPlatform }}
      {{ linkAccountUserName }}
      {{ userSelectedGame }}
      {{ games }}

      {{ user }}
      {{ gamesList }}

      here
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="dropdown mb-3">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="game-dropdown-button"
                style="
                  width: 100%;
                  height: 50px;
                  background-color: #729b98;
                  font-size: 25px;
                  text-align: start;
                "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{
                  (selectedGame != null && selectedGame.name) || 'Select a game'
                }}
              </button>

              <ul
                class="dropdown-menu"
                aria-labelledby="game-dropdown-button"
                style="width: 100%"
              >
                <li
                  style="height: 50px; font-size: 25px; background-image: url()"
                  v-for="game in games"
                  v-bind:value="game.name"
                  v-bind:key="game.id"
                  v-on:click="setSelectedGameId(game)"
                >
                  <a href="#" class="dropdown-item">{{ game.name }}</a>
                </li>
              </ul>
            </div>
            <!--end of dropdown-->

            <div class="input-group mb-3" v-if="userSelectedGame != ''">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Username</span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="linkAccountUserName"
              />
            </div>

            <div class="input-group mb-3" v-if="secondParam == true">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Platform</span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="linkAccountPlatform"
              />
            </div>
          </div>
          <!--end of modal body-->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>

            <button type="button" class="btn btn-primary" v-on:click="linkGame">
              Link
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of modal 1-->

    <div
      class="modal fade"
      id="bioModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">This is the modal body</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Link</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--modal-->
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
      games: [],
      userSelectedGame: '',
      user: '',
      linkAccountUserName: '',
      linkAccountPlatform: '',
      secondParam: false,
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

    //when user clicks on linkGame
    linkGame() {
      if (this.linkedGame == false) {
        this.linkedGame = true;
      } else {
        this.linkedGame = false;
      }

      if (this.userSelectedGame != '') {
        let url = `http://localhost:5000/api/games/${this.userSelectedGame.id}/account`;
        if (this.linkAccountPlatform == '') {
          const response = axios
            .post(`/api/games/${this.userSelectedGame.id}/account`, {
              gamertag: this.linkAccountUserName,
            })

            .then((response) => {
              console.log(response.data);
            })

            .catch((error) => {
              console.log(error.message);
            });
        } else {
          const response = axios
            .post(`/api/games/${this.userSelectedGame.id}/account`, {
              gamertag: this.linkAccountUserName,
              platform: this.linkAccountPlatform,
            })

            .then((response) => {
              console.log(response.data);
            })

            .catch((error) => {
              console.log(error.message);
            });
        }
      }
    },

    unlinkGame(){
      let url = `http://localhost:5000/api/games/${this.userSelectedGame.id}/account`;
      const response = axios
            .post(`/api/games/${this.userSelectedGame.id}/account`, {
              gamertag: this.linkAccountUserName,
            })

            .then((response) => {
              console.log(response.data);
            })

            .catch((error) => {
              console.log(error.message);
            });

     // DELETE /api/games/:id/account
    }
    // <<<<<<< HEAD

    // =======
    // >>>>>>> 192084ce0bed65175837f5524507c151f58524f6

    //96160282

    async apiMe() {
      const response = await axios.get('/api/me', {});

      this.user = response.data;
      for (let indvGame in response.data.gameAccounts) {
        //apex
        //console.log(response.data.gameAccounts[indvGame].data.segments[0].stats.rankScore.metadata.rankName) bronze 4 apex
        //  console.log(response.data.gameAccounts[indvGame].data.segments[0].stats.level.displayName) //word level
        //  console.log(response.data.gameAccounts[indvGame].data.segments[0].stats.level.displayValue) //level 792

        //dota2 rank mmr
        console.log(response.data.gameAccounts[indvGame].data.competitive_rank);
        //dota2 rank percentile
        console.log(response.data.gameAccounts[indvGame].data.rank_tier);
        console.log(response.data.gameAccounts[indvGame].data);
      }

      console.log('^^^^^');
    },

    editBio() {
      console.log('edit bio');
    },

    setSelectedGameId(game) {
      this.userSelectedGame = game;
    },
  },

  computed: {
    //gameList function to return all games supported on our website.
    gamesList: function () {
      axios
        .get('http://localhost:5000/api/games')

        .then((response) => {
          console.log(response.data.games);
          console.log('here');
          for (let i in response.data.games) {
            this.games.push(response.data.games[i]);
          }
        });
    },

    //selected name dropdown and also check if game is apex or callofduty for showing of platform
    selectedGame() {
      let game = this.games.find(
        (game) => game.id === this.userSelectedGame.id
      );
      // change number of input boxes depending on game
      if (game != null) {
        if (game.id == 1 || game.id == 3) {
          this.secondParam = true;
          console.log(game.id);
        } else {
          this.secondParam = false;
        }
      }
      return this.games.find((game) => game.id === this.userSelectedGame.id);
    },

    // test(){
    //   var url ='https://api.opendota.com/api/players/96160282'
    // axios.get(url, {
    //   params: {},
    //   headers: {

    // }
    // })
    //   .then(
    //     resp => {
    //       console.log(resp.data)

    //     }
    //   )

    //   .catch(
    //     function (error) {
    //       console.log(error.message);
    //     }
    //   )

    // }
  },

  head: {
    title: {
      inner: 'Profile',
    },
  },
});

export default Profile;
</script>

