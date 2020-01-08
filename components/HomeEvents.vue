<template>
  <section class="events">
    <div class="container">
      <h1 class="calendar-title">Event Calendar</h1>
      <EventCalendar />
    </div>
  </section>
</template>

<script>
import EventCalendar from "~/components/EventCalendar";
export default {
  name: "HomeEvents",
  components: {
    EventCalendar
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_home_events.scss";
</style>