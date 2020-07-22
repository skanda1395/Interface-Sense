const member = {
  props: ['member'],
  data() {
    return {
      ID: this.member.memberId
    };
  },
  methods: {
    showDetails() {
      console.log('show my details');
      if (typeof(Storage) !== "undefined") {
        sessionStorage.id = this.ID;
        window.location.href = './memberView.html'
      } else {
        // Sorry! No Web Storage support..
        console.log('sorry! cant store data');
      }
    },
    autocompleteName() {
      this.$emit(
        "fillname",
        `${this.member.firstName} ${this.member.lastName}`
      );
    }
  },
  computed: {
    profile_pic() {
      if (this.member.gender == "Female") {
        return './assets/woman_1.png';
      } else {
        return './assets/man_1.png';
      }
    }
  },
  template: `
      <div
      class="d-flex border-bottom py-2 align-items-center member"
      @click="autocompleteName"
      >
      <div class=" d-flex align-items-center img-container">
        <img :src="profile_pic" alt="profile_pic" />
      </div>
      <div class="d-flex flex-column py-2 ml-3">
        <div class="name" id="name-container">
          <span id="firstName">{{ member.firstName }}</span
          >&nbsp;<span id="lastName">{{ member.lastName }}</span>
        </div>
        <span class="firmName text-muted offsetY" id="firmName">{{
          member.firmName
        }}</span>
      </div>
      <i class="material-icons text-muted" id="forward-icon" @click="showDetails"
        >arrow_forward_ios</i
      >
    </div>
  `
};


const app = new Vue({
  el: "#app",
  components: {
    member
  },
  data: {
    membersData: null,
    inputName: "",
    selectedTab: "First Name",
    focus: false,
    memberCount: null
  },
  methods: {
    filterList() {
      let filterValue = this.inputName.toUpperCase();
      let membersList = document.getElementById("members-container");
      let members = membersList.querySelectorAll(".member");
      this.memberCount = members.length;

      for (let i = 0; i < members.length; i++) {
        let nameTag;
        if (this.selectedTab == "First Name") {
          nameTag = members[i].querySelector("#firstName");
        } else if (this.selectedTab == "Last Name") {
          nameTag = members[i].querySelector("#lastName");
        } else {
          nameTag = members[i].querySelector("#firmName");
        }

        if (nameTag.textContent.toUpperCase().indexOf(filterValue) > -1) {
          members[i].style.display = "";
        } else {
          members[i].style.setProperty("display", "none", "important");
          this.memberCount--;
        }
      }
    },
    selectTab(e) {
      if (e.target.classList.contains("tab")) {
        this.selectedTab = e.target.textContent;
        const activeTab = document.querySelector(".active");
        if (e.target == activeTab) return;
        else {
          activeTab.classList.remove("active");
          e.target.classList.add("active");
        }
        this.filterList();
      }
    },
    clearAndFocus() {
      this.inputName = "";
      document.getElementById("search-box").select();
      this.filterList();
    },
    autocompleteName(name) {
      this.inputName = name;
      this.focus = false;
    }
  },
  computed: {
    sortMembers() {
      console.log("called to sort");
      if (!this.membersData) return;

      let tab =
        this.selectedTab == "First Name"
          ? "firstName"
          : this.selectedTab == "Last Name"
          ? "lastName"
          : "firmName";
      let arr = [...this.membersData];

      return arr.sort(function(a, b) {
        if (a[tab] > b[tab]) return 1;
        else if (a[tab] < b[tab]) return -1;
        else return 0;
      });
    }
  },
  created() {
    fetch("http://164.52.195.248:8062/members")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        this.membersData = data;
        console.log("set data");
      })
      .catch(error => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
})