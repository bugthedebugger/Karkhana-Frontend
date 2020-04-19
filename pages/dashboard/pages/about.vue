<template>
  <div class>
    <div class="d-flex">
      <div class="dashboard-content flex-grow-1">
        <div class="toolbar d-flex mb-4 mt-4">
          <h1 class="title mb-4">About Page</h1>

          <div class="ml-auto">
            <button class="btn btn-primary btn-sm mr-2" @click="save()" :disabled="saveLoading">
              <Spinner v-if="saveLoading" />Save
            </button>
            <nuxt-link to="/dashboard/pages" class="btn btn-secondary btn-sm">Cancel</nuxt-link>
          </div>
        </div>

        <div class="container-card mt-0">
          <div v-if="aboutData.sections">
            <!-- Language -->
            <div class="language mb-4">
              <h5>Language</h5>
              <select class="form-control" v-model="aboutData.language">
                <option
                  v-for="language in languages"
                  :value="language.code"
                  :key="language.code"
                >{{language.name}}</option>
              </select>
            </div>

            <!-- Head Section -->
            <div class="about mb-4">
              <h5>Head Section</h5>
              <div class="row">
                <div class="col">
                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Title"
                    v-model="aboutData.sections.head_section.title"
                  />

                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Subtext"
                    v-model="aboutData.sections.head_section.sub_text"
                  />

                  <!-- <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Brand Video"
                    v-model="aboutData.sections.head_section.brand_video"
                  />-->
                </div>
              </div>
            </div>

            <!-- Karkhana Building -->
            <div class="about mb-4">
              <h5>Karkhana Building</h5>
              <div class="row">
                <div class="col">
                  <GalleryImageInput
                    id="k-building"
                    :value="aboutData.sections.karkhana_building.path"
                    v-model="aboutData.sections.karkhana_building.path"
                    image_class="karkhana-building-image"
                  />
                </div>
              </div>
            </div>

            <!-- Mission/Vision -->
            <div class="about mb-4">
              <h5>Mission/Vision</h5>
              <div class="row">
                <div class="col">
                  <h6>Vision</h6>
                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Title"
                    v-model="aboutData.sections.mission_vision.vision.title"
                  />

                  <TextArea
                    id="vision-text"
                    placeholder="Vision text"
                    rows="4"
                    :maxlength="10"
                    v-model="aboutData.sections.mission_vision.vision.text"
                  />
                </div>

                <div class="col">
                  <h6>Mission</h6>
                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Title"
                    v-model="aboutData.sections.mission_vision.mission.title"
                  />

                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Sub Text"
                    v-model="aboutData.sections.mission_vision.mission.sub_text"
                  />

                  <TextArea
                    id="mission-text"
                    placeholder="Mission text"
                    rows="4"
                    :maxlength="10"
                    v-model="aboutData.sections.mission_vision.mission.text"
                  />
                </div>
              </div>
            </div>

            <!-- Values -->
            <div class="about mb-4">
              <h5>Values</h5>
              <AboutValuesInput
                v-model="aboutData.sections.values"
                :_value="aboutData.sections.values"
              />
            </div>

            <!-- Team -->
            <div class="about mb-4">
              <h5>Team</h5>

              <div class="row">
                <div class="col">
                  <h6>General Info</h6>
                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Title"
                    v-model="aboutData.sections.team.title"
                  />

                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Sub title"
                    v-model="aboutData.sections.team.sub_title"
                  />

                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Sub text"
                    v-model="aboutData.sections.team.sub_text"
                  />

                  <TextArea
                    id="vision-text"
                    placeholder="Text"
                    rows="6"
                    :maxlength="100"
                    v-model="aboutData.sections.team.text"
                  />
                </div>
                <div class="col">
                  <h6>Employees</h6>

                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Label"
                    v-model="aboutData.sections.team.employees.label"
                  />

                  <input
                    type="text"
                    class="form-control mb-1"
                    placeholder="Count"
                    v-model="aboutData.sections.team.employees.count"
                  />

                  <div class="mt-4"></div>
                  <h6>Team Image</h6>
                  <GalleryImageInput
                    id="team-image"
                    :value="aboutData.sections.team.team_photo.path"
                    v-model="aboutData.sections.team.team_photo.path"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <Loading />
          </div>
        </div>
      </div>

      <div class="ml-2 p-4 pl-2">
        <Gallery pageCode="about" @newImage="fetchData()" />
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "~/components/Loading";
import Spinner from "~/components/Spinner";
import Gallery from "~/components/Dashboard/Gallery";
import AboutValuesInput from "~/components/Dashboard/AboutValuesInput";
import GalleryImageInput from "~/components/Dashboard/GalleryImageInput";
import TextArea from "~/components/core/TextArea";

export default {
  layout: "dashboard",
  auth: true,
  components: {
    Loading,
    Spinner,
    Gallery,
    AboutValuesInput,
    GalleryImageInput,
    TextArea
  },
  data() {
    return {
      saveLoading: false,
      languages: null,
      galleryImages: null,
      aboutData: {
        language: "en",
        sections: null
      }
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$axios.get("/pages/about").then(response => {
        this.$axios.get("/languages").then(response2 => {
          this.$axios.get("/admin/media/about").then(response3 => {
            this.galleryImages = response3.data.data;
            this.loading = false;
            this.languages = response2.data.data;
            this.aboutData.sections = response.data.data;
            this.correctData();
          });
        });
      });
    },

    save() {
      this.saveLoading = true;
      this.$axios
        .post("/admin/pages/about/update", this.generateResponse())
        .then(response => {
          this.saveLoading = false;
          this.$toast.show("Saved");
        });
    },

    correctData() {
      delete this.aboutData.sections.head_section["brand_video"];
      delete this.aboutData.sections.karkhana_building["url"];
      delete this.aboutData.sections.team.team_photo["url"];
    },

    generateResponse() {
      let resp = JSON.parse(JSON.stringify(this.aboutData));

      // Karkhana building
      if (resp.sections.karkhana_building) {
        // Object.keys(resp.sections.karkhana_building).some(key => {
        //   if (!resp.sections.karkhana_building[key]) {
        //     resp.sections.karkhana_building = null;
        //     return true;
        //   }
        // });
        if (this.hasNullValue(resp.sections.karkhana_building))
          resp.sections.karkhana_building = null;
      }

      // Head Section
      if (resp.sections.head_section) {
        // Object.keys(resp.sections.head_section).some(key => {
        //   if (!resp.sections.head_section[key]) {
        //     resp.sections.head_section = null;
        //     return true;
        //   }
        // });
        if (this.hasNullValue(resp.sections.head_section))
          resp.sections.head_section = null;
      }

      // Mission Vision
      if (resp.sections.mission_vision) {
        // Object.keys(resp.sections.partners).some(key => {
        //   if (!resp.sections.partners[key]) {
        //     resp.sections.partners = null;
        //     return true;
        //   }
        // });
        if (this.hasNullValue(resp.sections.mission_vision))
          resp.sections.mission_vision = null;
      }

      // Values
      if (resp.sections.values) {
        if (this.hasNullValue(resp.sections.values))
          resp.sections.values = null;
      }

      if (resp.sections.team) {
        if (this.hasNullValue(resp.sections.team)) resp.sections.team = null;
      }

      return resp;
    },

    hasNullValue(obj) {
      let keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (obj[key] === null) return true;
        else if (obj[key] instanceof Object) return this.hasNullValue(obj[key]);
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "@/styles/pages/_dashboard_blogs.scss";7
.karkhana-building-image {
  width: 400px;
  height: 200px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px dashed black;
  background-color: whitesmoke;
  border-radius: 10px;
  cursor: pointer;
}
</style>
