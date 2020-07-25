Vue.component('event', {
  props: ["event"],
  template: `
  <li>
    <a href="./eventDetails.html" class="item" @click="showEventDetails">
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
    },
    showEventDetails() {
      if (typeof(Storage) !== "undefined") {
        localStorage.eventDetails = JSON.stringify(this.event);
      } else {
        // Sorry! No Web Storage support..
        console.log('Cannot store local storage');
      }
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