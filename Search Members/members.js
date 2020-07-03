// Member Component
Vue.component('member', {
  props: ['member'],
  data() {
    return {
       firstName: "",
       lastName: "",
      }
  },
  template: `
    <div class="Card z-depth-1" @click="autocompleteName">
      <div class="img-container">
        <!-- member profile pic goes here -->
        <img src="profile-icon.png" alt="skanda">
      </div>
      <div>
        <span id="name">{{ fullName }}</span><br>
        <span>{{ firmName }}</span>
      </div>
    </div>
  `,
  methods: {
    autocompleteName() {
      document.getElementById("autocomplete-input").value = this.fullName;
      app.hasFocus = false;
    }
  },
  computed: {
    fullName() {
      return this.member.firstName + ' ' + this.member.lastName;
    },
    firmName() {
      return this.member.firmName;
    },
    memberID() {
      return this.member.memberId;
    }
  }
});


let app = new Vue({
    el: '#app',
    data: {
      membersData: null,
      hasFocus: false
    },
    methods: {
      getMembers() {
        fetch("http://164.52.195.248:8062/members")
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          this.membersData = data;
        })
        .catch(error => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
      },
      showList() {
        this.hasFocus = true;
      },
      closeList() {
        this.hasFocus = false;
      }
    },
    mounted() {
      this.getMembers();
    }
});