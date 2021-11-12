<template>
  <div>
    <div v-if="team != null">

      <div class="row">
        <h1>{{ team.name }}</h1> 
        <button v-if="role == null">Request to Join</button>
        <span v-if="role == 'leader'">You are a leader of this team.</span>
      </div>
      <!-- //729B98 -->
      <span>Team Description:</span>
      <img src="team.avatar" alt="" />
      <p>{{ team.description }}</p>
      <span>Roster</span>
      <ul>
        <li v-for="membership in team.memberships" v-bind:key="membership.id">
          <img src="" alt="" />
          <span>{{ membership.user.display_name }}</span>
          <span>{{ membership.user.bio }}</span>
          <ul>
            <li
              v-for="gameAccount in membership.user.gameAccounts"
              v-bind:key="gameAccount.id"
            >
              <span>{{ gameAccount.game.name }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div v-if="role == 'leader'">
        <h1>Invitations</h1>
        <ul>
          <li v-for="invitation in invitations" v-bind:key="invitation.id">
            <span>
              Invite #{{ invitation.id }} for user
              {{ invitation.user.display_name }}
            </span>
          </li>
        </ul>
      </div>
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
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';

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
    };
  },

  beforeMount() {
    this.updateRole();
    this.fetchTeamData();
    this.fetchTeamInvites();
    this.fetchTeamJoinRequests();
  },

  methods: {
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
  },

  head: {
    title: {
      inner: 'Team',
    },
  },
});

export default SingleTeam;
</script>
