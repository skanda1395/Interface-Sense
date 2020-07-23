Vue.component('event', {
  props: ["event"],
  template: `
  <li>
    <a href="#" class="item">
      <div class="in">
        <div>
          <header>{{ event.city }}</header> {{ event.eventName }}
          <footer>30 Members</footer>
        </div>
        <footer>{{ eventDate() }},
          <br> {{ event.eventStartTime }} </footer> <span class="text-muted">{{ event.eventStatus }}</span> </div>
    </a>
  </li>
  `,
  methods: {
    eventDate() {
      let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      let date = new Date(this.event.eventDate);
      return `${date.getDate()}th ${months[date.getMonth()]}`;
    }
  }
});


const app = new Vue({
  el: "#appCapsule",
  data: {
    upcoming: [],
    concluded: [],
    cancelled: [],
  },
  created() {
    fetch("http://164.52.195.248:8062/event")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log(data[0]);
        for (let event of data) {
          if(event.eventStatus == "Upcoming") {
            this.upcoming.push(event);
          }
          else if(event.eventStatus == "Concluded"){
            this.concluded.push(event);
          }
          else {
            this.cancelled.push(event);
          }
        }
      })
      .catch(error => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  },
  computed: {
    all() {
      return [...this.upcoming, ...this.concluded];
    }
  }
})