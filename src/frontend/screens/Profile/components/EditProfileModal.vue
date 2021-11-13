<template>
  <!-- Edit profile modal-->
  <div class="row">
    <div
      class="modal fade"
      id="bioModal"
      tabindex="-1"
      aria-labelledby="modal-label"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-label">Edit Profile</h5>
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
                <span class="input-group-text" id="basic-addon1">Username</span>
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
              <label for="exampleFormControlTextarea2"></label>
              <textarea
                class="form-control rounded-0"
                id="exampleFormControlTextarea2"
                rows="3"
                v-model="bio"
              ></textarea>

              <span v-if="error != null" class="text-danger">{{ error }}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {{ success ? 'Done' : 'Cancel' }}
            </button>
            <button
              type="button"
              class="btn btn-primary fw-bold text-white"
              v-on:click="handleEditClick"
              v-bind:disabled="!isValid"
              v-if="!success"
            >
              Edit
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

const EditProfileModal = Vue.component('edit-profile-modal', {
  data() {
    return {
      name: '',
      bio: null as string | null,
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
    user() {
      const state = this.$store.state as App.Frontend.Store.RootState;

      return state.user;
    },
  },

  methods: {
    init() {
      this.success = false;
      this.error = null;

      this.name = this.user?.display_name ?? '';
      this.bio = this.user?.bio ?? null;
    },

    async handleEditClick() {
      this.error = null;

      try {
        await axios.patch(`/api/me`, {
          display_name: this.name,
          bio: this.bio,
        });
        this.success = true;
        this.$store.commit('setUser', {
          ...this.user,
          display_name: this.name,
          bio: this.bio,
        });
      } catch (error) {
        this.error =
          (error as AxiosError).response?.data?.message ?? error.message;
      }
    },

    isValid() {
      return this.name != null && this.name.length > 0;
    },
  },
});

export default EditProfileModal;
</script>