<template>
  <section class="about-employees">
    <div class="container mt-5 position-relative">
      <div class="team-members">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <div class="selected-employee">
                <div class="image-circle-background">
                  <img :src="activeEmployee.photo.path" class="employee-image" />
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12">
              <div class="person-description">
                <p class="designation">{{activeEmployee.post}}</p>
                <p class="name">{{activeEmployee.name}}</p>

                <p class="social-links d-block d-md-none text-center">
                  <a :href="activeEmployee.facebook">
                    <i class="fab fa-facebook"></i>
                  </a>
                  <a :href="activeEmployee.twitter">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a :href="activeEmployee.instagram">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a :href="activeEmployee.email">
                    <i class="fal fa-envelope"></i>
                  </a>
                </p>

                <!-- <p class="quote">{{activeEmployee.quote}}</p> -->
                <div class="row">
                  <div class="col">
                    <div class="details">{{employeeDetails}}</div>
                    <br />
                    <br />
                    <a href="#" data-toggle="modal" data-target="#employeeDetailModal">
                      View More
                      <i class="fal fa-chevron-double-right ml-1"></i>
                    </a>
                    <p class="social-links d-none d-md-block mt-4">
                      <a :href="activeEmployee.facebook">
                        <i class="fab fa-facebook"></i>
                      </a>
                      <a :href="activeEmployee.twitter">
                        <i class="fab fa-twitter"></i>
                      </a>
                      <a :href="activeEmployee.instagram">
                        <i class="fab fa-instagram"></i>
                      </a>
                      <a :href="activeEmployee.email">
                        <i class="fal fa-envelope"></i>
                      </a>
                    </p>
                  </div>
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
            <div
              class="employee-image"
              :style="'background-image: url(' + employee.photo.path + ')'"
            ></div>
          </div>
        </div>
      </perfect-scrollbar>
    </div>

    <!-- Detail Modal -->
    <div class="modal fade" id="employeeDetailModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="d-flex w-100 justify-content-end">
              <button
                type="button"
                class="close text-primary"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="modal-body">
            <div class="content">
              <div class="intro">
                <div class="selected-employee">
                  <img :src="activeEmployee.photo.path" class="employee-image" />
                </div>

                <div class="person-description">
                  <p class="designation">{{activeEmployee.post}}</p>
                  <p class="name">{{activeEmployee.name}}</p>
                </div>
              </div>

              <div class="details">{{activeEmployee.bio }}</div>
            </div>
          </div>

          <div class="modal-footer">
            <p class="social-links text-center mr-auto ml-auto">
              <a :href="activeEmployee.facebook">
                <i class="fab fa-facebook"></i>
              </a>
              <a :href="activeEmployee.twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a :href="activeEmployee.instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a :href="activeEmployee.email">
                <i class="fal fa-envelope"></i>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

export default {
  name: "AboutEmployees",
  components: { PerfectScrollbar },
  props: ["employees"],

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
      activeEmployee: this.employees[0]
    };
  },

  created() {
    console.log(this.activeEmployee);
  },

  methods: {
    setActiveEmployee(index) {
      this.activeEmployee = this.employees[index];
    }
  },

  computed: {
    employeeDetails() {
      if (!this.activeEmployee) return "";

      let words = this.activeEmployee.bio.split(" ");
      if (words.length > 60) return words.slice(0, 60).join(" ") + "...";
      return this.activeEmployee.bio;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_about_employees.scss";
</style>