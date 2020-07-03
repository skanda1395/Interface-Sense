// Members component
Vue.component('member', {
  props: ['member'],
  data() {
    return {
      ID: this.member.memberId
    }
  },
  template: `
    <div class="member row py-2" @click="autocompleteName">
      <div class="mx-auto col-lg-8">
        <div class="border-bottom d-flex">
          <div class="img-container mr-2">
            <img class="profile-img img-fluid" src="profile-icon.png" alt="profile-icon">
          </div>
          <div class="content">
            <dt>{{ fullName }}</dt>
            <dd class="font-weight-light text-muted">{{ member.firmName }}</dd>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    autocompleteName() {
      app.inputName = this.fullName;
      app.focus = false;
    }
  },
  computed: {
    fullName() {
      return this.member.firstName + ' ' + this.member.lastName;
    },
  }
});


let app = new Vue({
  el: "#app",
  data: {
    membersData: null,
    focus: false,
    inputName: "",
    memberCount: null
  },
  computed: {
    resetFilter() {
      if(!this.inputName) {
        this.filterList();
        console.log('Just called filterlist');
        return 0;
      }
      else {
        return 'input not empty';
      }
    },
    notMember() {
      return !this.memberCount? true: false;
    }
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
    filterList() {
      let filterValue = this.inputName.toUpperCase();
      let membersList = document.getElementById("members-container");
      let members = membersList.querySelectorAll(".member");
      this.memberCount = members.length;
      
      for(let i = 0; i < members.length; i++) {
        let nameTag = members[i].getElementsByTagName("dt")[0];
        if(nameTag.textContent.toUpperCase().indexOf(filterValue) > -1) {
          members[i].style.display = "";
        } 
        else {
          members[i].style.display = "none";
          this.memberCount--;
        }
      }
    }
  },
  mounted() {
    this.getMembers();
  }
});