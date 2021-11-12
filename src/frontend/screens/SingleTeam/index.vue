<template>
  <div>
    <div v-if="team != null">
      <div class="row">
        <div class="col-4" style="border: 1px solid black; height: 200px">
          <img src="team.avatar" alt="" />
        </div>

        <div class="col-8 d-flex align-items-center g-1">
          <!-- d-flex and align-items-center for testing and leader to be aligned -->

          <div class="ms-3">
            <h1>{{ team.name }}</h1>
            <button v-if="role == null">Request to Join</button>
            <span v-if="role == 'leader'">You are a leader of this team.</span>
          </div>
        </div>
      </div>
      <!-- //729B98 -->
      <div class="row" style="background-color: #729b98">
        <h4 class="text-white mt-2">Team Description:</h4>

        <p>
          {{
            team.description ||
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          }}
        </p>
        <h4 class="text-white">Roster</h4>

        <div class="row p-3">
          <div
            v-for="membership in team.memberships"
            v-bind:key="membership.id"
            class="
              col-lg-6 col-sm-12
              bg-danger
              p-3
              d-flex
              text-white
              bg-dark
              border
              rounded
            "
          >
            <div class="col-4">
              <div class="">
                <img
                  class=""
                  v-bind:src="generateAvatar(membership.id)"
                  alt=""
                />
                <span class="d-block text-center">{{
                  membership.user.display_name
                }}</span>
              </div>
            </div>
            <div class="col-4">
              <span class="d-block"><h5>Games:</h5></span>
              <ul class="w-100" style="padding-left: 10px; margin: 0px">
                <li
                  v-for="gameAccount in membership.user.gameAccounts"
                  v-bind:key="gameAccount.id"
                  class="w-100"
                >
                  <!-- <img class="w-25" v-for="item in gameLogo" v-bind:src="item[gameAccount.game.id]"/> -->

                  <span>{{ gameAccount.game.name }}</span>
                </li>
              </ul>
            </div>

            <div class="col-4">
              <span class="d-block">User Bio:</span>
              <span>{{ membership.user.bio }}</span>
            </div>
          </div>
        </div>

        <div
          class="row p-3"
          v-for="membership in team.memberships"
          v-bind:key="membership.id"
        >
          <div class="col-2">
            <img v-bind:src="generateAvatar(membership.id)" alt="" />
            <span class="d-block text-center">{{
              membership.user.display_name
            }}</span>
          </div>

          <div class="col-4">
            <ul class="w-100">
              <li
                v-for="gameAccount in membership.user.gameAccounts"
                v-bind:key="gameAccount.id"
                class="w-100"
              >
                <!-- <img class="w-25" v-for="item in gameLogo" v-bind:src="item[gameAccount.game.id]"/> -->
                <span>{{ gameAccount.game.name }}</span>
              </li>
            </ul>
          </div>

          <div class="col-6">
            <span>{{ membership.user.bio }}</span>
          </div>

          <!-- <ul> -->
          <!-- <li v-for="membership in team.memberships" v-bind:key="membership.id"> -->
          <!-- <img v-bind:src="generateAvatar(membership.id)" alt="" /> -->
          <!-- <img class="img-thumbnail" v-bind:src="generateAvatar(me.id)" alt="" /> -->
        </div>

        <!-- <div v-if="role == 'leader'">
          <h1>Invitations</h1>
          <ul>
            <li v-for="invitation in invitations" v-bind:key="invitation.id">
              <span>
                Invite #{{ invitation.id }} for user
                {{ invitation.user.display_name }}
              </span>
            </li>
          </ul>
        </div> -->
        <div v-if="role == 'leader'">
          <h1>Join Requests</h1>
          <ul>
            <li
              v-for="join_request in join_requests"
              v-bind:key="join_request.id"
            >
              <span>
                Join Request #{{ join_request.id }} for user
                {{ join_request.user.display_name }}
              </span>
              <span>Status: {{ join_request.status }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import { gameAccountLink } from '../../../backend/api/gameaccount';
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

  methods: {
    async getGameList() {
      const response = axios
        .get('http://localhost:5000/api/games')
        .then((response) => {
          console.log(response.data.games);
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
  },

  head: {
    title: {
      inner: 'Team',
    },
  },
});

export default SingleTeam;
</script>
