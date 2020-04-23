<template>
  <div>
    <div class="d-flex">
      <div class="dashboard-content flex-grow-1">
        <div class="toolbar d-flex mb-4 mt-4">
          <h1 class="title mb-4">Contacts Page</h1>

          <div class="ml-auto">
            <button
              class="btn btn-primary btn-sm mr-2"
              @click="save()"
              :disabled="saveLoading || !valid()"
            >
              <Spinner v-if="saveLoading" />Save
            </button>
            <nuxt-link to="/dashboard/pages" class="btn btn-secondary btn-sm">Cancel</nuxt-link>
          </div>
        </div>

        <div class="container-card mt-0">
          <div v-if="contactData">
            <!-- Language -->
            <div class="language mb-4">
              <h5>Language</h5>
              <select class="form-control" v-model="contactData.language" @change="fetchData()">
                <option
                  v-for="language in languages"
                  :value="language.code"
                  :key="language.code"
                >{{language.name}}</option>
              </select>
            </div>

            <!-- Edit -->
            <div class="row">
              <div class="col">
                <label>Email *</label>
                <input
                  type="email"
                  class="form-control mb-1"
                  placeholder="Email"
                  v-model="contactData.email"
                />
              </div>
            </div>

            <!-- Address && Phone -->
            <div class="row">
              <div class="col">
                <label>Address *</label>
                <input
                  type="text"
                  class="form-control mb-1"
                  placeholder="Address"
                  v-model="contactData.address"
                />
              </div>
              <div class="col">
                <label>Phone *</label>
                <input
                  type="text"
                  class="form-control mb-1"
                  placeholder="Phone"
                  v-model="contactData.phone"
                />
              </div>
            </div>

            <!-- Open Hours && Days -->
            <div class="row">
              <div class="col">
                <label>Open days *</label>
                <input
                  type="text"
                  class="form-control mb-1"
                  placeholder="Open days"
                  v-model="contactData.open_days"
                />
              </div>
              <div class="col">
                <label>Open Hours *</label>
                <input
                  type="text"
                  class="form-control mb-1"
                  placeholder="Open Hours"
                  v-model="contactData.open_hours"
                />
              </div>
            </div>
          </div>

          <div v-else>
            <Loading />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "~/components/Loading";
import Spinner from "~/components/Spinner";
import Gallery from "~/components/Dashboard/Gallery";
import ProductInput from "~/components/Dashboard/ProductInput";
import TextArea from "~/components/core/TextArea";

export default {
  layout: "dashboard",
  auth: true,
  components: {
    Loading,
    Spinner,
    Gallery,
    ProductInput,
    TextArea
  },
  data() {
    return {
      saveLoading: false,
      languages: null,
      contactData: null
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.$axios.get("/pages/contact").then(response => {
        this.$axios.get("/languages").then(response2 => {
          this.loading = false;
          this.languages = response2.data.data;
          this.contactData = response.data.data;
          this.correctData();
        });
      });
    },

    save() {
      this.saveLoading = true;
      this.$axios
        .post("/admin/pages/contact/update", this.generateResponse())
        .then(response => {
          this.saveLoading = false;
          this.$toast.show("Saved");
        });
    },

    correctData() {
      delete this.contactData["header"];

      let resp = JSON.parse(JSON.stringify(this.contactData));
      Object.keys(resp).forEach(key => {
        if (key !== "language") resp[key] = resp[key] ? resp[key].label : null;
      });

      this.contactData = resp;
    },

    generateResponse() {
      let resp = JSON.parse(JSON.stringify(this.contactData));
      Object.keys(resp).forEach(key => {
        if (key !== "language") resp[key] = { label: resp[key] };
      });
      return resp;
    },

    valid() {
      return (
        this.contactData &&
        this.contactData.address &&
        this.contactData.open_hours &&
        this.contactData.open_days &&
        this.contactData.phone &&
        this.contactData.email &&
        this.contactData.language
      );
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
