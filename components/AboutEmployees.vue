<template>
  <section class="about-employees">
    <div class="container mt-5 position-relative">
      <div class="team-members">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <div class="selected-employee">
                <div class="image-circle-background">
                  <img :src="activeEmployee.image" class="employee-image" />
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12">
              <div class="person-description">
                <p class="designation">{{activeEmployee.designation}}</p>
                <p class="name">{{activeEmployee.name}}</p>

                <p class="social-links d-block d-md-none text-center">
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
            <div class="employee-image" :style="'background-image: url(' + employee.image + ')'"></div>
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
                  <img :src="activeEmployee.image" class="employee-image" />
                </div>

                <div class="person-description">
                  <p class="designation">{{activeEmployee.designation}}</p>
                  <p class="name">{{activeEmployee.name}}</p>
                </div>
              </div>

              <div class="details">{{activeEmployee.details }}</div>
            </div>
          </div>

          <div class="modal-footer">
            <p class="social-links text-center mr-auto ml-auto">
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
          name: "Sakar Pudasaini",
          designation: "Founder/Chairman",
          quote:
            "<< I am pretty sure cheese is the greatest invention in history >>",
          image: "/images/img-sakar.jpg",
          details: `
            Sakar‌ ‌Pudasaini‌ ‌is‌ ‌a‌ ‌technologist‌ ‌and‌ ‌an‌ ‌educator.‌ ‌The‌ ‌
            technologist‌ ‌in‌ ‌him‌ ‌sees‌ ‌that‌ ‌the‌ ‌world‌ ‌he‌ ‌lives‌ ‌in‌ ‌is‌ ‌malleable,‌ ‌
            both‌ ‌in‌ ‌the‌ ‌material‌ ‌and‌ ‌cultural‌ ‌senses,‌ ‌and‌ ‌thus‌ ‌is‌ ‌responsive‌ ‌to‌ ‌
            those‌ ‌who‌ ‌can‌ ‌figure‌ ‌out‌ ‌the‌ ‌tools‌ ‌to‌ ‌mold‌ ‌it‌ ‌with.‌ ‌As‌ ‌a‌ ‌teacher‌ ‌he‌ ‌
            tries‌ ‌to‌ ‌create‌ ‌the‌ ‌conditions‌ ‌which‌ ‌will‌ ‌lead‌ ‌his‌ ‌students‌ ‌to‌ ‌that‌ ‌
            same‌ ‌insight,‌ ‌and‌ ‌the‌ ‌acquisition‌ ‌of‌ ‌the‌ ‌right‌ ‌tools‌ ‌to‌ ‌mold‌ ‌their‌ ‌
            own‌ ‌worlds‌ ‌with.‌ ‌
             ‌
            Sakar‌ ‌currently‌ ‌sits‌ ‌on‌ ‌the‌ ‌curriculum‌ ‌committee‌ ‌of‌ ‌MPhil‌ ‌in‌ ‌
            STEAM‌ ‌Education‌ ‌at‌ ‌Kathmandu‌ ‌University.‌ ‌He‌ ‌has‌ ‌also‌ ‌served‌ ‌
            as‌ ‌a‌ ‌visiting‌ ‌professor‌ ‌at‌ ‌NYU‌ ‌Shanghai.‌  ‌Sakar‌ ‌studied‌ ‌Computer‌ ‌
            Science‌ ‌at‌ ‌Johns‌ ‌Hopkins‌ ‌University.‌ ‌ ‌
          `,
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
          image: "/images/img-pavitra.jpg",
          details: `
            Pavitra‌ ‌describes‌ ‌himself‌ ‌as‌ ‌an‌ ‌engineer‌ ‌by‌ ‌education,‌ ‌an‌ ‌
            entrepreneur‌ ‌by‌ ‌profession‌ ‌and‌ ‌educator‌ ‌by‌ ‌passion.‌ ‌As‌ ‌a‌ ‌tinkerer‌ ‌
            turned‌ ‌engineer,‌ ‌he‌ ‌strongly‌ ‌believes‌ ‌that‌ ‌with‌ ‌the‌ ‌right‌ ‌skills‌ ‌and‌ ‌
            attitude‌ ‌one‌ ‌can‌ ‌convert‌ ‌challenges‌ ‌into‌ ‌opportunities‌ ‌to‌ ‌make‌ ‌an‌ ‌
            impact‌ ‌in‌ ‌their‌ ‌community.‌ ‌Through‌ ‌Karkhana‌ ‌he‌ ‌is‌ ‌trying‌ ‌to‌ ‌create‌ ‌
            a‌ ‌platform‌ ‌that‌ ‌empowers‌ ‌learners‌ ‌to‌ ‌start‌ ‌their‌ ‌journeys‌ ‌as‌ ‌
            change‌ ‌makers,‌ ‌and‌ ‌have‌ ‌fun‌ ‌while‌ ‌at‌ ‌it.‌ ‌He‌ ‌wants‌ ‌to‌ ‌see‌ ‌
            Karkhana‌ ‌as‌ ‌a‌ ‌community‌ ‌of‌ ‌people‌ ‌who‌ ‌persistently‌ ‌push‌ ‌their‌ ‌
            boundaries‌ ‌and‌ ‌become‌ ‌regional‌ ‌leaders‌ ‌in‌ ‌STEAM‌ ‌education.‌ ‌
             ‌
            Pavitra‌ ‌is‌ ‌an‌ ‌active‌ ‌member‌ ‌of‌ ‌the‌ ‌entrepreneurship‌ ‌community‌ ‌in‌ ‌
            Nepal,‌ ‌he‌ ‌serves‌ ‌as‌ ‌an‌ ‌executive‌ ‌member‌ ‌of‌ ‌the‌ ‌National‌ ‌
            Governing‌ ‌Council‌ ‌of‌ ‌Nepalese‌ ‌Young‌ ‌Entrepreneurs‌ ‌Forum‌ ‌
            (NYEF).‌ ‌He‌ ‌has‌ ‌also‌ ‌served‌ ‌as‌ ‌the‌ ‌President‌ ‌of‌ ‌the‌ ‌NYEF’s‌ ‌
            Kathmandu‌ ‌chapter.‌ ‌ ‌
          `,
          socialLinks: {
            facebook: "",
            twitter: "",
            email: "",
            instagram: ""
          }
        },

        {
          name: "Sunoj Shrestha",
          designation: "Head Teacher",
          quote:
            "<< I am pretty sure cheese is the greatest invention in history >>",
          image: "/images/img-sunoj.jpg",
          details: `
            Sunoj‌ ‌is‌ ‌an‌ ‌educator‌ ‌by‌ ‌passion,‌ ‌an‌ ‌engineer‌ ‌by‌ ‌degree‌ ‌and‌ ‌
            a‌ ‌maker‌ ‌at‌ ‌heart.‌ ‌Tinkering‌ ‌with‌ ‌different‌ ‌tools‌ ‌and‌ ‌materials‌ ‌
            in‌ ‌projects‌ ‌has‌ ‌always‌ ‌been‌ ‌his‌ ‌way‌ ‌of‌ ‌learning.‌ ‌He‌ ‌is‌ ‌
            interested‌ ‌in‌ ‌a‌ ‌transdisciplinary‌ ‌cross-pollination‌ ‌of‌ ‌ideas‌ ‌and‌ ‌
            doing‌ ‌experiments‌ ‌on‌ ‌it.‌ ‌
             ‌
            As‌ ‌an‌ ‌engineer‌ ‌turned‌ ‌educator,‌ ‌he‌ ‌has‌ ‌taken‌ ‌a‌ ‌unique‌ ‌
            approach‌ ‌of‌ ‌integrating‌ ‌making‌ ‌with‌ ‌STEAM‌ ‌(Science,‌ ‌
            Technology,‌ ‌Engineering,‌ ‌Arts‌ ‌&‌ ‌Design,‌ ‌and‌ ‌Mathematics)‌ ‌
            and‌ ‌21st-century‌ ‌skills‌ ‌(Creativity,‌ ‌Communication,‌ ‌
            Collaboration‌ ‌and‌ ‌Critical‌ ‌Thinking).‌ ‌
             ‌
            He‌ ‌loves‌ ‌travelling‌ ‌to‌ ‌new‌ ‌places‌ ‌and‌ ‌connecting‌ ‌with‌ ‌people‌ ‌
            from‌ ‌different‌ ‌disciplines.‌ ‌His‌ ‌favodurite‌ ‌way‌ ‌of‌ ‌spending‌ ‌his‌ ‌
            spare‌ ‌time‌ ‌is‌ ‌reading‌ ‌or‌ ‌cycling.‌ ‌ ‌
          `,
          socialLinks: {
            facebook: "",
            twitter: "",
            email: "",
            instagram: ""
          }
        },

        {
          name: "Sachet Manandhar",
          designation: "Cheaf Finance Officer",
          quote:
            "<< I am pretty sure cheese is the greatest invention in history >>",
          image: "/images/img-sachet.jpg",
          details: `
            The‌ ‌impact‌ ‌that‌ ‌Karkhana‌ ‌envisions‌ ‌is‌ ‌only‌ ‌possible‌ ‌if‌ ‌it‌ ‌can‌ ‌sustain‌ ‌itself‌ ‌
            financially,‌ ‌and‌ ‌that‌ ‌responsibility‌ ‌falls‌ ‌to‌ ‌Sachet.‌ ‌An‌ ‌engineer‌ ‌by‌ ‌
            training,‌ ‌Sachet‌ ‌developed‌ ‌an‌ ‌interest‌ ‌in‌ ‌financial‌ ‌planning‌ ‌and‌ ‌
            management‌ ‌after‌ ‌starting‌ ‌Karkhana.‌ ‌Though‌ ‌he‌ ‌now‌ ‌spends‌ ‌more‌ ‌time‌ ‌
            with‌ ‌ledgers‌ ‌than‌ ‌levers,‌ ‌he‌ ‌sees‌ ‌a‌ ‌strong‌ ‌similarity‌ ‌between‌ ‌the‌ ‌two‌ ‌
            disciplines:‌ ‌they‌ ‌both‌ ‌demand‌ ‌creating‌ ‌order‌ ‌and‌ ‌systems‌ ‌where‌ ‌a‌ ‌given‌ ‌
            set‌ ‌of‌ ‌inputs‌ ‌lead‌ ‌to‌ ‌desired‌ ‌output.‌ ‌ ‌
             ‌ ‌
            Sachet‌ ‌is‌ ‌also‌ ‌a‌ ‌member‌ ‌of‌ ‌the‌ ‌Global‌ ‌Shapers‌ ‌Kathmandu‌ ‌Hub,‌ ‌an‌ ‌
            initiative‌ ‌of‌ ‌the‌ ‌World‌ ‌Economic‌ ‌Forum‌ ‌and‌ ‌serves‌ ‌as‌ ‌an‌ ‌occasional‌ ‌
            visiting‌ ‌professor‌ ‌at‌ ‌MBA‌ ‌programs.‌ ‌Besides‌ ‌work,‌ ‌he‌ ‌likes‌ ‌spending‌ ‌his‌ ‌
            time‌ ‌playing‌ ‌sports‌ ‌and‌ ‌working‌ ‌out.‌ ‌He‌ ‌has‌ ‌a‌ ‌reputation‌ ‌around‌ ‌
            Karkhana‌ ‌for‌ ‌being‌ ‌a‌ ‌sharp‌ ‌dresser.‌ ‌ ‌
          `,
          socialLinks: {
            facebook: "",
            twitter: "",
            email: "",
            instagram: ""
          }
        },

        {
          name: "Sangden Ghising",
          designation: "Lead, Community of Teachers",
          quote:
            "<< I am pretty sure cheese is the greatest invention in history >>",
          image: "/images/img-sangden.jpg",
          details: `
            Sangden‌ ‌has‌ ‌always‌ ‌dreamed‌ ‌of‌ ‌being‌ ‌a‌ ‌social‌ ‌activist‌ ‌that‌ ‌
            can‌ ‌change‌ ‌society.‌ ‌She‌ ‌sees‌ ‌working‌ ‌with‌ ‌young‌ ‌minds‌ ‌as‌ ‌
            a‌ ‌way‌ ‌to‌ ‌live‌ ‌this‌ ‌dream.‌ ‌As‌ ‌a‌ ‌young‌ ‌girl,‌ ‌Sangden‌ ‌hated‌ ‌
            science‌ ‌and‌ ‌math‌ ‌because‌ ‌she‌ ‌thought‌ ‌both‌ ‌subjects‌ ‌were‌ ‌
            hard‌ ‌and‌ ‌boring.‌ ‌After‌ ‌spending‌ ‌time‌ ‌at‌ ‌Karkhana‌ ‌as‌ ‌a‌ ‌
            Maker‌ ‌Mentor‌ ‌she‌ ‌grew‌ ‌to‌ ‌understand‌ ‌how‌ ‌they‌ ‌can‌ ‌be‌ ‌
            taught‌ ‌in‌ ‌a‌ ‌fun,‌ ‌engaging‌ ‌way‌ ‌that‌ ‌makes‌ ‌them‌ ‌relevant‌ ‌to‌ ‌
            daily‌ ‌life.‌ ‌Sangden‌ ‌earned‌ ‌a‌ ‌Bachelor's‌ ‌degree‌ ‌in‌ ‌Major‌ ‌
            English‌ ‌and‌ ‌Sociology‌ ‌Anthropology‌ ‌from‌ ‌Tribhuwan‌ ‌
            University.‌ ‌Her‌ ‌favorite‌ ‌part‌ ‌of‌ ‌being‌ ‌a‌ ‌teacher‌ ‌is‌ ‌helping‌ ‌
            other‌ ‌young‌ ‌girls‌ ‌develop‌ ‌her‌ ‌new‌ ‌found‌ ‌love‌ ‌for‌ ‌science,‌ ‌
            math‌ ‌and‌ ‌technology.‌
          `,
          socialLinks: {
            facebook: "",
            twitter: "",
            email: "",
            instagram: ""
          }
        },

        {
          name: "Samaya Khadga",
          designation: "Community Lead (Production and Procurement)",
          quote:
            "<< I am pretty sure cheese is the greatest invention in history >>",
          image: "/images/img-samaya.jpg",
          details: `
            Karkhana’s‌ ‌youngest‌ ‌team‌ ‌lead,‌ ‌Samaya‌ ‌is‌ ‌particularly‌ ‌
            interested‌ ‌in‌ ‌how‌ ‌youth‌ ‌can‌ ‌be‌ ‌encouraged‌ ‌to‌ ‌pursue‌ ‌their‌ ‌
            passions‌ ‌with‌ ‌dedication‌ ‌and‌ ‌persistence.‌ ‌Like‌ ‌most‌ ‌Nepalis‌ ‌
            his‌ ‌learning‌ ‌in‌ ‌school‌ ‌was‌ ‌rote-based‌ ‌and‌ ‌limited‌ ‌to‌ ‌the‌ ‌
            textbook,‌ ‌yet‌ ‌his‌ ‌passion‌ ‌for‌ ‌robotics‌ ‌and‌ ‌electronics‌ ‌gave‌ ‌
            him‌ ‌a‌ ‌chance‌ ‌to‌ ‌practice‌ ‌hands-on‌ ‌learning.‌ ‌After‌ ‌coming‌ ‌to‌ ‌
            Karkhana‌ ‌he‌ ‌realized‌ ‌why‌ ‌his‌ ‌“extracurriculars'‌ ‌'‌ ‌were‌ ‌more‌ ‌
            important‌ ‌to‌ ‌his‌ ‌success‌ ‌than‌ ‌his‌ ‌textbooks.‌ ‌ ‌
             ‌
            Thus‌ ‌he‌ ‌has‌ ‌become‌ ‌a‌ ‌strong‌ ‌advocate‌ ‌for‌ ‌student-centered‌ ‌
            learning‌ ‌that‌ ‌acknowledges‌ ‌that‌ ‌learning‌ ‌is‌ ‌dynamic.‌ ‌To‌ 
            support‌ ‌schools,‌ ‌teachers‌ ‌and‌ ‌parents‌ ‌in‌ ‌providing‌ ‌such‌ ‌
            education,‌ ‌Samaya‌ ‌is‌ ‌committed‌ ‌to‌ ‌designing‌ ‌and‌ ‌producing‌ ‌
            affordable‌ ‌but‌ ‌effective‌ ‌STEAM‌ ‌kits.‌ ‌ ‌
             ‌
            Samaya‌ ‌is‌ ‌currently‌ ‌pursuing‌ ‌a‌ ‌BBA‌ ‌at‌ ‌King’s‌ ‌College‌ ‌in‌ ‌
            Kathmandu.‌ ‌ ‌
          `,
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
  },

  computed: {
    employeeDetails() {
      if (!this.activeEmployee) return "";

      let words = this.activeEmployee.details.split(" ");
      if (words.length > 60) return words.slice(0, 60).join(" ") + "...";
      return this.activeEmployee.details;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_about_employees.scss";
</style>