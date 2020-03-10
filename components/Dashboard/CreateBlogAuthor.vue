<template>
  <div>
    <div class="row">
      <div class="col-6">
        <div class="form-group mb-4">
          <label>Author</label>
          <br />
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-sm"
              :class="{'btn-primary': value === selectedMode}"
              v-for="(value, key, index) in modes"
              :key="index"
              @click="setAuthorMode(value)"
            >
              <i
                :class="{'fal fa-circle': selectedMode !== value, 'fal fa-dot-circle': selectedMode === value}"
              ></i>
              {{value}}
            </button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div v-if="selectedMode === modes.ANOTHER_USER">
          <div class="form-group mb-4">
            <label>Pick a user</label>
            <select class="form-control" @change="(e) => sendAuthorChanged('author', e)">
              <option
                v-for="author in authors"
                :value="author.id"
                :selected="author.id == selectedAuthor"
                :key="author.id"
              >{{author.name}}</option>
            </select>
          </div>
        </div>

        <div v-if="selectedMode === modes.GUEST_BLOGGER">
          <div class="d-flex">
            <div class="form-group mb-4 mr-4">
              <label>Pick a Guest Blogger</label>
              <select class="form-control" @change="(e) => sendAuthorChanged('guest', e)">
                <option
                  v-for="guestBlogger in guestBloggers"
                  :value="guestBlogger.id"
                  :key="guestBlogger.id"
                >{{guestBlogger.name}}</option>
              </select>
            </div>
            <button
              type="button"
              class="btn btn-success align-self-center"
              data-toggle="modal"
              data-target="#createGuestBloggerModal"
            >Create New</button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="createGuestBloggerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="createGuestBloggerModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <p class="lead">Create a New Guest Blogger</p>

            <form @submit="registerGuest">
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

                  <div class="form-group">
                    <label for="fullname">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="email"
                      placeholder="Email address"
                    />
                  </div>

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
                <div class="col">
                  <!-- Facebook -->
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

                  <div class="form-group">
                    <label for="linkedinUrl">Linkedin URL</label>
                    <input
                      type="text"
                      class="form-control"
                      id="linkedinUrl"
                      v-model="linkedinUrl"
                      placeholder="Linkedin URL"
                    />
                  </div>

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
  </div>
</template>

<script>
import Spinner from "~/components/Spinner";

export default {
  name: "CreateBlogAuthor",
  props: ["author", "_author_type"],
  components: {
    Spinner
  },

  data() {
    return {
      modes: {
        MYSELF: "Myself",
        ANOTHER_USER: "Another User",
        GUEST_BLOGGER: "Guest Blogger"
      },
      selectedMode: null,
      selectedAuthor: null,
      authors: null,
      guestBloggers: null,

      avatarPreview: null,
      registerLoading: false,
      fullname: null,
      email: null,
      biography: null,
      avatar: null,
      facebookUrl: null,
      twitterUrl: null,
      instagramUrl: null,
      linkedinUrl: null,
      youtubeUrl: null
    };
  },

  created() {
    this.selectedMode = this.modes.MYSELF;
    this.fetchAuthors(() => {
      this.fetchGuestBloggers(() => {
        if (this._author_type == "myself")
          this.selectedMode = this.modes.MYSELF;
        else if (this._author_type == "author")
          this.selectedMode = this.modes.ANOTHER_USER;
        else if (this._author_type == "guest")
          this.selectedMode = this.modes.GUEST_BLOGGER;
        this.selectedAuthor = this.author;
      });
    });
  },

  methods: {
    fetchAuthors(callback) {
      this.$axios.get("/admin/users/registered").then(response => {
        this.authors = response.data.data.users;
        if (callback) callback();
      });
    },

    fetchGuestBloggers(callback) {
      this.$axios.get("/guests").then(response => {
        this.guestBloggers = response.data.data;
        if (callback) callback();
      });
    },

    openFileUploadDialog() {
      this.$refs.fileUpload.click();
    },

    handleFileUpload(e) {
      if (e.target.files && e.target.files[0]) {
        this.avatar = e.target.files[0];
        var reader = new FileReader();
        reader.onload = e => {
          this.avatarPreview = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    },

    registerGuest(e) {
      e.preventDefault();
      let fd = new FormData();

      fd.append("name", this.fullname);
      fd.append("email", this.email);
      fd.append("bio", this.biography);
      fd.append("avatar", this.avatar);
      fd.append("linkedin", this.linkedinUrl);
      fd.append("facebook", this.facebookUrl);
      fd.append("twitter", this.twitterUrl);
      fd.append("youtube", this.youtubeUrl);
      fd.append("instagram", this.instagramUrl);

      this.registerLoading = true;
      this.$axios
        .post("/admin/guest/register", fd)
        .then(response => {
          this.fetchGuestBloggers();
          $("#createGuestBloggerModal").modal("hide");
        })
        .catch(error => {
          this.displayError(error);
          this.registerLoading = false;
        });
    },

    setAuthorMode(value) {
      this.selectedMode = value;
      if (this.selectedMode === this.modes.MYSELF)
        this.$emit("authorChanged", {
          type: "myself"
        });
    },

    sendAuthorChanged(type, event) {
      this.$emit("authorChanged", {
        type,
        id: event.target.value
      });
    }
  },

  computed: {
    valid() {
      return this.fullname && this.fullname.length && this.avatar;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/dashboard/_create_blog_author.scss";
</style>