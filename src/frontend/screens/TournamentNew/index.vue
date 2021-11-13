<template>
  <div class="container">
    <div class="row">
      <h1 class="text-white">New Tournament</h1>
      <p class="text-white-50">
        As an organiser, you can create tournaments for players to join.
      </p>

      <div class="col-lg-6 col-md-8 col-12">
        <label class="form-label text-white" for="name"> Name </label>
        <input
          class="form-control fw-bold"
          type="text"
          name="name"
          id="name"
          v-model="name"
        />
      </div>

      <div class="col-lg-2 col-md-4 col-12">
        <label class="form-label text-white" for="prize_pool">
          Prize Pool
        </label>
        <input
          class="form-control fw-bold"
          type="number"
          name="prize_pool"
          id="prize_pool"
          v-model.number="prize_pool"
        />
      </div>

      <div class="col-lg-4 col-md-12 col-12">
        <label class="form-label text-white" for="region"> Region </label>
        <input
          class="form-control fw-bold"
          type="text"
          name="region"
          id="region"
          v-model="region"
        />
      </div>

      <div class="col-lg-6 col-md-6 col-12">
        <label class="form-label text-white" for="start_at"> Starts At </label>
        <input
          class="form-control fw-bold"
          type="date"
          name="start_at"
          id="start_at"
          v-model="start_at"
        />
      </div>

      <div class="col-lg-6 col-md-6 col-12">
        <label class="form-label text-white" for="end_at"> Ends At </label>
        <input
          class="form-control fw-bold"
          type="date"
          name="end_at"
          id="end_at"
          v-model="end_at"
        />
      </div>

      <div class="col-12">
        <label class="form-label text-white" for="url"> URL </label>
        <input
          class="form-control fw-bold"
          type="url"
          name="url"
          id="url"
          v-model="url"
        />
      </div>

      <div class="col-12">
        <label class="form-label text-white" for="game_id"> Game </label>
        <select class="form-select fw-bold" v-model.number="game_id">
          <option
            v-for="game in games"
            v-bind:key="game.id"
            v-bind:value="game.id"
          >
            {{ game.name }}
          </option>
        </select>
      </div>

      <div class="col-12 mt-4">
        <button
          v-if="createdTournament == null"
          class="btn btn-primary"
          v-bind:disabled="!isValid"
          v-on:click="submit"
        >
          Create Tournament
        </button>
      </div>

      <div class="col-12">
        <span v-if="error != null" class="bg-white text-danger">{{
          error
        }}</span>
      </div>

      <div class="col-12">
        <span v-if="createdTournament != null" class="bg-white text-success">
          Tournament created!
          <router-link v-bind:to="createdTournamentLink"> View </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import axios, { AxiosError } from 'axios';
import './styles.scss';

const today = moment().startOf('day').format('yyyy-MM-D');

interface GamesResponse extends App.API.ResponseBase {
  games: App.API.Game[];
}

interface TournamentCreateResponse extends App.API.ResponseBase {
  status: boolean;
  tournament: App.API.Tournament;
}

const TournamentNew = Vue.extend({
  name: 'TournamentNew',
  data() {
    return {
      games: [] as App.API.Game[],
      name: '',
      region: '',
      prize_pool: 0,
      banner_image: null as string | null,
      banner_image_license: null as string | null,
      game_id: -1,
      start_at: today,
      end_at: today,
      url: null as string | null,
      error: null as string | null,
      createdTournament: null as App.API.Tournament | null,
    };
  },

  beforeMount() {
    this.fetchGames();
  },

  computed: {
    isValid() {
      return (
        this.name.length > 0 &&
        this.region.length > 0 &&
        this.start_at.length > 0 &&
        this.end_at.length > 0 &&
        this.game_id != -1
      );
    },

    createdTournamentLink() {
      return `/tournaments/${this.createdTournament?.id}`;
    },
  },

  methods: {
    async fetchGames() {
      const response = await axios.get<GamesResponse>('/api/games');

      this.games = response.data.games;
      this.game_id = this.games[0].id;
    },

    async submit() {
      this.error = null;

      try {
        const response = await axios.post<TournamentCreateResponse>(
          '/api/tournaments',
          {
            name: this.name,
            region: this.region,
            prize_pool: this.prize_pool,
            banner_image: this.banner_image,
            banner_image_license: this.banner_image_license,
            game_id: this.game_id,
            start_at: this.start_at,
            end_at: this.end_at,
            url: this.url,
          }
        );

        this.createdTournament = response.data.tournament;
      } catch (e) {
        const error = e as AxiosError;
        this.error = error.response?.data?.message ?? error.message;
      }
    },
  },
});

export default TournamentNew;
</script>
