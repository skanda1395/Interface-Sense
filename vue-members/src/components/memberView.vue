<template>
  <div class="container">
    <!-- Back button and Heading -->
    <nav class="fixed-top d-flex align-items-center justify-content-center" id="Nav">
      <router-link to="/">
        <i class="material-icons text-dark" id="back-icon">arrow_back_ios</i>
      </router-link>
      <span class="text-uppercase text-center font-weight-bold">Member Profile</span>
    </nav>

    <!-- Page Offset Top -->
    <div id="pageOffsetTop"></div>

    <!-- Profile pic, Name and Organisation -->
    <div id="memberOverview">
      <div class="d-flex flex-column align-items-center text-center">
        <img class="mb-1 shadow-sm" src="https://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg" alt="profile-image" id="profile-image">
        <span class="font-weight-bold lead">{{ fullName }}</span>
        <span class="text-muted small">{{ member.firmName }}</span>
      </div>

      <!-- Member Main Details -->
      <div class="d-flex border-bottom justify-content-around pb-1 mb-3" id="memberLottiePoints">
        <div class="d-flex flex-column align-items-center">
          <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_nqlp2k.json"  background="transparent"  speed="1" autoplay></lottie-player>
          <div class="ptsAlign d-flex flex-column align-items-center">
            <span class="font-weight-bold">{{ points }}</span>
            <span class="ptsTxt text-muted small">Points</span>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_9sXk9i.json" id="secondLottiePlayer" background="transparent"  speed="1" autoplay></lottie-player>
          <div class="ptsAlign d-flex flex-column align-items-center">
            <span class="font-weight-bold">&#8377;{{ business }}L</span>
            <span class="ptsTxt text-muted small">Business</span>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_JLnT1f.json" id="thirdLottiePlayer" background="transparent"  speed="1" autoplay></lottie-player>
          <div class="ptsAlign d-flex flex-column align-items-center">
            <span class="font-weight-bold">{{ references }}</span>
            <span class="ptsTxt text-muted small">References</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <p>{{ sortedData }}</p> -->
    <!-- Member Full Details -->
    <div id="memberFullDetails">
      <div v-for="(detail, index) in sortedData" :key="index">
        <p class="text-muted subheading-font mb-0">{{ detail[0] }}</p>
        <p class="mb-2">{{ detail[1] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['member'],
  data() {
    return {
      noPoints: 0,
      noData: 'NA'
    }
  },
  computed: {
    fullName() {
      return `${this.member.firstName} ${this.member.lastName}`;
    },
    points() {
      return this.member.membershipType.totalPoints || this.noPoints;
    },
    business() {
      return this.member.chapter.totalPoints || this.noPoints;
    },
    references() {
      return this.member.salutation.totalPoints || this.noPoints;
    },
    sortedData() {
      // Since all the API data is not displayed on screen, I have to manually sort the data
      // console.log('computed prop');
      let sortedData = [];
      let member = this.member;
      // console.log(member.firstName);
      sortedData.push(["Membership Type", member.membershipType.value || this.noData ]);
      sortedData.push(["Chapter", member.chapter.value || this.noData ]);
      sortedData.push(["Gender", member.gender || this.noData ]);
      sortedData.push(["Salutation", member.salutation.value || this.noData ]);
      sortedData.push(["Designation", member.designation || this.noData ]);
      sortedData.push(["Mobile", member.mobileNo || this.noData ]);
      sortedData.push(["Secondary Mobile no", member.phoneNo || this.noData ]);
      sortedData.push(["E-mail", member.emailId || this.noData ]);
      sortedData.push(["Primary Address", member.businessAddressLine1]);
      sortedData.push(["Country", member.country.value || this.noData ]);
      sortedData.push(["State", member.state.value || this.noData ]);
      sortedData.push(["City", member.city || this.noData ]);
      sortedData.push(["Pincode", member.zipCode || this.noData ]);
      sortedData.push(["Secondary Address", member.businessAddressLine2 || this.noData ]);
      sortedData.push(["Primary Business", member.businessCategory.value || this.noData ]);
      sortedData.push(["Secondary Address", member.secondaryBusiness || this.noData ]);
      sortedData.push(["About the business", member.aboutTheBusiness || this.noData ]);
      return sortedData;
    }
  },
  mounted() {
    let topNavBarHeight = document.getElementById("Nav").offsetHeight;
    document.getElementById("pageOffsetTop").style.height = topNavBarHeight + "px";
    // let bottomNavbarHeight = document.getElementById("ctaBtns").offsetHeight;  
    // document.getElementById("pageOffset").style.height = bottomNavbarHeight + "px";
  }
}
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
    background-color: #091440
  }

  #ctaBtns {
    background-image: linear-gradient(to top, #fff, #fff, rgba(255, 255, 255, 0.4));
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
</style>