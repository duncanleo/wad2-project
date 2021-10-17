<template>
  <div>
    <dota
      v-if="gameAccount.game.internal_id === 'dota_2'"
      v-bind:data="gameAccount.data"
    />
    <fortnite
      v-if="gameAccount.game.internal_id === 'fortnite'"
      v-bind:data="gameAccount.data"
    />
    <codmw-2019
      v-if="gameAccount.game.internal_id === 'codmw_2019'"
      v-bind:data="gameAccount.data"
    />
    <apex-legends
      v-if="gameAccount.game.internal_id === 'apex_legends'"
      v-bind:data="gameAccount.data"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ApexLegends from './components/ApexLegends.vue';
import CODMW2019 from './components/CODMW2019.vue';
import Dota from './components/Dota.vue';
import Fortnite from './components/Fortnite.vue';

const GameAccount = Vue.extend({
  props: {
    gameAccount: {
      type: Object as PropType<App.API.GameAccount>,
      required: true,
    },
  },
  components: {
    Dota,
    Fortnite,
    CODMW2019,
    ApexLegends,
  },
});

export default GameAccount;
</script>
