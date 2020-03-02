<template>
  <div class="dashboard-content">
    <div class="toolbar">
      <h1 class="title">Profile</h1>
    </div>
    <form @submit="updateProfile">
      <div class="row">
        <div class="col">
          <div class="image-upload-card d-flex">
            <div class="avatar mr-3 align-self-center">
              <img v-if="avatarPreview" :src="avatarPreview" />
              <i v-else class="fal fa-user-circle"></i>
            </div>

            <div class="upload-btn-wrapper align-self-center">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="openFileUploadDialog()"
              >Choose File</button>
              <input type="file" ref="fileUpload" hidden @change="handleFileUpload" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="fullname">Full name</label>
            <input
              type="text"
              class="form-control"
              id="fullname"
              v-model="fullname"
              placeholder="Full name"
            />
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="email"
              placeholder="Email"
              disabled
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" />
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="password_confirmation">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="password_confirmation"
              v-model="password_confirmation"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="biography">Biography</label>
            <textarea
              class="form-control"
              id="biography"
              rows="5"
              placeholder="Your biography here..."
              v-model="biography"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="facebookUrl">Facebook URL</label>
            <input
              type="text"
              class="form-control"
              id="facebookUrl"
              v-model="facebookUrl"
              placeholder="Facebook URL"
            />
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="twitterUrl">Twitter URL</label>
            <input
              type="text"
              class="form-control"
              id="twitterUrl"
              v-model="twitterUrl"
              placeholder="Twitter URL"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="instagramUrl">Instagram URL</label>
            <input
              type="text"
              class="form-control"
              id="instagramUrl"
              v-model="instagramUrl"
              placeholder="Instagram URL"
            />
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="linkedinUrl">Instaram URL</label>
            <input
              type="text"
              class="form-control"
              id="linkedinUrl"
              v-model="linkedinUrl"
              placeholder="Instaram URL"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="youtubeUrl">Youtube URL</label>
            <input
              type="text"
              class="form-control"
              id="youtubeUrl"
              v-model="youtubeUrl"
              placeholder="Youtube URL"
            />
          </div>
        </div>
        <div class="col">
          <button type="submit" class="btn btn-success mt-4" :disabled="!valid">
            <Spinner v-if="updateLoading" />Update Profile
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Helper from "~/helpers/common";
import Spinner from "~/components/Spinner";

export default {
  layout: "dashboard",
  components: { Spinner },
  auth: true,
  data() {
    return {
      avatarPreview: this.$auth.user.avatar,
      updateLoading: false,
      superAdmin: false,

      fullname: null,
      email: null,
      password: null,
      password_confirmation: null,
      avatar: null,
      biography: null,
      facebookUrl: null,
      twitterUrl: null,
      instagramUrl: null,
      linkedinUrl: null,
      youtubeUrl: null
    };
  },

  async asyncData({ $auth, params, error }) {
    if (
      $auth.user.roles &&
      $auth.user.roles.find(role => role.name.toLowerCase() === "superadmin")
    )
      error({ statusCode: 404 });
  },

  created() {
    this.avatar = Helper.nullOrVal(null);
    this.fullname = Helper.nullOrVal(this.$auth.user.name);
    this.email = Helper.nullOrVal(this.$auth.user.email);
    if (this.$auth.user.info) {
      this.biography = Helper.nullOrVal(this.$auth.user.info.bio);
      this.facebookUrl = Helper.nullOrVal(this.$auth.user.info.facebook);
      this.twitterUrl = Helper.nullOrVal(this.$auth.user.info.twitter);
      this.instagramUrl = Helper.nullOrVal(this.$auth.user.info.instagram);
      this.linkedinUrl = Helper.nullOrVal(this.$auth.user.info.linkedin);
      this.youtubeUrl = Helper.nullOrVal(this.$auth.user.info.youtube);
    }
  },

  methods: {
    openFileUploadDialog() {
      this.$refs.fileUpload.click();
    },

    handleFileUpload(e) {
      console.log(e);
      if (e.target.files && e.target.files[0]) {
        this.avatar = e.target.files[0];
        var reader = new FileReader();
        reader.onload = e => {
          this.avatarPreview = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    },

    fetchUserProfile() {},

    updateProfile(e) {
      e.preventDefault();
      let fd = new FormData();
      fd.append("name", this.fullname);
      if (this.password) fd.append("password", this.password);
      if (this.biography) fd.append("bio", this.biography);
      if (this.avatar) fd.append("avatar", this.avatar);
      if (this.linkedinUrl) fd.append("linkedin", this.linkedinUrl);
      if (this.facebookUrl) fd.append("facebook", this.facebookUrl);
      if (this.twitterUrl) fd.append("twitter", this.twitterUrl);
      if (this.youtubeUrl) fd.append("youtube", this.youtubeUrl);
      if (this.instagramUrl) fd.append("instagram", this.instagramUrl);

      this.updateLoading = true;
      this.$axios
        .post("/profile/edit", fd)
        .then(response => {
          this.$toast.show(response.data.message);
          this.updateLoading = false;
        })
        .catch(error => {
          Helper.displayError(this.$toast, error);
          this.updateLoading = false;
        });
    }
  },

  computed: {
    valid() {
      return (
        (this.fullname && this.fullname.length) ||
        (this.password &&
          this.password.length &&
          this.password_confirmation &&
          this.password_confirmation.length &&
          this.password_confirmation === this.password)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/profile.scss";
</style>
