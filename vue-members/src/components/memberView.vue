<template>
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
</template>

<script>
export default {
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
};
</script>

<style>
#profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid white;
}

.subheading-font {
  font-size: 12px;
}

#back-icon {
  font-size: 18px;
}

.btn-bg-1 {
  padding: 8px;
  color: grey;
  background-color: #e6e7e9;
}

.btn-bg-2 {
  height: 42px;
  font-size: 12px;
  background-color: #091440;
}

#ctaBtns {
  background-image: linear-gradient(
    to top,
    #fff,
    #fff,
    rgba(255, 255, 255, 0.4)
  );
  /* background-color: red; */
  width: 100%;
}

.btn-shadow {
  box-shadow: -1px 2px 8px 1px #888;
}

lottie-player {
  width: 60px;
  height: 60px;
}

#secondLottiePlayer {
  transform: scale(0.5);
}

#thirdLottiePlayer {
  transform: scale(0.8);
}

.ptsAlign {
  position: relative;
  top: -12px;
}

.ptsTxt {
  position: relative;
  top: -3px;
}
#pageOffsetTop {
  height: 60px;
}
#pageOffset {
  height: 60px;
}
</style>
