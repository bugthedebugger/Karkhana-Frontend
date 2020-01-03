<template>
  <section class="slides">
    <VueSlickCarousel v-bind="sliderSettings" ref="carousel">
      <div class="slide" v-for="(slide, index) in slides" :key="index">
        <h1 class="slide-title">{{slide.title}}</h1>
        <img class="slide-image" :src="slide.image" />
        <button class="btn btn-primary btn-cta slide-cta">{{slide.cta}}</button>
      </div>
    </VueSlickCarousel>

    <div class="slider-arrow arrow-prev" @click="prev">
      <i class="fas fa-chevron-left"></i>
    </div>
    <div class="slider-arrow arrow-next" @click="next">
      <i class="fas fa-chevron-right"></i>
    </div>
  </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

// import style
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "HomeSlider",
  components: { VueSlickCarousel },
  data() {
    return {
      sliderSettings: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      },
      slides: [
        {
          title: "The best way to predict the future is to invent it.",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
          cta: "Discover classes"
        },
        {
          title: "Some other quote here...",
          image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
          cta: "Find more"
        }
      ]
    };
  },
  methods: {
    next() {
      this.$refs.carousel.next();
    },
    prev() {
      this.$refs.carousel.prev();
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/components/_home_slider.scss";
</style>