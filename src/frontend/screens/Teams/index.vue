<template>
  <div class="container">
    <div class="row mb-5">
      <div
        class="col-lg-8 col-md-6 col-12 d-flex align-items-center mb-sm-0 mb-3"
      >
        <h3 class="text-white d-inline-block fw-bold mb-0">Teams</h3>
        <button
          class="btn btn-primary fs-6 text-white border-0 fw-bold ms-3"
          data-bs-toggle="modal"
          data-bs-target="#createTeamModal"
        >
          Create
        </button>
      </div>
      <div class="col-lg-4 col-md-6 col-12">
        <input
          type="text"
          class="border border-0 form-control fw-bold"
          name=""
          v-model="searchTerm"
          placeholder="Search"
        />
      </div>
    </div>

    <div class="row teams-list">
      <router-link
        v-for="team in results()"
        v-bind:key="team.id"
        v-bind:to="getTeamLink(team.id)"
        style="text-decoration: none"
        class="d-block mb-3"
      >
        <team v-bind:team="team" />
      </router-link>
    </div>

    <create-team-modal />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import Team from '../../components/Team.vue';
import CreateTeamModal from '../../components/CreateTeamModal.vue';

interface Response extends App.API.ResponseBase {
  teams: App.API.Team[];
}

const Teams = Vue.extend({
  components: {
    Team,
    CreateTeamModal,
  },

  data() {
    return {
      searchTerm: '',
      role: null as App.API.Membership['role'] | null,
      teams: [] as App.API.Team[],
      teamName: '',
      teamDescription: '',
      avatar: '',
    };
  },

  beforeMount() {
    this.fetchTeams();
  },

  methods: {
    async fetchTeams() {
      const { data } = await axios.get<Response>('/api/teams');

      this.teams = data.teams;
      console.log(this.teams);
    },

    results() {
      if (this.searchTerm === '') {
        console.log(this.teams);
        return this.teams;
      }

      return this.teams.filter((team) =>
        team.name.toLowerCase().includes(this.searchTerm)
      );
    },

    getTeamLink(id: number) {
      return `/teams/${id}`;
    },
  },

  head: {
    title: {
      inner: 'Teams',
    },
  },
});

export default Teams;
</script>
