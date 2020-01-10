<template>
  <section class="about-history">
    <div class="active-history" :style="'background-image: url(' + activeSlide.image + ')'"></div>
    <div class="history-list">
      <VueSlickCarousel v-bind="sliderSettings" ref="carousel" @beforeChange="handleChange">
        <div class="history-list-item" v-for="(slide, index) in slides" :key="index">
          <p class="date">
            <span class="month">{{slide.date.month}}</span>
            <span class="year">{{slide.date.year}}</span>
          </p>
          <p class="title">{{slide.title}}</p>
        </div>
      </VueSlickCarousel>
    </div>
  </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "AboutHistory",
  components: { VueSlickCarousel },
  data() {
    return {
      sliderSettings: {
        dots: false,
        focusOnSelect: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow: false,
        nextArrow: false,
        swipeToSlide: true,
        touchMove: true,
        draggable: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 660,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 570,
            settings: {
              slidesToShow: 1
            }
          }
        ]
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
          image: "https://i.imgur.com/jGBNTLO.jpg",
          date: {
            month: "Dec",
            year: 2007
          }
        },
        {
          title: "Shifted to a new building",
          image: "https://i.imgur.com/jGBNTLO.jpg",
          date: {
            month: "Apr",
            year: 2010
          }
        },
        {
          title: "Bibhuti joined the company",
          image: "https://i.imgur.com/jGBNTLO.jpg",
          date: {
            month: "Feb",
            year: 2012
          }
        }
      ],
      activeSlide: null
    };
  },
  created(){
    this.activeSlide = this.slides[0];
  },
  methods: {
    handleChange(oldIndex, newIndex) {
      this.activeSlide = this.slides[newIndex];
      console.log(newIndex);
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/components/_about_history.scss";
</style>