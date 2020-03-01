<template>
  <div class="background">
    <div v-if="!showRegisterForm" class="card complete-registration-card text-center">
      <div class="logo ml-auto mr-auto">
        <img src="/images/logo-nav.png" />
      </div>
      <div class="gap"></div>
      <h5 class="title">Registration for Blog</h5>
      <div class="gap"></div>
      <p class="description">
        Welcome to Karkhana Blog. Your email has been successfully registered into our system.
        Please click on the button below and complete your registration.
      </p>
      <div class="gap"></div>
      <button class="btn btn-success" @click="showRegisterForm = true">
        <i class="fal fa-user-plus mr-2"></i>
        Complete Registration
      </button>
    </div>

    <div v-else class="card registration-card">
      <div class="row">
        <div class="col-md-4">
          <div class="logo ml-auto mr-auto">
            <img src="/images/logo-nav.png" />
          </div>
          <img class="register-image align-self-center" src="/images/register-image.png" />
        </div>
        <div class="col-md-8">
          <form @submit="register">
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
                <button type="submit" class="btn btn-success" :disabled="!valid">
                  <Spinner v-if="registerLoading" />Complete Registration
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "~/components/Spinner";

export default {
  auth: false,
  components: { Spinner },

  data() {
    return {
      showRegisterForm: false,
      avatarPreview: null,
      registerLoading: false,

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

  async asyncData({ $axios, params, error }) {
    try {
      const response = await $axios.get(
        `/register/check/${params.register_token}`
      );
    } catch (e) {
      error({ statusCode: 404 });
    }
  },

  async created() {},

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

    async register(e) {
      e.preventDefault();
      let fd = new FormData();
      fd.append("token", this.$route.params.register_token);
      fd.append("name", this.fullname);
      fd.append("password", this.password);
      fd.append("bio", this.biography);
      fd.append("avatar", this.avatar);
      fd.append("linkedin", this.linkedinUrl);
      fd.append("facebook", this.facebookUrl);
      fd.append("twitter", this.twitterUrl);
      fd.append("youtube", this.youtubeUrl);
      fd.append("instagram", this.instagramUrl);

      this.registerLoading = true;
      this.$axios
        .post("/register", fd)
        .then(response => {
          this.$auth.setUserToken(response.data.data.token).then(() => {
            this.registerLoading = false;
            this.$router.push({
              path: "/dashboard"
            });
          });
        })
        .catch(error => {
          this.displayError(error);
        });
    },

    displayError(errorObj) {
      if (errorObj.response.data.message) {
        this.$toast.show(errorObj.response.data.message);
      } else {
        let errors = Object.values(errorObj.response.data);
        errors.forEach(error => this.$toast.show(error));
      }
    }
  },

  computed: {
    valid() {
      return (
        this.fullname &&
        this.fullname.length &&
        this.password &&
        this.password.length &&
        this.password_confirmation &&
        this.password_confirmation.length &&
        this.password_confirmation === this.password
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/register_token.scss";
</style>
