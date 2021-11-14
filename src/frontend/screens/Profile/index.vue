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
      <div class="col-8 d-flex align-items-center py-2 mb-2">
        <h4 class="text-white fw-bold">My Games</h4>
      </div>
      <div
        class="col-4 d-flex align-items-center justify-content-end py-2 mb-2"
      >
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
    <div class="row tournament-grid">
      <div
        class="d-flex"
        v-bind:key="gameAccount.id"
        v-for="gameAccount in me.gameAccounts"
      >
        <game-stats v-bind:gameAccount="gameAccount" />
      </div>
    </div>

    <link-game-account-modal />

    <!-- end of modal 1-->
    <edit-profile-modal />

    <unlink-game-account-modal />

    <!--modal3 unlink-->
    <create-team-modal />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import GameAccount from '../../components/GameAccount/index.vue';
import generateAvatar from '../../util/generateAvatar';
import GameStats from '../../components/GameStats/index.vue';
import Team from '../../components/Team.vue';
import EditProfileModal from './components/EditProfileModal.vue';
import CreateTeamModal from '../../components/CreateTeamModal.vue';
import LinkGameAccountModal from './components/LinkGameAccountModal.vue';
import UnlinkGameAccountModal from './components/UnlinkGameAccountModal.vue';
import './styles.scss';

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

    getTeamLink(id: number) {
      return `/teams/${id}`;
    },
  },

  computed: {
    me() {
      return this.$store.state.user as App.API.CurrentUser;
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

