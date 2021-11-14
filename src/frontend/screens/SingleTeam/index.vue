<template>
  <div class="container" v-if="team != null">
    <div class="row">
      <div
        class="
          col-md-2 col-3
          d-flex
          align-items-center
          justify-content-center
          text-primary
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-joystick me-2"
          viewBox="0 0 16 16"
        >
          <path
            d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z"
          />
          <path
            d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z"
          />
        </svg>
      </div>

      <div class="col-md-8 col-7 d-flex align-items-center g-1">
        <div class="ms-3 text-white">
          <h1 class="fw-bold">{{ team.name }}</h1>
          <p class="text-tertiary">
            {{ team.description || 'No description' }}
          </p>

          <span v-if="role == 'leader'">You are a leader of this team.</span>
        </div>
      </div>

      <div
        class="col-md-2 col-12 d-flex align-items-center"
        v-if="!team.is_member"
      >
        <button
          class="btn btn-primary fw-bold text-white"
          v-if="team.join_request_status == null"
          v-on:click="requestJoin"
        >
          Request to Join
        </button>
        <span
          class="text-tertiary fw-bold"
          v-if="team.join_request_status === 'idle'"
        >
          Join Request Sent
        </span>
        <span
          class="text-danger fw-bold"
          v-if="team.join_request_status === 'rejected'"
        >
          Join Request Rejected
        </span>
      </div>
    </div>
    <div class="row mt-4">
      <h4 class="text-white fw-bold">Roster</h4>

      <router-link
        class="text-decoration-none mb-3"
        v-bind:to="getPlayerLink(membership.user.id)"
        v-for="membership in team.memberships"
        v-bind:key="membership.id"
      >
        <player v-bind:player="membership.user" />
      </router-link>
    </div>

    <div class="row mt-4" v-if="role == 'leader'">
      <h4 class="text-white fw-bold">Join Requests</h4>
      <ul>
        <li
          class="
            bg-secondary
            d-flex
            align-items-center
            py-2
            rounded
            justify-content-between
          "
          v-for="join_request in notAcceptedJoinRequests"
          v-bind:key="join_request.id"
        >
          <router-link
            class="text-decoration-none"
            v-bind:to="getPlayerLink(join_request.user.id)"
          >
            <player v-bind:player="join_request.user" />
          </router-link>
          <div class="d-flex me-4">
            <button
              class="btn btn-success text-white fw-bold me-2"
              v-if="join_request.status === 'idle'"
              v-on:click="updateJoinRequest(join_request, 'accepted')"
            >
              Accept
            </button>
            <button
              class="btn btn-danger text-white fw-bold"
              v-if="join_request.status === 'idle'"
              v-on:click="updateJoinRequest(join_request, 'rejected')"
            >
              Reject
            </button>
            <span
              class="text-danger fw-bold"
              v-if="join_request.status === 'rejected'"
            >
              Rejected
            </span>
          </div>
        </li>
      </ul>
      <span class="text-tertiary" v-if="join_requests.length === 0">
        There are no join requests.
      </span>
    </div>

    <div class="row mt-4">
      <h4 class="text-white fw-bold">Tournaments</h4>

      <div
        class="col-lg-4 col-md-6 col-12 mb-3"
        v-for="participation of team.participations"
        v-bind:key="participation.id"
      >
        <tournament v-bind:tournament="participation.tournament" />
      </div>

      <span class="text-tertiary" v-if="team.participations.length === 0">
        There are no tournaments to display.
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import Player from '../../components/Player.vue';
import generateAvatar from '../../util/generateAvatar';

interface TeamsResponse extends App.API.ResponseBase {
  team: App.API.Team;
}

interface TeamInvitationsResponse extends App.API.ResponseBase {
  invitations: App.API.TeamInvitation[];
}

interface TeamJoinRequestsResponse extends App.API.ResponseBase {
  join_requests: App.API.TeamJoinRequest[];
}

const SingleTeam = Vue.extend({
  components: {
    Player,
  },

  data() {
    return {
      team: null as App.API.Team | null,
      role: null as App.API.Membership['role'] | null,
      invitations: [] as App.API.TeamInvitation[],
      join_requests: [] as App.API.TeamJoinRequest[],
      gameLogo: [],
    };
  },

  beforeMount() {
    this.updateRole();
    this.fetchTeamData();
    this.fetchTeamInvites();
    this.fetchTeamJoinRequests();
    this.getGameList();
  },

  computed: {
    notAcceptedJoinRequests() {
      return this.join_requests.filter(
        (request) => request.status !== 'accepted'
      );
    },
  },

  methods: {
    async getGameList() {
      const response = axios
        .get('http://localhost:5000/api/games')
        .then((response) => {
          for (var game in response.data.games) {
            let gamePic = {};
            gamePic[response.data.games[game].id] =
              response.data.games[game].banner_image;
            this.gameLogo.push(gamePic);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    async fetchTeamData() {
      const teamID = this.$route.params.id;

      const response = await axios.get<TeamsResponse>(`/api/teams/${teamID}`);

      this.team = response.data.team;
    },

    async fetchTeamInvites() {
      const teamID = this.$route.params.id;

      const response = await axios.get<TeamInvitationsResponse>(
        `/api/teams/${teamID}/invitations`
      );

      this.invitations = response.data.invitations;
    },

    async fetchTeamJoinRequests() {
      const teamID = this.$route.params.id;

      const response = await axios.get<TeamJoinRequestsResponse>(
        `/api/teams/${teamID}/join_requests`
      );

      this.join_requests = response.data.join_requests;
    },

    async requestJoin() {
      const teamID = this.$route.params.id;

      await axios.post(`/api/teams/${teamID}/join`);

      this.fetchTeamData();
    },

    async updateJoinRequest(
      joinRequest: App.API.TeamJoinRequest,
      status: 'approved' | 'rejected'
    ) {
      await axios.patch(`/api/join_requests/${joinRequest.id}`, {
        status,
      });

      await this.fetchTeamData();
      await this.fetchTeamJoinRequests();
    },

    updateRole() {
      const teamID = parseInt(this.$route.params.id, 10);
      const user: App.API.CurrentUser = this.$store.state.user;

      const membershipsMap: Map<number, App.API.Membership> =
        user.memberships.reduce((prev, curr) => {
          prev.set(curr.team_id, curr);

          return prev;
        }, new Map());

      this.role = membershipsMap.get(teamID)?.role ?? null;
    },
    generateAvatar,

    getPlayerLink(playerId: number) {
      return `/players/${playerId}`;
    },
  },

  head: {
    title: {
      inner: 'Team',
    },
  },
});

export default SingleTeam;
</script>
