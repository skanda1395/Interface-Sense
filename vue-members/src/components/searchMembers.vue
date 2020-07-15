<template>
  <div id="search-members">
    <!-- Back button and Heading -->
    <nav
      class="fixed-top bg-white d-flex align-items-center justify-content-center"
      id="Nav"
    >
      <a href="#">
        <i class="material-icons text-dark" id="back-icon">arrow_back_ios</i>
      </a>
      <span class="text-uppercase text-center font-weight-bold"
        >Members Directory</span
      >
    </nav>

    <!-- Offset Div -->
    <div id="offsetTop"></div>

    <!-- Tabs -->
    <div
      class="d-flex justify-content-around border-top border-bottom pt-1"
      id="tabs"
      @click="selectTab($event)"
    >
      <div class="tab active">First Name</div>
      <div class="tab">Last Name</div>
      <div class="tab">Company Name</div>
    </div>

    <!-- Search Box -->
    <div class="container">
      <div class="row">
        <div class="col-lg-6 px-3" id="searchDiv">
          <div class="input-group input-group-sm my-3">
            <div class="input-group-prepend">
              <span
                class="input-group-text rounded-pill border-right-0"
                id="basic-addon1"
              >
                <i class="material-icons">search</i>
              </span>
            </div>
            <input
              id="search-box"
              type="text"
              class="fc rounded-pill border-left-0 pl-0"
              placeholder="Search to select member"
              v-model="inputName"
              @keyup="filterList"
              @click="focus = true"
            />
            <img
              src="../assets/close-circle.svg"
              v-if="focus"
              @click="clearAndFocus"
              alt="clear_icon"
              id="clear_icon"
            />
          </div>
        </div>
      </div>

      <div id="members-container" v-show="focus">
        <member
          v-for="member in sortMembers"
          :member="member"
          id="member.memberId"
          :key="member.memberId"
          @fillName="autocompleteName($event)"
        ></member>
        <p class="text-center text-monospace" v-show="memberCount == 0">
          No such member
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Member from "./member.vue";

export default {
  components: {
    member: Member
  },
  data() {
    return {
      membersData: null,
      inputName: "",
      selectedTab: "First Name",
      focus: false,
      memberCount: null
    };
  },
  methods: {
    filterList() {
      let filterValue = this.inputName.toUpperCase();
      let membersList = document.getElementById("members-container");
      let members = membersList.querySelectorAll(".member");
      this.memberCount = members.length;

      for (let i = 0; i < members.length; i++) {
        let nameTag;
        if(this.selectedTab == "First Name") {
          nameTag = members[i].querySelector("#firstName");
        }
        else if (this.selectedTab == "Last Name") {
          nameTag = members[i].querySelector("#lastName");
        }
        else {
          nameTag = members[i].querySelector("#firmName");
        }
        
        if (nameTag.textContent.toUpperCase().indexOf(filterValue) > -1) {
          // console.log(members[i]);
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
      console.log('called to sort');
      if(!this.membersData) return;

      let tab = (this.selectedTab == "First Name")? "firstName": (this.selectedTab == "Last Name")? "lastName": "firmName";
      let arr = [...this.membersData];

      return arr.sort(function(a, b) {
        if(a[tab] > b[tab]) return 1;
        else if(a[tab] < b[tab]) return -1;
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
      console.log('set data');
    })
    .catch(error => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
  }
};
</script>

<style>
#basic-addon1 {
  color: #a8a7b1;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

#basic-addon1,
input[type="text"] {
  border-color: #e5e5e5;
  background-color: #fafafa !important;
}

input[type="text"],
.form-control:focus {
  border-color: #e5e5e5;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

input[type="text"]:focus {
  outline: none;
  box-shadow: none;
}

.icon-border {
  border-color: #80bdff;
}

#close-list-btn {
  border: 0;
  cursor: pointer;
  background-color: transparent;
  position: relative;
  left: 5px;
}

#close-list-btn:hover {
  color: red;
}

.member {
  cursor: pointer;
}

#resetFilterOp {
  display: none;
}

img {
  width: 54px;
  height: auto;
  border-radius: 50%;
}

.offsetY {
  position: relative;
  top: -4px;
}

#members-container {
  position: relative;
  top: -7px;
}

i {
  font-size: 20px !important;
}

.name {
  font-size: 20px;
  font-weight: 600;
}

.firmName {
  font-size: 15px;
}

.input-group {
  position: relative;
}

.input-group img {
  position: absolute;
  top: 24%;
  right: 3%;
  width: 16px;
  height: auto;
  border-radius: 50%;
}

/* Bootstrap's form-control class without any sideeffects  */
.fc {
  height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
  margin-bottom: 0;
  border-color: #e5e5e5;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  display: block;
  font-weight: 400;
  color: #495057;
  border: 1px solid #ced4da;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

nav {
  position: relative;
  height: 60px;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 1);
}

nav a {
  position: absolute;
  top: 29%;
  left: 5%;
  width: 20px;
  height: 20px;
}

#back-icon {
  font-size: 18px !important;
}

#tabs {
  font-size: 0.9rem;
  color: #6b6a6ae6;
  font-weight: 600;
}

.tab::after {
  content: "";
  width: 100%;
  display: block;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.tab.active::after {
  border-top: 5px solid #31399c;
}

#forward-icon {
  position: absolute;
  right: 0%;
  font-size: 16px !important;
}

#offsetTop {
  height: 60px;
}
</style>
