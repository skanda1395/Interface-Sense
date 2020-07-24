Vue.component('event', {
  props: ["event"],
  template: `
  <li>
    <a href="#" class="item">
      <div class="in">
        <div>
          <header>{{ event.city }}</header> {{ event.eventName }}
          <footer>{{ eventDate() }}, {{ event.eventStartTime }}</footer>
        </div>
        <footer>
          <br> </footer> <span :class="eventColour">{{ event.eventStatus }}</span> </div>
    </a>
  </li>
  `,
  methods: {
    eventDate() {
      let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      let date = new Date(this.event.eventDate);
      return `${date.getDate()}th ${months[date.getMonth()]}`;
    }
  },
  computed: {
    eventColour() {
      if (this.event.eventStatus == "Upcoming") {
        return 'text-warning';
      }
      else if(this.event.eventStatus == "Concluded") {
        return 'text-primary';
      }
      else {
        return 'text-danger';
      }
    }
  }
});


const app = new Vue({
  el: "#appCapsule",
  data: {
    all: [],
    upcoming: [],
    concluded: [],
    cancelled: [],
    // statusColour:['text-warning', 'text-primary', 'text-danger'],
    // eventColour: ""
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
        this.all = data;
        for (let event of this.all) {
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
  }
});

// upcoming - orange
// concluded - blue
// cancelled - red