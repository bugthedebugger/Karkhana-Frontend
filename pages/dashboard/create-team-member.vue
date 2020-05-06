<template>
  <div>
    <div class="d-flex">
      <div class="dashboard-content flex-grow-1">
        <div class="toolbar d-flex mb-4 mt-4">
          <h1 class="title mb-4">Create Team Member</h1>

          <div class="ml-auto">
            <button
              class="btn btn-primary btn-sm mr-2"
              @click="save()"
              :disabled="saveLoading || !valid()"
            >
              <Spinner v-if="saveLoading" />Save
            </button>
            <nuxt-link to="/dashboard/team-members" class="btn btn-secondary btn-sm">Cancel</nuxt-link>
          </div>
        </div>

        <div class="container-card mt-0">
          <div class="team-input" v-if="value">
            <!-- Photo -->
            <div class="row mb-4">
              <div class="col">
                <div class="d-flex justify-content-center">
                  <div>
                    <label>Photo *</label>
                    <GalleryImageInput
                      ref="teamImageInput"
                      id="photo"
                      width="200"
                      height="200"
                      page_code="about"
                      :value="value.photo"
                      v-model="value.photo"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Name -->
            <label>Name *</label>
            <input
              type="text"
              class="form-control form-control-sm mb-4"
              placeholder="Name"
              v-model="value.name"
            />

            <!-- Post -->
            <label>Post *</label>
            <input
              type="text"
              class="form-control form-control-sm mb-4"
              placeholder="Post"
              v-model="value.post"
            />

            <!-- Bio -->
            <label>Bio *</label>
            <TextArea id="bio" v-model="value.bio" rows="8" :maxlength="1000" />

            <!-- Social Links -->
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control form-control-sm mb-4"
                  placeholder="Facebook URL"
                  v-model="value.facebook"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control form-control-sm mb-4"
                  placeholder="Instagram URL"
                  v-model="value.instagram"
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control form-control-sm mb-4"
                  placeholder="Twitter URL"
                  v-model="value.twitter"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control form-control-sm mb-4"
                  placeholder="Email"
                  v-model="value.email"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <Loading />
          </div>
        </div>
      </div>

      <div class="ml-2 p-4 pl-2">
        <Gallery pageCode="about" @newImage="fetchGalleryImages()" />
      </div>
    </div>
  </div>
</template>

<script>
import GalleryImageInput from "~/components/Dashboard/GalleryImageInput";
import TextArea from "~/components/core/TextArea";
import Gallery from "~/components/Dashboard/Gallery";
import Helper from "~/helpers/common";
import Loading from "~/components/Loading";
import Spinner from "~/components/Spinner";

export default {
  name: "CreateProduct",
  layout: "dashboard",
  auth: true,
  components: { GalleryImageInput, TextArea, Gallery, Loading, Spinner },
  data() {
    return {
      mode: false, //false: create, true: update
      value: null,
      saveLoading: false
    };
  },

  created() {
    let id = this.$route.query.id;
    if (id === "new-team-member") {
      this.mode = false;
      this.value = this.initTeamMember();
    } else {
      this.mode = true;
      this.fetchTeamMember(id);
    }
  },

  methods: {
    initTeamMember() {
      return {
        name: null,
        bio: null,
        post: null,
        photo: null,
        facebook: null,
        instagram: null,
        twitter: null,
        email: null
      };
    },

    fetchTeamMember(id) {
      this.$axios
        .get("/admin/team/" + id)
        .then(response => {
          this.value = response.data.data;
          this.value.photo = this.value.photo.path;
        })
        .catch(error => {
          this.$toast.show("Team member not found");
          this.$router.push({ path: "/dashboard/team-members" });
        });
    },

    save() {
      this.saveLoading = true;
      if (this.mode) {
        this.$axios
          .post("/admin/team/update/" + this.$route.query.id, this.value)
          .then(response => {
            this.$toast.show("Team member updated");
            this.saveLoading = false;
          })
          .catch(error => {
            Helper.displayError(this.$toast, error);
            this.saveLoading = false;
          });
      } else {
        this.$axios
          .post("/admin/team/create", this.value)
          .then(response => {
            this.$router.push({
              path: "/dashboard/team-members"
            });
            this.$toast.show("Team member created");
            this.saveLoading = false;
          })
          .catch(error => {
            Helper.displayError(this.$toast, error);
            this.saveLoading = false;
          });
      }
    },

    fetchGalleryImages() {
      this.$refs.teamImageInput.fetchGalleryImages();
    },

    valid() {
      return (
        this.value &&
        this.value.name &&
        this.value.bio &&
        this.value.post &&
        this.value.photo
      );
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  margin-bottom: 0;
}
</style>