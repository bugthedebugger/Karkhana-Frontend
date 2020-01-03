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
                <div
                  v-else
                  class="cell cell-date"
                  :class="{'cell-current': date.currentDate}"
                  @click="selectDate(date.date)"
                >{{ date.date | padZero }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="events">
      Public event | Private event
      <perfect-scrollbar class="events-scroll-area" v-if="events.length">
        <div class="event-list">
          <div class="event-list-item" v-for="(event, index) in events" :key="index">
            <table>
              <tr>
                <td colspan="2" class="event-date">{{event.date}}</td>
                <td></td>
              </tr>
              <tr>
                <td rowspan="2" class="event-start-time">{{event.startTime}}</td>
                <td class="event-title">{{event.title}}</td>
              </tr>
              <tr>
                <td class="event-location">{{event.location}}</td>
              </tr>
            </table>
          </div>
        </div>
      </perfect-scrollbar>
      <div v-else-if="!events.length && !eventsLoading">No events found</div>
      <div v-if="eventsLoading">Loading...</div>
      <div class="text-center mt-4 scroll-sign" v-if="events.length">
        <i class="fal fa-mouse-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import EventType from "~/enums";
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
      events: [],
      eventsScrollConfig: {},
      eventsLoading: false
    };
  },
  created() {
    const API_KEY = "AIzaSyBepIVJdLIVOAHb2afbyVAxcF-sqJpy3dM";
    this.calendar = moment();
    this.initCalendar();
    this.getEvents();
  },
  mounted() {},
  methods: {
    selectDate(date) {
      this.currentDate = date;
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

    initCalendar() {
      const lastDateOfMonth = this.calendar.endOf("month").date();
      const firstDayOfMonth = this.calendar.startOf("month").day();

      this.calendarData = [];
      // generate linear calendar data
      let linearData = [];
      for (let i = 0; i < firstDayOfMonth; i++) linearData[i] = null;
      let dateCount = 1;
      for (let i = firstDayOfMonth; dateCount <= lastDateOfMonth; i++) {
        linearData[i] = {
          date: dateCount,
          event: true,
          eventType: 0,
          currentDate: dateCount === new Date().getDate()
        };
        dateCount++;
      }

      // convert to 2D array
      let rowIndex = 0;
      for (let i = 0; i < linearData.length; i++) {
        if (i % 7 === 0 && i !== 0) rowIndex++;
        if (this.calendarData[rowIndex])
          this.calendarData[rowIndex].push(linearData[i]);
        else this.calendarData[rowIndex] = [linearData[i]];
      }

      // fill next and prev month cells
      let firstRow = this.calendarData[0];
      if (firstRow.includes(null)) {
        const lastDayOfLastMonth = this.calendar
          .subtract(1, "month")
          .endOf("month")
          .date();
        let count = 0;
        for (let i = firstRow.lastIndexOf(null); i >= 0; i--) {
          firstRow[count++] = {
            date: lastDayOfLastMonth - i,
            disabled: true
          };
        }
        this.calendar.add(1, "month");
      }

      let lastRow = this.calendarData[this.calendarData.length - 1];
      let count = 1;
      while (lastRow.length !== 7) {
        lastRow.push({
          date: count++,
          disabled: true
        });
      }
    },

    getEvents() {
      const BASE_URL = "https://www.googleapis.com/calendar/v3/calendars";
      const CAL_ID = "almighty569@gmail.com";
      const timeMin = this.calendar.startOf("month").toISOString();
      const timeMax = this.calendar.endOf("month").toISOString();
      const API_KEY = "AIzaSyBepIVJdLIVOAHb2afbyVAxcF-sqJpy3dM";
      const URL = `${BASE_URL}/${CAL_ID}/events?timeMin=${timeMin}&timeMax=${timeMax}&key=${API_KEY}`;
      this.eventsLoading = true;
      this.$axios.get(URL).then(resp => {
        this.events = resp.data.items.map(item => {
          return {
            title: item.summary,
            date: moment(item.start.dateTime).format("D MMM"),
            location: item.location,
            startTime: moment(item.start.dateTime).format("h:MM A")
          };
        });
        this.eventsLoading = false;
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