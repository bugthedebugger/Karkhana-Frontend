<template>
  <section class="about-employees">
    <div class="container mt-5">
      <div class="team-members">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="selected-employee">
                <div class="image-circle-background"></div>
                <img :src="activeEmployee.image" class="employee-image" />
              </div>
            </div>
            <div class="col">
              <div class="person-description">
                <p class="designation">{{activeEmployee.designation}}</p>
                <p class="name">{{activeEmployee.name}}</p>
                <p class="quote">{{activeEmployee.quote}}</p>
                <div class="row">
                  <div class="col">
                    <p class="characteristics-title">SKILLS</p>
                    <ul class="no-bullets characteristics-list">
                      <li v-for="skill in activeEmployee.skills" :key="skill">{{skill}}</li>

                      <li class="social-links">
                        <a :href="activeEmployee.socialLinks.facebook">
                          <i class="fab fa-facebook"></i>
                        </a>
                        <a :href="activeEmployee.socialLinks.twitter">
                          <i class="fab fa-twitter"></i>
                        </a>
                        <a :href="activeEmployee.socialLinks.instagram">
                          <i class="fab fa-instagram"></i>
                        </a>
                        <a :href="activeEmployee.socialLinks.email">
                          <i class="fal fa-envelope"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="col">
                    <p class="characteristics-title">BACKGROUND</p>
                    <ul class="no-bullets characteristics-list">
                      <li
                        v-for="background in activeEmployee.backgrounds"
                        :key="background"
                      >{{background}}</li>
                    </ul>
                  </div>
                  <div class="col"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Employees carousel -->
      </div>
      <div class="employee-list">
        <VueSlickCarousel
          v-bind="employeesSliderSettings"
          @beforeChange="(p1, p2) => setActiveEmployee(p2)"
        >
          <div v-for="(employee, index) in employees" :key="index" class="employee-list-item">
            <div class="employee-image" :style="'background-image: url(' + employee.image + ')'"></div>
          </div>
        </VueSlickCarousel>
      </div>
      <br />
      <br />
    </div>
  </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  name: "AboutEmployees",
  components: { VueSlickCarousel },
  data() {
    return {
      employeesSliderSettings: {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
      },

      employees: [
        {
          name: "Pavitra Gautam",
          designation: "Cheaf Executive Officer",
          quote:
            "<< I am pretty sure cheese is the greatest invention in history >>",
          image:
            "https://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/people19.png",
          skills: [
            "Leadership",
            "Marketing",
            "Public Relations",
            "Making Coffee"
          ],
          backgrounds: ["Electrical Eng.(TU)", "Nepal Robotocs Association"],
          socialLinks: {
            facebook: "",
            twitter: "",
            email: "",
            instagram: ""
          }
        }
      ],
      activeEmployee: null
    };
  },
  created() {
    this.activeEmployee = this.employees[0];
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="scss">
@import "@/styles/components/_about_employees.scss";
</style>