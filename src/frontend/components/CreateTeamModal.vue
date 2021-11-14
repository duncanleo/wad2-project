<template>
  <!--Create team modal-->
  <div class="row">
    <div
      class="modal fade"
      id="createTeamModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create a team!</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"
                  >Team Name</span
                >
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="name"
              />
            </div>

            <div class="form-group mb-3">
              <label for="exampleFormControlTextarea2">Team Description</label>
              <textarea
                class="form-control rounded-0"
                id="exampleFormControlTextarea2"
                rows="3"
                v-model="description"
              ></textarea>
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
              v-on:click="createTeam"
              v-if="!success"
              v-bind:disabled="!isValid"
            >
              Create
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

const CreateTeamModal = Vue.component('create-team-modal', {
  data() {
    return {
      name: '',
      description: '',
      error: null as string | null,
      success: false,
    };
  },

  mounted() {
    const modalElement = this.$refs.modal as HTMLDivElement;
    modalElement.addEventListener('show.bs.modal', () => {
      this.init();
    });
  },

  computed: {
    isValid() {
      return this.name.length > 0 && this.description.length > 0;
    },
  },

  methods: {
    init() {
      this.success = false;
      this.error = null;
      this.name = '';
      this.description = '';
    },

    async createTeam() {
      try {
        await axios.post(`/api/teams`, {
          name: this.name,
          description: this.description,
        });
        this.success = true;
      } catch (error) {
        this.error =
          (error as AxiosError).response?.data?.message ?? error.message;
      }
    },
  },
});

export default CreateTeamModal;
</script>