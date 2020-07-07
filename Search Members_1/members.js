// Members component
Vue.component('member', {
  props: ['member'],
  data() {
    return {
      ID: this.member.memberId
    }
  },
  template: `
    <div class="d-flex border-bottom py-2 member" @click="autocompleteName">
      <div class=" d-flex align-items-center img-container">
        <img :src="profile_pic" alt="profile_pic">
      </div>
      <div class="d-flex flex-column py-2 ml-3" id="name_org_container">
        <span class="name">{{ fullName }}</span>
        <span class="firmName text-muted offsetY">{{ member.firmName }}</span>
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
    profile_pic() {
      let i = Math.floor(Math.random() * 2);
      return (this.member.gender == "Female")? app.profile_women[i]: app.profile_men[i];
    }
  }
});


let app = new Vue({
  el: "#app",
  data: {
    membersData: null,
    focus: false,
    inputName: "",
    memberCount: null,
    profile_women: ['Profile Pics/woman_1.png', 'Profile Pics/woman_2.png'],
    profile_men: ['Profile Pics/man_1.png', 'Profile Pics/man_2.png'],
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
        let nameTag = members[i].getElementsByClassName("name")[0];
        if(nameTag.textContent.toUpperCase().indexOf(filterValue) > -1) {
          // console.log(members[i]);
          members[i].style.display = "";
        } 
        else {
          members[i].style.setProperty("display", "none", "important");
          this.memberCount--;
        }
      }
    }
  },
  mounted() {
    this.getMembers();
    let topNavBarHeight = document.getElementById("searchDiv").offsetHeight;
    document.getElementById("offsetTop").style.height = topNavBarHeight + "px";
  }
});