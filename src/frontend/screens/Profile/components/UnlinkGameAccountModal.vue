<template>
  <div>
    <!--unlink game modal -->
    <div
      class="modal fade"
      id="unLink"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Unlink Game Account
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="dropdown mb-3">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="game-dropdown-button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{
                  (selectedGame != null && selectedGame.name) || 'Select a game'
                }}
              </button>

              <ul
                class="dropdown-menu"
                aria-labelledby="game-dropdown-button"
                style="width: 100%"
              >
                <li
                  style="height: 50px; font-size: 25px; background-image: url()"
                  v-for="game in meGames"
                  v-bind:value="game.name"
                  v-bind:key="game.id"
                  v-on:click="setSelectedGame(game)"
                >
                  <a href="#" class="dropdown-item">{{ game.name }}</a>
                </li>
              </ul>
            </div>
            <span v-if="error != null" class="text-danger">{{ error }}</span>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {{ success ? 'Close' : 'Cancel' }}
            </button>
            <button
              type="button"
              class="btn btn-primary fw-bold text-white"
              v-on:click="unlinkGame"
              v-bind:disabled="selectedGame == null"
              v-if="!success"
            >
              Unlink
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios, { AxiosError } from 'axios';
import Vue from 'vue';

interface GamesResponse extends App.API.ResponseBase {
  games: App.API.Game[];
}

const UnlinkGameAccountModal = Vue.component('unlink-game-account-modal', {
  data() {
    return {
      name: '',
      description: '',
      error: null as string | null,
      success: false,
      selectedGame: null as App.API.Game | null,
    };
  },

  mounted() {
    const modalElement = this.$refs.modal as HTMLDivElement;
    modalElement.addEventListener('show.bs.modal', () => {
      this.init();
    });
  },

  computed: {
    meGames() {
      const state = this.$store.state as App.Frontend.Store.RootState;

      const gameAccounts = state.user?.gameAccounts ?? [];

      const games: App.API.Game[] = [];

      for (const gameAccount of gameAccounts) {
        games.push(gameAccount.game);
      }

      return games;
    },
  },

  methods: {
    init() {
      this.success = false;
      this.error = null;
      this.name = '';
      this.description = '';
    },

    setSelectedGame(game: App.API.Game) {
      this.selectedGame = game;
    },

    async unlinkGame() {
      if (this.selectedGame == null) {
        return;
      }

      try {
        await axios.delete(`/api/games/${this.selectedGame.id}/account`, {});

        this.success = true;
      } catch (error) {
        this.error =
          (error as AxiosError).response?.data?.message ?? error.message;
      }
    },
  },
});

export default UnlinkGameAccountModal;
</script>