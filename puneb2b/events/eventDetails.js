const app = new Vue({
  el: "#appCapsule",
  data: {
    event: null
  },
  created() {
    this.event = JSON.parse(localStorage.eventDetails);
  }
})