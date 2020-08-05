const app = new Vue({
  el: "#appCapsule",
  data: {
    event: null
  },
  methods: {
    date() {
      let eventDate = new Date(this.event.eventDate);
      return new Intl.DateTimeFormat("en-GB").format(eventDate);
    }
  },
  created() {
    this.event = JSON.parse(localStorage.eventDetails);
  }
})