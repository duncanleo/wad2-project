<template>
  <!-- Link game Modal -->
  <div class="row bg-danger">
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Link Game account
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
                  v-for="game in games"
                  v-bind:value="game.name"
                  v-bind:key="game.id"
                  v-on:click="setSelectedGame(game)"
                >
                  <a href="#" class="dropdown-item">{{ game.name }}</a>
                </li>
              </ul>
            </div>
            <!--end of dropdown-->

            <div class="input-group mb-3" v-if="selectedGame != null">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Username</span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="username"
              />
            </div>

            <div class="input-group mb-3" v-if="isPlatformRequired">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Platform</span>
              </div>
              <input
                type="text"
                class="form-control"
                text-white
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="platform"
              />
            </div>
            <span v-if="error != null" class="text-danger">{{ error }}</span>
          </div>
          <!--end of modal body-->
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
              v-on:click="linkGame"
              v-bind:disabled="!isValid"
            >
              Link
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

const LinkGameAccountModal = Vue.component('link-game-account-modal', {
  data() {
    return {
      username: '',
      platform: null as string | null,
      error: null as string | null,
      success: false,
      games: [] as App.API.Game[],
      selectedGame: null as App.API.Game | null,
    };
  },

  beforeMount() {
    this.gamesList();
  },

  mounted() {
    const modalElement = this.$refs.modal as HTMLDivElement;
    modalElement.addEventListener('show.bs.modal', () => {
      this.init();
    });
  },

  computed: {
    isValid() {
      return (
        this.username.length > 0 &&
        (!this.isPlatformRequired || this.platform?.length > 0)
      );
    },

    isPlatformRequired() {
      switch (this.selectedGame?.internal_id) {
        case 'codmw_2019':
        case 'apex_legends': {
          return true;
        }

        default: {
          return false;
        }
      }
    },
  },

  methods: {
    init() {
      this.success = false;
      this.error = null;
      this.username = '';
      this.platform = '';
      this.selectedGame = null;
    },

    async gamesList() {
      const response = await axios.get<GamesResponse>('/api/games');

      this.games = response.data.games;
    },

    setSelectedGame(game: App.API.Game) {
      this.selectedGame = game;
    },

    //when user clicks on linkGame
    async linkGame() {
      this.error = null;
      if (this.selectedGame == null) {
        return;
      }

      try {
        await axios.post(`/api/games/${this.selectedGame.id}/account`, {
          gamertag: this.username,
          platform: this.platform,
        });

        this.success = true;
      } catch (error) {
        this.error =
          (error as AxiosError).response?.data?.message ?? error.message;
      }
    },
  },
});

export default LinkGameAccountModal;
</script>