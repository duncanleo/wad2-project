<template>
  <div>
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
        class="team row py-2"
        v-for="team in results()"
        v-bind:key="team.id"
        v-bind:to="getTeamLink(team.id)"
        style="text-decoration: none"
      >
        <div class="col-6 d-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-joystick me-2"
            style="color: #729b98"
            viewBox="0 0 16 16"
          >
            <path
              d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z"
            />
            <path
              d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z"
            />
          </svg>
          <p class="name text-white fs-2">
            {{ team.name }}
          </p>
        </div>

        <div class="col-3 d-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            style="color: #729b98"
            class="bi bi-people-fill me-2"
            viewBox="0 0 16 16"
          >
            <path
              d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
            />
            <path
              fill-rule="evenodd"
              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
            />
            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          </svg>
          <p class="memberships-count text-white fs-2">
            {{ team.memberships_count }} Members
          </p>
        </div>

        <div class="col-3">
          <button
            class="btn border border-1 text-white fs-4"
            style="background-color: #729b98; float: right"
          >
            Join
          </button>
        </div>

        <hr style="color: white; height: 5px; width: 100%" />
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

interface Response extends App.API.ResponseBase {
  teams: App.API.Team[];
}

const Teams = Vue.extend({
  data() {
    return {
      searchTerm: '',
      teams: [] as App.API.Team[],
      teamName: '',
      teamDescription: '',
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
      console.log('working');
      console.log(this.teamName);
      console.log(this.teamDescription);

      const response = axios
        .post('/api/teams', {
          name: this.teamName,
        })

        .then((response) => {
          console.log(response.data);
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
