let member = {
  props: ['member'],
  data() {
    return {
      ID: this.member.memberId
    };
  },
  methods: {
    showDetails() {
      this.$router.push("/" + this.ID);
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


const searchMembers = {
  template: `<!-- Back button and Heading -->
  <div id="searchMembers">
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
      <div class="col-lg-12 px-3" id="searchDiv">
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
            src="./assets/close-circle.svg"
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
        @fillname="autocompleteName($event)"
      ></member>
      <p class="text-center text-monospace" v-show="memberCount == 0">
        No such member
      </p>
    </div>
  </div>
  </div>
  `,
  components: {
    member
  },
  data() {
    return {
      membersData: null,
      inputName: "",
      selectedTab: "First Name",
      focus: false,
      memberCount: null
    }
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
}

const memberView = {
  template: `
  <div class="container">
    <!-- Back button and Heading -->
    <nav
      class="fixed-top d-flex align-items-center justify-content-center"
      id="Nav"
    >
      <router-link to="/">
        <i class="material-icons text-dark" id="back-icon">arrow_back_ios</i>
      </router-link>
      <span class="text-uppercase text-center font-weight-bold"
        >Member Profile</span
      >
    </nav>

    <!-- Page Offset Top -->
    <div id="pageOffsetTop"></div>

    <!-- Profile pic, Name and Organisation -->
    <div id="memberOverview">
      <div class="d-flex flex-column align-items-center text-center">
        <img
          class="mb-1 shadow-sm"
          src="https://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg"
          alt="profile-image"
          id="profile-image"
        />
        <span class="font-weight-bold lead">{{ fullName }}</span>
        <span class="text-muted small">{{ firmName }}</span>
      </div>

      <!-- Member Main Details -->
      <div
        class="d-flex border-bottom justify-content-around pb-1 mb-3"
        id="memberLottiePoints"
      >
        <div class="d-flex flex-column align-items-center">
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_nqlp2k.json"
            background="transparent"
            speed="1"
            autoplay
          ></lottie-player>
          <div class="ptsAlign d-flex flex-column align-items-center">
            <span class="font-weight-bold">{{ points }}</span>
            <span class="ptsTxt text-muted small">Points</span>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_9sXk9i.json"
            id="secondLottiePlayer"
            background="transparent"
            speed="1"
            autoplay
          ></lottie-player>
          <div class="ptsAlign d-flex flex-column align-items-center">
            <span class="font-weight-bold">&#8377;{{ business }}L</span>
            <span class="ptsTxt text-muted small">Business</span>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_JLnT1f.json"
            id="thirdLottiePlayer"
            background="transparent"
            speed="1"
            autoplay
          ></lottie-player>
          <div class="ptsAlign d-flex flex-column align-items-center">
            <span class="font-weight-bold">{{ references }}</span>
            <span class="ptsTxt text-muted small">References</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Member Full Details -->
    <div id="memberFullDetails">
      <div v-for="(detail, index) in sortedData" :key="index">
        <p class="text-muted subheading-font mb-0">{{ detail[0] }}</p>
        <p class="mb-2">{{ detail[1] }}</p>
      </div>
    </div>

    <!-- Page Offset Bottom -->
    <div id="pageOffset"></div>

    <!-- Quick CTA Buttons -->
    <div
      class="fixed-bottom py-2 d-flex align-items-center justify-content-center"
      id="ctaBtns"
    >
      <button class="btn">
        <i class="btn-shadow material-icons rounded-circle btn-bg-1">email</i>
      </button>
      <button class="btn">
        <i class="btn-shadow material-icons rounded-circle btn-bg-1">call</i>
      </button>
      <button
        class="btn-shadow bg-white-rounded btn btn-bg-2 rounded-pill text-white ml-2"
      >
        <span>Send Reference</span>
      </button>
    </div>
  </div>
  `,
  props: ["id"],
  data() {
    return {
      memberData: null,
      fullName: "...",
      firmName: "...",
      points: "...",
      business: "...",
      references: "...",
      sortedData: [],
      noPoints: 0,
      noData: "NA"
    };
  },
  methods: {
    sortData(member) {
      let arr = this.sortedData;
      this.fullName = `${member?.firstName} ${member?.lastName}` || this.noData;
      this.firmName = member?.firmName || this.noData;
      this.points = member?.membershipType?.totalPoints || this.noPoints;
      this.business = member?.chapter?.totalPoints || this.noPoints;
      this.references = member?.salutation?.totalPoints || this.noPoints;
      arr.push([
        "Membership Type",
        member?.membershipType?.value || this.noData
      ]);
      arr.push(["Chapter", member?.chapter?.value || this.noData]);
      arr.push(["Gender", member?.gender || this.noData]);
      arr.push(["Salutation", member?.salutation?.value || this.noData]);
      arr.push(["Designation", member?.designation?.value || this.noData]);
      arr.push(["Mobile", member?.mobileNo || this.noData]);
      arr.push(["Secondary Mobile no", member?.phoneNo || this.noData]);
      arr.push(["E-mail", member?.emailId || this.noData]);
      arr.push([
        "Primary Address",
        member?.businessAddressLine1 || this.noData
      ]);
      arr.push(["Country", member?.country?.value || this.noData]);
      arr.push(["State", member?.state?.value || this.noData]);
      arr.push(["City", member?.city || this.noData]);
      arr.push(["Pincode", member?.zipCode || this.noData]);
      arr.push([
        "Secondary Address",
        member?.businessAddressLine2 || this.noData
      ]);
      arr.push([
        "Primary Business",
        member?.businessCategory?.value || this.noData
      ]);
      arr.push([
        "Secondary Business",
        member?.secondaryBusiness || this.noData
      ]);
      arr.push(["About the business", member?.aboutTheBusiness || this.noData]);
    }
  },
  created() {
    fetch("http://164.52.195.248:8062/members/" + this.id)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        this.memberData = data;
        this.sortData(this.memberData);
      })
      .catch(error => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}

export { searchMembers, memberView };