<template>
  <section class="about-main">
    <div class="karkhana-team">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <h1 class="title">{{vod(head_section.title, dv.head_section.title)}}</h1>
            <p class="description">{{vod(head_section.sub_text,dv.head_section.sub_text) }}</p>
          </div>
          <div class="col-md-6 col-sm-12">
            <div v-if="!showVideo" class="ml-auto about-video-thumbnail">
              <i class="fal fa-play-circle play cursor-pointer" @click="showVideo = true"></i>
              <div class="about-video-thumbnail-overlay"></div>
            </div>

            <div v-else class="video-wrapper">
              <img class="k-loading" src="/images/k-loading.gif" />
              <iframe
                :src="'https://www.youtube.com/embed/' + vod(head_section.brand_video, dv.head_section.brand_video) + '?autoplay=1'"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="red-wave"></div>

    <div class="company-ethics">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card">
              <img
                class="card-img-top"
                :src="vod(karkhana_building.path, dv.karkhana_building.path)"
              />
              <div class="card-body">
                <h2
                  class="title"
                >{{vod(mission_vision.vision.title, dv.mission_vision.vision.title)}}</h2>
                <p
                  class="content"
                >{{vod(mission_vision.vision.text, dv.mission_vision.vision.text)}}</p>

                <div class="d-none d-md-block pb-4"></div>

                <h2
                  class="title"
                >{{vod(mission_vision.mission.title, dv.mission_vision.mission.title)}}</h2>
                <h3
                  class="subtitle"
                >{{vod(mission_vision.mission.sub_text, dv.mission_vision.mission.sub_text)}}</h3>
                <div class="d-none d-md-block pb-3"></div>
                <p
                  class="content"
                >{{vod(mission_vision.mission.text, dv.mission_vision.mission.text)}}</p>
              </div>
            </div>
          </div>
          <div class="col d-none d-md-block">
            <div class="more-content">
              <h2 class="title mb-5">{{vod(values.title, dv.values.title)}}</h2>
              <div v-for="(value, index) in vod(values.values, dv.values.values)" :key="index">
                <h3 class="subtitle">{{value.title}}</h3>
                <p class="content">{{value.text}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DefaultValue from "~/helpers/default-values";

export default {
  name: "AboutMain",
  data() {
    return {
      showVideo: false
    };
  },
  props: ["head_section", "mission_vision", "values", "karkhana_building"],
  methods: {
    // value or default
    vod(val, def) {
      return val ? val : def;
    }
  },

  computed: {
    dv() {
      return DefaultValue.about;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_about_main.scss";
</style>