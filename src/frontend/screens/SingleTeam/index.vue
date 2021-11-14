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
      <span
        ><h4 class="text-white fw-bold">Tournaments</h4>
        <button
          class="btn btn-success text-white fw-bold me-2"
          data-bs-toggle="modal"
          data-bs-target="#participateTourney"
        >
          Participate
        </button></span
      >

      <div
        class="col-lg-4 col-md-6 col-12 mb-3"
        v-for="participation of team.participations"
        v-bind:key="participation.id"
      >
        <tournament v-bind:tournament="participation.tournament" />
      </div>
    </div>

    <div class="modal" tabindex="-1" id="participateTourney">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Participate in a Tournament</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="dropdown w-100">
              <button
                class="
                  btn btn-secondary
                  dropdown-toggle
                  w-100
                  d-flex
                  align-items-center
                "
                type="button"
                id="game-dropdown-button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-controller me-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"
                  />
                  <path
                    d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"
                  />
                </svg>
                {{
                  (selectedGame != null && selectedGame.name) || 'Select a game'
                }}
              </button>

              <ul
                class="dropdown-menu"
                aria-labelledby="game-dropdown-button"
                style="width: 100%"
              >
                <li>
                  <a
                    href="#"
                    class="dropdown-item text-tertiary"
                    v-on:click="setSelectedGameId(null)"
                    >Select a game</a
                  >
                </li>
                <li
                  v-for="game in games"
                  v-bind:value="game.name"
                  v-bind:key="game.id"
                  v-on:click="setSelectedGameId(game.id)"
                >
                  <a href="#" class="dropdown-item">{{ game.name }}</a>
                </li>
              </ul>
            </div>

            <div
              class="col-12 mt-4 mb-5"
              v-if="selectedGame !== 'Select a game'"
            >
              <h4 class="text-tertiary fw-bold mb-3">Upcoming Tournaments</h4>

              <span
                class="text-tertiary"
                v-if="upcomingTournaments.length === 0"
              >
                There are no upcomingTournaments
              </span>

              <div class="row justify-content-center" style="row-gap: 1rem">
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="tournament of upcomingTournaments"
                    v-bind:key="tournament.id"
                  >
                    <div class="row align-items-center bg-dark text-white">
                      <div class="col-4">
                        <img
                          class="w-100"
                          v-bind:src="tournament.game.banner_image"
                        />
                      </div>
                      <div class="col-4 text-center">
                        <span>{{ tournament.name }}</span>
                      </div>
                      <div class="col-2 text-center">
                        ${{ tournament.prize_pool }}}
                      </div>
                      <div class="col-2">
                        <button
                          class="btn btn-danger text-white fw-bold"
                          v-on:click="joinTournament(tournament.id)"
                        >
                          Join
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>

                <div v-if="results.length < 1">
                  <h2 class="text-white">No tournament available</h2>
                </div>
              </div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import Player from '../../components/Player.vue';
import generateAvatar from '../../util/generateAvatar';
import moment from 'moment';

interface TeamsResponse extends App.API.ResponseBase {
  team: App.API.Team;
}

interface TeamInvitationsResponse extends App.API.ResponseBase {
  invitations: App.API.TeamInvitation[];
}

interface TeamJoinRequestsResponse extends App.API.ResponseBase {
  join_requests: App.API.TeamJoinRequest[];
}
interface GamesResponse extends App.API.ResponseBase {
  games: App.API.Game[];
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
      selectedGameId: null as number | null,
      games: [] as App.API.Game[],
      tournaments: [] as App.API.Tournament[],
    };
  },

  beforeMount() {
    this.updateRole();
    this.fetchTeamData();
    this.fetchTeamInvites();
    this.fetchTeamJoinRequests();
    this.getGameList();
    this.fetchGames();
    this.fetchTournaments();
  },

  computed: {
    selectedGame() {
      return this.games.find((game) => game.id === this.selectedGameId);
    },
    notAcceptedJoinRequests() {
      return this.join_requests.filter(
        (request) => request.status !== 'accepted'
      );
    },
    results() {
      if (this.selectedGameId == null) {
        return this.tournaments;
      }

      return this.tournaments.filter(
        (tournament) => tournament.game_id === this.selectedGameId
      );
    },

    upcomingTournaments() {
      const now = moment();

      return this.results.filter((tournament) => {
        const start = moment(tournament.start_at);

        return start.isAfter(now);
      });
    },
    pastTournaments() {
      const now = moment();

      return this.results.filter((tournament) => {
        const start = moment(tournament.start_at);

        return start.isSameOrBefore(now);
      });
    },
  },

  methods: {
    joinTournament(tourneyId) {
      console.log(tourneyId);
      console.log(this.team);

      const response = axios
        .put(`/api/tournaments/${tourneyId}/participate`, {
          team_id: this.team.id,
        })

        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    async fetchTournaments() {
      const response = await axios.get<TournamentsResponse>('/api/tournaments');

      this.tournaments = response.data.tournaments;
    },
    async fetchGames() {
      const response = await axios.get<GamesResponse>('/api/games');

      this.games = response.data.games;
    },
    setSelectedGameId(id: number | null) {
      this.selectedGameId = id;
    },
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
