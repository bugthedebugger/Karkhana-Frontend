<template>
  <div class="calendar-container">
    <div class="calendar">
      <div class="cal-header">
        <div class="cal-btn cal-btn-left mr-auto text-left" @click="previous">
          <i class="fal fa-chevron-left"></i>
        </div>
        <div class="current-month">{{calendar.format("MMM YYYY")}}</div>
        <div class="cal-btn cal-btn-right ml-auto text-right" @click="next">
          <i class="fal fa-chevron-right"></i>
        </div>
      </div>
      <div class="cal-body">
        <table>
          <thead>
            <tr>
              <td>
                <div class="cell cell-week">Sun</div>
              </td>
              <td>
                <div class="cell cell-week">Mon</div>
              </td>
              <td>
                <div class="cell cell-week">Tue</div>
              </td>
              <td>
                <div class="cell cell-week">Wed</div>
              </td>
              <td>
                <div class="cell cell-week">Thu</div>
              </td>
              <td>
                <div class="cell cell-week">Fri</div>
              </td>
              <td>
                <div class="cell cell-week">Sat</div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in calendarData" :key="i">
              <td v-for="(date, j) in row" :key="j">
                <div v-if="date.disabled" class="cell cell-empty">
                  {{
                  date.date}}
                </div>
                <div v-else class="cell cell-date" :class="{'cell-current': date.currentDate}">
                  {{ date.date | padZero }}
                  <div v-if="date.hasEvent" class="event-dot event-dot-public"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="events">
      Public event | Private event
      <perfect-scrollbar class="events-scroll-area" v-if="events">
        <div class="event-list">
          <div v-for="(eventsData, date) in events" :key="date">
            <div class="event-date">{{date}}</div>
            <div class="event-list-item" v-for="(event, index) in eventsData" :key="index">
              <!-- <template> -->
              <div class="event-start-time">{{event.startTime}}</div>
              <div class="event-title">{{event.title}}</div>
              <div class="event-location">{{event.location}}</div>
              <!-- </template> -->
            </div>
            <!-- <span class="event-date">{{date}}</span> -->
            <!-- <table v-for="(event, index) in eventsData" :key="index">
              <tr>
                <td rowspan="2" style="vertical-align: top; height: 100%">
                  <div class="event-start-time">{{event.startTime}}</div>
                </td>
                <td>
                  <div class="event-title">{{event.title}}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="event-location">{{event.location}}</div>
                </td>
              </tr>
            </table>-->
          </div>
        </div>
      </perfect-scrollbar>
      <div v-else-if="!events && !eventsLoading">No events found</div>
      <div v-if="eventsLoading">Loading...</div>
      <div class="text-center mt-4 scroll-sign" v-if="events">
        <i class="fal fa-mouse-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import EventType from "~/enums";
import calHelper from "~/helpers/calendar";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

export default {
  name: "EventCalendar",
  components: { PerfectScrollbar },
  props: [],
  data() {
    return {
      calendar: null,
      calendarData: [],
      events: null,
      eventsLoading: false
    };
  },
  created() {
    this.calendar = moment();
    this.initCalendar();
    this.getEvents();
  },
  mounted() {},
  methods: {
    initCalendar() {
      this.calendarData = calHelper.initCalendar(this.calendar);
    },

    next() {
      this.calendar.add(1, "month");
      this.initCalendar();
      this.getEvents();
    },

    previous() {
      this.calendar.subtract(1, "month");
      this.initCalendar();
      this.getEvents();
    },

    getEvents() {
      this.eventsLoading = true;
      this.$axios.get(calHelper.buildUrl(this.calendar)).then(resp => {
        this.eventsLoading = false;
        this.events = calHelper.formatEventsResonse(resp.data.items);
        if (this.events) calHelper.assignEvents(this.events, this.calendarData);
      });
    }
  },
  filters: {
    padZero: function(value) {
      return ("" + value).length == 1 ? "0" + value : value;
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/components/_event_calendar.scss";
</style>