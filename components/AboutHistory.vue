<template>
  <section class="about-history">
    <VueSlickCarousel
      v-bind="activeHistorySettings"
      ref="active_history"
      @beforeChange="(p1, p2) => setActiveSlide(p2)"
    >
      <div v-for="(slide, index) in slides" :key="index" class="active-history">
        <div class="slide-image" :style="'background-image: url(' + slide.image + ')'"></div>
      </div>
    </VueSlickCarousel>

    <div class="container">
      <div class="history-list" ref="slider">
        <div
          class="history-list-item"
          :class="{'history-list-item-active': activeSlide === slide}"
          v-for="(slide, index) in slides"
          :key="index"
          @click="setActiveSlide(index)"
          :ref="'slider_' + index"
        >
          <p class="date">
            <span class="month">{{slide.date.month}}</span>
            <span class="year">{{slide.date.year}}</span>
          </p>
          <p class="title">{{slide.title}}</p>
        </div>
        <div class="history-list-item-spacer"></div>
      </div>
    </div>
  </section>
</template>

<script>
import anime from "animejs/lib/anime.min.js";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  name: "AboutHistory",
  components: { VueSlickCarousel },
  data() {
    return {
      activeHistorySettings: {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      },

      slides: [
        {
          title: "Karkhana was established",
          image: "https://i.imgur.com/jGBNTLO.jpg",
          date: {
            month: "Jan",
            year: 2002
          }
        },
        {
          title: "Started teaching at school",
          image: "https://images.unsplash.com/photo-1502085671122-2d218cd434e6",
          date: {
            month: "Apr",
            year: 2003
          }
        },
        {
          title: "Beecreative campaign started",
          image: "https://images.unsplash.com/photo-1527168027773-0cc890c4f42e",
          date: {
            month: "Aug",
            year: 2005
          }
        },
        {
          title: "Made 10 partners",
          image: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2",
          date: {
            month: "Dec",
            year: 2007
          }
        },
        {
          title: "Shifted to a new building",
          image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a",
          date: {
            month: "Apr",
            year: 2010
          }
        },
        {
          title: "Bibhuti joined the company",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
          date: {
            month: "Feb",
            year: 2012
          }
        }
      ],
      activeSlide: null,
      imageLoading: false
    };
  },
  created() {
    this.activeSlide = this.slides[0];
  },

  mounted() {
    // this.setScrollFunctionality();
  },

  methods: {
    setScrollFunctionality() {
      const slider = this.$refs.slider;
      let isDown = false;
      let startX;
      let scrollLeft;

      function handleDown(e) {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      }

      function handleLeave(e) {
        isDown = false;
      }

      function handleUp(e) {
        isDown = false;
      }

      function handleMove(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      }

      slider.addEventListener("mousedown", handleDown);
      slider.addEventListener("mouseleave", handleLeave);
      slider.addEventListener("mouseup", handleUp);
      slider.addEventListener("mousemove", handleMove);
      slider.addEventListener("touchstart", handleDown);
      slider.addEventListener("touchleave", handleLeave);
      slider.addEventListener("touchend", handleUp);
      slider.addEventListener("touchmove", handleMove);
    },

    setActiveSlide(index) {
      this.activeSlide = this.slides[index];
      this.$refs.active_history.goTo(index);

      let currentSL = this.$refs.slider.scrollLeft;
      let targetSL = this.$refs["slider_" + index][0].offsetLeft;
      let obj = { scroll: currentSL };
      anime({
        targets: obj,
        scroll: targetSL,
        round: 1,
        duration: 500,
        easing: "cubicBezier(.5, .05, .1, .3)",
        update: () => {
          this.$refs.slider.scrollLeft = obj.scroll;
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/components/_about_history.scss";
</style>