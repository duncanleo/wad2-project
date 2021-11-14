<template>
  <div class="container" v-if="tournament != null">
    <div class="row">
      <div class="col-md-8 col-12 d-flex align-items-center g-1">
        <div class="ms-3 text-white">
          <h1 class="fw-bold">{{ tournament.name }}</h1>
          <span class="fw-bold text-tertiary">{{ tournament.region }}</span>
          <div ref="map" style="width: 400px; height: 300px"></div>
          <p class="card-text text-primary fw-bold fs-3 mb-0">
            {{ tournament.prize_pool > 0 ? `$${tournament.prize_pool}` : '-' }}
          </p>
          <a
            class="btn btn-primary border-0 mt-2 text-white fw-bold"
            :href="tournament.url"
            target="_blank"
          >
            Visit Website
          </a>
        </div>
      </div>
      <div class="col-md-4 col-12">
        <div class="card border-0">
          <img
            class="card-img-top"
            v-bind:src="tournament.game.banner_image"
            alt=""
          />
          <div
            class="
              card-body
              bg-secondary
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <div>
              <h5 class="card-title text-white fw-bold mb-0">
                {{ tournament.game.name }}
              </h5>
              <span class="text-tertiary">
                {{ tournament.game.developer }}
              </span>
            </div>
            <span class="text-tertiary fs-5">
              {{ tournament.game.release_year }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <h4 class="text-white fw-bold">Participating Teams</h4>

      <router-link
        class="text-decoration-none mb-3"
        v-bind:to="teamLink(participation.team.id)"
        v-for="participation in tournament.participations"
        v-bind:key="participation.id"
      >
        <team v-bind:team="participation.team" />
      </router-link>

      <span class="text-tertiary" v-if="tournament.participations.length === 0">
        There are no teams to display.
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import Team from '../../components/Team.vue';

const SingleTournament = Vue.extend({
  components: {
    Team,
  },

  data() {
    return {
      tournament: null as App.API.Tournament | null,
    };
  },

  beforeMount() {
    this.fetchTournamentData();
  },

  methods: {
    async fetchTournamentData() {
      const id = this.$route.params.id;

      const response = await axios.get(`/api/tournaments/${id}`);

      this.tournament = await response.data.tournament;
      requestAnimationFrame(this.loadMap);
    },

    async loadMap() {
      let region = this.tournament?.region ?? 'Singapore';

      switch (this.tournament?.region) {
        case 'Russia': {
          region = 'Moscow';
          break;
        }
        case 'Global': {
          region = 'Antartica Continent';
          break;
        }
        case 'EMEA':
        case 'EU': {
          region = 'Germany';
          break;
        }
        case 'South America': {
          region = 'Brazil';
          break;
        }
      }

      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          region
        )}.json?`,
        {
          params: {
            access_token: process.env.MAPBOX_ACCESS_TOKEN,
          },
        }
      );

      const result = response.data?.features?.[0];

      // @ts-ignore
      mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
      // @ts-ignore
      const map = new mapboxgl.Map({
        container: this.$refs.map,
        style: 'mapbox://styles/mapbox/streets-v11',
      });

      map.setCenter(result?.center);
      map.fitBounds(result?.bbox);
    },

    teamLink(id: number) {
      return `/teams/${id}`;
    },
  },
});

export default SingleTournament;
</script>