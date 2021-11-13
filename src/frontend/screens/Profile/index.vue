<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col-4 mx-auto">
        <img class="img-thumbnail" v-bind:src="generateAvatar(me.id)" alt="" />
      </div>
      <div class="col-8 mb-sm-0 mb-4">
        <h1 class="text-white fw-bold">{{ me.display_name }}</h1>
        <span class="text-white d-block mb-3">{{ me.bio || 'No bio' }}</span>
        <button
          class="btn btn-primary text-white fw-bold fs-6"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#bioModal"
        >
          Edit Profile
        </button>
      </div>
    </div>

    <!-- Teams row to show what teams you are in and to create teams -->
    <div class="row mb-4">
      <div class="col-12 d-flex align-items-center py-2 mb-2">
        <h4 class="text-white fw-bold mb-0">My Teams</h4>
        <button
          class="btn btn-primary text-white fw-bold fs-6 ms-3"
          data-bs-toggle="modal"
          data-bs-target="#createTeamModal"
        >
          Create
        </button>
      </div>
      <div class="col-12 d-flex flex-column">
        <router-link
          v-bind:to="getTeamLink(team.id)"
          v-for="team in teams"
          v-bind:key="team.id"
          class="d-block mb-3 text-decoration-none"
        >
          <team v-bind:team="team" />
        </router-link>
      </div>
    </div>

    <!-- Games row  to display games you have and to link games -->
    <div class="row">
      <div class="col-8 d-flex align-items-center py-2">
        <h4 class="text-white fw-bold">My Games</h4>
      </div>
      <div class="col-4 d-flex align-items-center justify-content-end py-2">
        <button
          v-on:click="linkGame"
          type="button"
          class="btn btn-primary fw-bold text-white me-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Link account
        </button>
        <button
          type="button"
          class="btn btn-primary fw-bold text-white"
          data-bs-toggle="modal"
          data-bs-target="#unLink"
        >
          Unlink account
        </button>
      </div>
    </div>
    <div class="row">
      <game-stats
        v-bind:key="item.name"
        v-for="item in display"
        v-bind:name="item.name"
        v-bind:stat1="item.stat1"
        v-bind:stat2="item.stat2"
        v-bind:image="item.backgroundImage"
      ></game-stats>
    </div>

    <!-- Link game Modal -->
    <div class="row bg-danger">
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
                    (selectedGame != null && selectedGame.name) ||
                    'Select a game'
                  }}
                </button>

                <ul
                  class="dropdown-menu"
                  aria-labelledby="game-dropdown-button"
                  style="width: 100%"
                >
                  <li
                    style="
                      height: 50px;
                      font-size: 25px;
                      background-image: url();
                    "
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
                  <span class="input-group-text" id="basic-addon1"
                    >Username</span
                  >
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
                  <span class="input-group-text" id="basic-addon1"
                    >Platform</span
                  >
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

              <button
                type="button"
                class="btn btn-primary"
                v-on:click="linkGame"
                data-bs-dismiss="modal"
              >
                Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- end of modal 1-->

    <!-- Edit profile modal-->
    <div class="row">
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
              <h5 class="modal-title" id="exampleModalLabel">Edit profile</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"
                    >Username</span
                  >
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  v-model="editProfileName"
                />
              </div>

              <div class="form-group mb-3">
                <label for="exampleFormControlTextarea2"></label>
                <textarea
                  class="form-control rounded-0"
                  id="exampleFormControlTextarea2"
                  rows="3"
                  v-model="editProfileBio"
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="editBio"
                data-bs-dismiss="modal"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--unlink game modal -->
      <div
        class="modal fade"
        id="unLink"
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
                    (selectedGame != null && selectedGame.name) ||
                    'Select a game'
                  }}
                </button>

                <ul
                  class="dropdown-menu"
                  aria-labelledby="game-dropdown-button"
                  style="width: 100%"
                >
                  <li
                    style="
                      height: 50px;
                      font-size: 25px;
                      background-image: url();
                    "
                    v-for="game in meGames"
                    v-bind:value="game.name"
                    v-bind:key="game.id"
                    v-on:click="setSelectedGameId(game)"
                  >
                    <a href="#" class="dropdown-item">{{ game.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="unlinkGame"
                data-bs-dismiss="modal"
              >
                unLink
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--modal3 unlink-->

    <!--Create team modal-->
    <div class="row">
      <div
        class="modal fade"
        id="createTeamModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create a team!</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"
                    >Team Name</span
                  >
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  v-model="teamName"
                />
              </div>

              <div class="form-group mb-3">
                <label for="exampleFormControlTextarea2"
                  >Team Description</label
                >
                <textarea
                  class="form-control rounded-0"
                  id="exampleFormControlTextarea2"
                  rows="3"
                  v-model="teamDescription"
                ></textarea>
              </div>

              <label for="img">Select image:</label>
              <input type="file" id="img" name="img" accept="image/*" />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="createTeam"
                data-bs-dismiss="modal"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {{ games }}
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import GameAccount from '../../components/GameAccount/index.vue';
import generateAvatar from '../../util/generateAvatar';
import GameStats from '../../components/GameStats.vue';
import Team from '../../components/Team.vue';

//glennhamrocks@gmail.com
//Test123!

interface TeamsResponse extends App.API.ResponseBase {
  teams: App.API.Team[];
}

const Profile = Vue.extend({
  components: {
    GameAccount,
    GameStats,
    Team,
  },

  data() {
    return {
      me: this.$store.state.user as App.API.CurrentUser,
      teams: [] as App.API.Team[],
      linkedGame: false,
      editProfileName: '',
      editProfileBio: '',
      games: [], //list of all games
      userSelectedGame: '', //v-model for dropdown list
      linkAccountUserName: '', // userInpt when linking game
      linkAccountPlatform: '', //user input account when linking game
      secondParam: false, //check if game requires 2nd input for API
      meGames: [], // number of game me has
      display: [],
      teamName: '',
      teamDescription: '',
      modalItems: [],
      // //{   caption : 'Dracula', path: 'img/Dracula.jpg',
      //                           info: "Dracula is an 1897 Gothic horror novel by Irish author Bram Stoker. It introduced the character of Count Dracula and established many conventions of subsequent vampire fantasy.[1] The novel tells the story of Dracula's attempt to move from Transylvania to England so that he may find new blood and spread the undead curse, and of the battle between Dracula and a small group of people led by Professor Abraham Van Helsing."
      //                       },
    };
  },

  beforeMount() {
    this.gamesList();
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
      // if (this.linkedGame == false) {
      //   this.linkedGame = true;
      // } else {
      //   this.linkedGame = false;
      // }

      if (this.userSelectedGame != '') {
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
              window.location.reload();
            })

            .catch((error) => {
              console.log(error.message);
            });
        }
      }
    },

    unlinkGame() {
      console.log(this.userSelectedGame.id);
      const response = axios
        .delete(`/api/games/${this.userSelectedGame.id}/account`, {})

        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })

        .catch((error) => {
          console.log(error.message);
        });

      // DELETE /api/games/:id/account
    },
    createTeam() {
      console.log('working');
      console.log(this.teamName);
      console.log(this.teamDescription);

      const response = axios
        .post(`/api/teams`, {
          name: this.teamName,
        })

        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })

        .catch((error) => {
          console.log(error.message);
        });
    },
    //http://localhost:5000/api/teams
    // http://localhost:5000/api/teams?self=true
    // const response = axios
    //         .get(`/api/teams?self=true`, {

    //         })

    //         .then((response) => {
    //           console.log(response.data);
    //         })

    //         .catch((error) => {
    //           console.log(error.message);
    //         });

    async apiMe() {
      const response = await axios.get('/api/me', {});
      console.log(response.data);
      this.editProfileName = response.data.display_name;
      this.editProfileBio = response.data.bio;

      // all the games me currently has
      for (let i in response.data.gameAccounts) {
        let id = response.data.gameAccounts[i].game_id;
        let x = this.games.find((game) => game.id === parseInt(id));
        this.meGames.push(x);
      }
      //internal ID  codmw_2019/ fortnite/ dota_2/ apex_legends
      for (let indvGame in response.data.gameAccounts) {
        let gameObj = {};
        gameObj['name'] = response.data.gameAccounts[indvGame].game.name;
        gameObj['id'] = response.data.gameAccounts[indvGame].game.id;
        gameObj['internalId'] =
          response.data.gameAccounts[indvGame].game.internal_id;

        gameObj['backgroundImage'] = this.games.find(
          (game) => game.id === response.data.gameAccounts[indvGame].game.id
        ).banner_image;

        if (
          response.data.gameAccounts[indvGame].game.internal_id == 'codmw_2019'
        ) {
          // here
          gameObj['stat1'] =
            'KDR: ' +
            response.data.gameAccounts[indvGame].data.br_all.kdRatio.toString(); //kd ratio
          gameObj['stat2'] =
            'Games played: ' +
            response.data.gameAccounts[
              indvGame
            ].data.br_all.gamesPlayed.toString(); //number of games played

          // change this to game internal ID also
          console.log('^^^^ here');
        } else if (
          response.data.gameAccounts[indvGame].game.internal_id == 'fortnite'
        ) {
          gameObj['stat1'] =
            response.data.gameAccounts[
              indvGame
            ].data.lifetime.all.all.kdr.toString() + ' Kdr ';
          gameObj['stat2'] =
            response.data.gameAccounts[
              indvGame
            ].data.lifetime.all.all.kills.toString() + ' Kills ';
        } else if (
          response.data.gameAccounts[indvGame].game.internal_id ==
          'apex_legends'
        ) {
          gameObj['stat1'] =
            'Rank: ' +
            response.data.gameAccounts[
              indvGame
            ].data.segments[0].stats.rankScore.metadata.rankName.toString(); //push rank into obj
          gameObj['stat2'] =
            'Level: ' +
            response.data.gameAccounts[
              indvGame
            ].data.segments[0].stats.level.displayValue.toString(); //push level into obj
        } else if (
          response.data.gameAccounts[indvGame].game.internal_id == 'dota_2'
        ) {
          gameObj['stat1'] =
            response.data.gameAccounts[
              indvGame
            ].data.competitive_rank.toString() + ' MMR'; //dota 2 rank into gameObj
          gameObj['stat2'] =
            response.data.gameAccounts[indvGame].data.rank_tier.toString() +
            '%'; //dota2 percentile
        }

        this.display.push(gameObj);
      }
      console.log(this.display);
    },

    gamesList: function () {
      //before mount to get the list of games
      axios
        .get('/api/games')

        .then((response) => {
          for (let i in response.data.games) {
            this.games.push(response.data.games[i]);
          }
        });
    },

    editBio() {
      const response = axios
        .patch(`/api/me`, {
          display_name: this.editProfileName,
          bio: this.editProfileBio,
        })

        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })

        .catch((error) => {
          console.log(error.message);
        });
    },

    setSelectedGameId(game) {
      this.userSelectedGame = game;
      console.log(this.userSelectedGame);
    },

    getTeamLink(id: number) {
      return `/teams/${id}`;
    },
  },

  computed: {
    //gameList function to return all games supported on our website.

    //selected name dropdown and also check if game is apex or callofduty for showing of platform
    //change this to internal ID  codmw_2019/ fortnite/ dota_2/ apex_legends
    selectedGame() {
      let game = this.games.find(
        (game) => game.internal_id === this.userSelectedGame.internal_id
      );
      // change number of input boxes depending on game
      if (game != null) {
        if (game.internal_id == 'codmw_2019') {
          this.secondParam = true;
        } else if (game.internal_id == 'apex_legends') {
          this.secondParam = true;
        } else if (game.internal_id == 'fortnite') {
          this.secondParam = false;
        } else if (game.internal_id == 'dota_2') {
          this.secondParam = false;
        }
      }

      return this.games.find((game) => game.id === this.userSelectedGame.id);
    },
  },

  head: {
    title: {
      inner: 'Profile',
    },
  },
});

Vue.component('button-counter', {
  data: function () {
    return {
      count: 0,
    };
  },
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
});
export default Profile;
</script>

