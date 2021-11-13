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

    <link-game-account-modal />

    <!-- end of modal 1-->
    <edit-profile-modal />

    <unlink-game-account-modal />

    <!--modal3 unlink-->
    <create-team-modal />

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
import EditProfileModal from './components/EditProfileModal.vue';
import CreateTeamModal from './components/CreateTeamModal.vue';
import LinkGameAccountModal from './components/LinkGameAccountModal.vue';
import UnlinkGameAccountModal from './components/UnlinkGameAccountModal.vue';

interface TeamsResponse extends App.API.ResponseBase {
  teams: App.API.Team[];
}

const Profile = Vue.extend({
  components: {
    GameAccount,
    GameStats,
    Team,
    EditProfileModal,
    CreateTeamModal,
    LinkGameAccountModal,
    UnlinkGameAccountModal,
  },

  data() {
    return {
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

    async apiMe() {
      const response = await axios.get<App.API.CurrentUser>('/api/me', {});
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
        let gameObj: Record<string, string | number> = {};
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

    setSelectedGameId(game) {
      this.userSelectedGame = game;
      console.log(this.userSelectedGame);
    },

    getTeamLink(id: number) {
      return `/teams/${id}`;
    },
  },

  computed: {
    me() {
      return this.$store.state.user as App.API.CurrentUser;
    },

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

export default Profile;
</script>

