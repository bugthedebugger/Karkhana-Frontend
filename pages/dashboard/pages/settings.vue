<template>
  <div class>
    <div class="d-flex">
      <div class="dashboard-content flex-grow-1">
        <div class="toolbar d-flex mb-4 mt-4">
          <h1 class="title mb-4">Site Settings</h1>

          <div class="ml-auto">
            <button class="btn btn-primary btn-sm mr-2" @click="save()" :disabled="saveLoading">
              <Spinner v-if="saveLoading" />Save
            </button>
            <nuxt-link to="/dashboard/pages" class="btn btn-secondary btn-sm">Cancel</nuxt-link>
          </div>
        </div>

        <div class="container-card mt-0 page-form">
          <div v-if="settingsData">
            <!-- Logo -->
            <div class="mb-4 text-center">
              <label>Logo</label>
              <div class="row">
                <div class="col d-flex justify-content-center">
                  <GalleryImageInput
                    ref="logoInput"
                    id="k-logo"
                    page_code="settings"
                    :value="settingsData.logo"
                    v-model="settingsData.logo"
                    :get_path="true"
                  />
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    class="form-control mb-1"
                    placeholder="Email"
                    v-model="settingsData.email"
                  />
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="location">Location</label>
                  <input
                    id="location"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Location"
                    v-model="settingsData.location"
                  />
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label for="geo-location">Geo Location</label>
                  <input
                    id="geo-location"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Geo Location"
                    v-model="settingsData.geo_location"
                  />
                </div>
              </div>
            </div>

            <!-- Phone & Mobile -->
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="phone">Phone No.</label>
                  <input
                    id="phone"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Phone No"
                    v-model="settingsData.phone"
                  />
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label for="phone">Mobile</label>
                  <input
                    id="mobile"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Mobile"
                    v-model="settingsData.mobile"
                  />
                </div>
              </div>
            </div>

            <!-- Open Hours & Open Days -->
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="open-hours">Open Hours</label>
                  <input
                    id="open-hours"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Open Hours"
                    v-model="settingsData.open_hours"
                  />
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label for="open-days">Open Days</label>
                  <input
                    id="open-days"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Open Days"
                    v-model="settingsData.open_days"
                  />
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="facebook">Facebook</label>
                  <input
                    id="facebook"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Facebook"
                    v-model="settingsData.facebook"
                  />
                </div>

                <div class="form-group">
                  <label for="instagram">Instagram</label>
                  <input
                    id="instagram"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Instagram"
                    v-model="settingsData.instagram"
                  />
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label for="youtube">Youtube</label>
                  <input
                    id="youtube"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Youtube"
                    v-model="settingsData.youtube"
                  />
                </div>

                <div class="form-group">
                  <label for="youtube">Brand Video Link</label>
                  <input
                    id="brand_video"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Brand Video Link"
                    v-model="settingsData.brand_video"
                  />
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="students-reached">Students Reached</label>
                  <input
                    id="students-reached"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Students Reached"
                    v-model="settingsData.students_reached"
                  />
                </div>

                <div class="form-group">
                  <label for="employees">Employees</label>
                  <input
                    id="employees"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Employees"
                    v-model="settingsData.employees"
                  />
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label for="countries-we-work-in">Countries We Work In</label>
                  <input
                    id="countries-we-work-in"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Countries We Work In"
                    v-model="settingsData.countries_we_work_in"
                  />
                </div>

                <div class="form-group">
                  <label for="cities-we-work-in">Cities We Work In</label>
                  <input
                    id="cities-we-work-in"
                    type="text"
                    class="form-control mb-1"
                    placeholder="Cities We Work In"
                    v-model="settingsData.cities_we_work_in"
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
        <Gallery pageCode="settings" @newImage="fetchData()" />
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "~/components/Loading";
import Spinner from "~/components/Spinner";
import Gallery from "~/components/Dashboard/Gallery";
// import AboutValuesInput from "~/components/Dashboard/AboutValuesInput";
import GalleryImageInput from "~/components/Dashboard/GalleryImageInput";
// import TextArea from "~/components/core/TextArea";

export default {
  layout: "dashboard",
  auth: true,
  components: {
    Loading,
    Spinner,
    Gallery,
    GalleryImageInput
  },
  data() {
    return {
      saveLoading: false,
      settingsData: null
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$axios.get("/admin/settings").then(response => {
        if (response.data.data) this.settingsData = response.data.data;
        else {
          this.settingsData = {
            logo: null,
            phone: null,
            mobile: null,
            email: null,
            open_hours: null,
            open_days: null,
            instagram: null,
            facebook: null,
            youtube: null,
            location: null,
            geo_location: null,
            students_reached: null,
            employees: null,
            countried_we_work_in: null,
            cities_we_work_in: null,
            brand_video: null
          };
        }
      });
      if (this.$refs.logoInput) this.$refs.logoInput.fetchGalleryImages();
    },

    save() {
      this.saveLoading = true;
      this.$axios
        .post("/admin/settings/update", this.settingsData)
        .then(response => {
          this.saveLoading = false;
          this.$toast.show("Saved");
        });
    }

    // correctData() {
    //   delete this.aboutData.sections.head_section["brand_video"];
    //   delete this.aboutData.sections.karkhana_building["url"];
    //   delete this.aboutData.sections.team.team_photo["url"];
    // },

    // generateResponse() {
    //   let resp = JSON.parse(JSON.stringify(this.aboutData));

    //   // Karkhana building
    //   if (this.hasNullValue(resp.sections.karkhana_building))
    //     resp.sections.karkhana_building = null;

    //   // Head Section
    //   if (this.hasNullValue(resp.sections.head_section))
    //     resp.sections.head_section = null;

    //   // Mission Vision
    //   if (this.hasNullValue(resp.sections.mission_vision))
    //     resp.sections.mission_vision = null;

    //   // Values
    //   if (this.hasNullValue(resp.sections.values)) resp.sections.values = null;

    //   if (this.hasNullValue(resp.sections.team)) resp.sections.team = null;

    //   return resp;
    // },

    // hasNullValue(obj) {
    //   if (obj === null) return true;
    //   let keys = Object.keys(obj);
    //   for (let i = 0; i < keys.length; i++) {
    //     let key = keys[i];
    //     if (obj[key] === null) return true;
    //     else if (obj[key] instanceof Object) return this.hasNullValue(obj[key]);
    //   }
    //   return false;
    // }
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
