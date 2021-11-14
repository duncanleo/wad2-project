<template>
  <div class="card bg-dark flex-grow-1">
    <img
      class="card-img-top"
      v-bind:src="gameAccount.game.banner_image"
      alt="Card image cap"
      style="height: 15vw; object-fit: cover"
    />
    <div class="card-body bg-secondary">
      <p class="text-primary text-uppercase fw-bold">
        {{ gameAccount.game.name }}
      </p>
      <div
        class="text-center align-items-center mt-auto mb-2 bg-white"
        v-for="stat in stats"
        v-bind:key="stat.name"
      >
        <div
          class="progress"
          style="height: 24px"
          v-if="stat.type === 'progress'"
        >
          <div
            class="progress-bar"
            role="progressbar"
            v-bind:style="{ width: `${(stat.value / stat.max) * 100}%` }"
            v-bind:aria-valuenow="stat.value"
            v-bind:aria-valuemin="stat.min"
            v-bind:aria-valuemax="stat.max"
          >
            <h3 class="text-white fs-6 fw-bold mb-0">
              {{ stat.label }} ({{ stat.value.toFixed(4) }} )
            </h3>
          </div>
        </div>
        <div class="bg-light rounded-3" v-if="stat.type === 'value'">
          <h3 class="bg-primary text-white fs-6 fw-bold">{{ stat.label }}</h3>
          <h3>{{ stat.value }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

type Stat =
  | {
      label: string;
      value: number;
      min: number;
      max: number;
      type: 'progress';
    }
  | {
      label: string;
      value: number;
      type: 'value';
    };

const GameStats = Vue.component('game-stats', {
  props: {
    gameAccount: {
      type: Object as PropType<App.API.GameAccount>,
      required: true,
      validator(value) {
        return typeof value.id === 'number';
      },
    },
  },

  computed: {
    stats() {
      const internalId = this.gameAccount.game.internal_id;
      const data = this.gameAccount.data;
      const stats: Stat[] = [];

      switch (internalId) {
        case 'codmw_2019': {
          stats.push({
            label: 'KDR',
            value: data.br_all.kdRatio,
            min: 0,
            max: 2,
            type: 'progress',
          });

          stats.push({
            label: 'Games played',
            value: data.br_all.gamesPlayed,
            type: 'value',
          });
          break;
        }
        case 'fortnite': {
          stats.push({
            label: 'KDR',
            value: data.lifetime.all.all.kdr,
            min: 0,
            max: 2,
            type: 'progress',
          });
          stats.push({
            label: 'Kills',
            value: data.lifetime.all.all.kills,
            type: 'value',
          });
          break;
        }
        case 'apex_legends': {
          stats.push({
            label: 'Rank',
            value: data.data.segments[0].stats.rankScore.metadata.rankName,
            type: 'value',
          });
          stats.push({
            label: 'Level',
            value: data.data.segments[0].stats.level.displayValue,
            type: 'value',
          });
          break;
        }
        case 'dota_2': {
          stats.push({
            label: 'MMR',
            value: data.competitive_rank,
            type: 'value',
          });
          stats.push({
            label: 'Rank tier',
            value: data.rank_tier,
            type: 'value',
          });
          break;
        }
      }

      return stats;
    },
  },

  methods: {},
});

export default GameStats;
</script>
