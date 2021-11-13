<template>
  <div class="container">
    <div style="width: 100%" class="row">
      <div class="col">
        <h1 class="text-white me-3">Teams</h1>
      </div>
      <div class="col">
        <button
          class="btn fs-4 float-right text-white border border-1"
          style="float: right; background-color: #729b98"
          data-bs-toggle="modal"
          data-bs-target="#createTeamModal"
        >
          Create Team
        </button>
      </div>
    </div>
    <input
      type="text"
      style="width: 100%; height: 50px; background-color: #729b98"
      class="border border-1 form-control"
      name=""
      v-model="searchTerm"
      v-on:input="handleInput"
      placeholder="Search..."
    />

    <hr style="color: white; height: 5px; width: 100%" />
    <div class="teams-list">
      <router-link
        v-for="team in results()"
        v-bind:key="team.id"
        v-bind:to="getTeamLink(team.id)"
        style="text-decoration: none"
      >
        <team v-bind:team="team" />
      </router-link>
    </div>

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
              <label for="exampleFormControlTextarea2">Team Description</label>
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
              class="btn border border-1 text-white"
              style="background-color: #729b98"
              data-bs-dismiss="modal"
              @click="createTeam"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import Team from '../../components/Team.vue';

interface Response extends App.API.ResponseBase {
  teams: App.API.Team[];
}

const Teams = Vue.extend({
  components: {
    Team,
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

    createTeam() {
      const response = axios
        .post('/api/teams', {
          name: this.teamName,
          description: this.teamDescription,
          avatar: this.avatar,
        })

        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })

        .catch((error) => {
          console.log(error.message);
        });
    },

    results() {
      if (this.searchTerm === '') {
        console.log(this.teams);
        return this.teams;
      }

      console.log(
        this.teams.filter((team) =>
          team.name.toLowerCase().includes(this.searchTerm)
        )
      );
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
