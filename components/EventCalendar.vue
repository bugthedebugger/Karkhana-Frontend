<template>
  <div class="calendar-container">

    <!-- Shown only from md -->
    <div class="calendar d-none d-md-block">
      <div class="cal-header">
        <div class="cal-btn cal-btn-left mr-auto text-left pl-2" @click="previous">
          <i class="fal fa-chevron-left"></i>
        </div>
        <div class="current-month">{{calendar.format("MMM YYYY")}}</div>
        <div class="cal-btn cal-btn-right ml-auto text-right pr-2" @click="next">
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
      <!-- <span class="event-type-dot event-type-dot-public"></span>
      <span class="event-type">Public event</span>
      <span class="event-type-dot event-type-dot-private ml-4"></span>
      <span class="event-type">Private event</span> -->
      <p class="event-type text-center">Events</p>

      <perfect-scrollbar class="events-scroll-area" v-if="events">
        <div class="event-list">
          <div v-for="(eventsData, date) in events" :key="date">
            <div class="event-date">{{date | tommorrow | today}}</div>
            <div class="event-list-item" v-for="(event, index) in eventsData" :key="index">
              <div class="event-start-time">{{event.startTime}}</div>
              <div class="event-title">{{event.title}}</div>
              <div class="event-location">{{event.location}}</div>
            </div>
          </div>
        </div>
      </perfect-scrollbar>
      <div v-else-if="!events && !eventsLoading" class="no-events text-center mt-5">No events found</div>
      <div v-if="eventsLoading" class="events-loading text-center mt-5">Loading...</div>
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
      this.getEvents();
      this.initCalendar();
    },

    previous() {
      this.calendar.subtract(1, "month");
      this.initCalendar();
      this.getEvents();
    },

    getEvents() {
      this.eventsLoading = true;
      this.events = null;
      this.$axios.get(calHelper.buildUrl(this.calendar)).then(resp => {
        this.eventsLoading = false;
        this.events = calHelper.formatEventsResonse(resp.data.items);
        if (this.events) calHelper.assignEvents(this.events, this.calendarData);
      });
    }
  },
  filters: {
    padZero: value => {
      return ("" + value).length == 1 ? "0" + value : value;
    },

    tommorrow: value => {
      let isTommorrow =
        value ===
        moment(new Date())
          .add(1, "days")
          .format("D MMM");
      return isTommorrow ? "Tommorrow, " + value : value;
    },

    today: value => {
      let isToday = value === moment(new Date()).format("D MMM");
      return isToday ? "Today, " + value : value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/components/_event_calendar.scss";
</style>