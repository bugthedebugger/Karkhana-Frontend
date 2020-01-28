<template>
  <section class="about-employees">
    <div class="container mt-5 position-relative">
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
        <div class="scroll-stat">
          <span class="current-employee">0{{employees.indexOf(activeEmployee) + 1}}</span>
          /
          0{{employees.length}}
        </div>
      </div>

      <!-- Employees carousel -->
      <perfect-scrollbar class="employees-list-wrapper">
        <div class="employee-list">
          <div
            v-for="(employee, index) in employees"
            :key="index"
            class="employee-list-item"
            :class="{'employee-list-item-selected': employee === activeEmployee}"
            @click="setActiveEmployee(index)"
          >
            <div class="employee-image" :style="'background-image: url(' + employee.image + ')'"></div>
          </div>
        </div>
      </perfect-scrollbar>
    </div>
  </section>
</template>

<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

export default {
  name: "AboutEmployees",
  components: { PerfectScrollbar },
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
        },
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
        },
        {
          name: "Aakash Raj Dahal",
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
        },
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
        },
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
        },
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
        },
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

  methods: {
    setActiveEmployee(index) {
      this.activeEmployee = this.employees[index];
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/components/_about_employees.scss";
</style>