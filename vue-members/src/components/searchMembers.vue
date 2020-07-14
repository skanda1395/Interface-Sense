<template>
  <div id="search-members">
    <!-- Back button and Heading -->
    <nav class="fixed-top bg-white d-flex align-items-center justify-content-center" id="Nav">
      <a href="#">
        <i class="material-icons text-dark" id="back-icon">arrow_back_ios</i>
      </a>
      <span class="text-uppercase text-center font-weight-bold">Members Directory</span>
    </nav>

    <!-- Offset Div -->
    <div id="offsetTop"></div>  

    <!-- Tabs -->
    <div class="d-flex justify-content-around border-top border-bottom pt-1" id="tabs" @click="selectTab($event)">
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
              <span class="input-group-text rounded-pill border-right-0" id="basic-addon1">
                <i class="material-icons">search</i>
              </span>
            </div>
            <input id="search-box" type="text" class="fc rounded-pill border-left-0 pl-0" placeholder="Search to select member" v-model="inputName" @keyup="filterList" @click="focus=true">
            <img src="../assets/close-circle.svg" v-if="focus" @click="clearAndFocus" alt="clear_icon" id="clear_icon">
          </div>
        </div>
      </div>

      <div id="members-container" v-if="focus">
        <member v-for="member in membersData" :member="member" id="member.memberId" :key="member.memberId"></member>
        <p class="text-center text-monospace" v-show="!memberCount">No such member</p>
      </div>

    </div>
  </div>
</template>

<script>
import Member from './member.vue'

export default {
  components: {
    'member': Member
  },
  data() {
    return {
      membersData: null,
      inputName: "",
      selectedTab: "",
      focus: false,
      memberCount: null
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
    },
    selectTab(e) {
      if(e.target.classList.contains("tab")) {
        this.selectedTab = e.target.textContent;
        // console.log('yo', this.selectedTab);
        const activeTab = document.querySelector(".active");
        if(e.target == activeTab) return;
        else {
          activeTab.classList.remove("active");
          e.target.classList.add("active");
        }
      }
    },
    clearAndFocus() {
      this.inputName = "";
      document.getElementById("search-box").select();
      this.filterList();
    },  
  },
  mounted() {
    this.getMembers();
    let topNavBarHeight = document.getElementById("Nav").offsetHeight;
    document.getElementById("offsetTop").style.height = topNavBarHeight + "px";
  }
}
</script>

<style>
  #basic-addon1 {
    color: #A8A7B1;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  #basic-addon1,  input[type="text"] { 
    border-color: #E5E5E5;
    background-color: #fafafa !important;
  }

  input[type="text"], .form-control:focus {
    border-color: #E5E5E5;
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

  .input-group img{
    position: absolute;
    top: 24%;
    right: 3%;
    width: 16px;
    height: auto;
    border-radius: 50%;
  }

  /* Bootstrap's form-control class without any sideeffects  */
  .fc {
    height: calc(1.5em + .5rem + 2px);
    padding: .25rem .5rem;
    font-size: .875rem;
    line-height: 1.5;
    position: relative;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
    margin-bottom: 0;
    border-color: #E5E5E5;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    display: block;
    font-weight: 400;
    color: #495057;
    border: 1px solid #ced4da;
    background-clip: padding-box;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
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
    color: #6B6A6AE6;
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
    border-top: 5px solid #31399C;
  }

  #forward-icon {
    position: absolute;
    right: 0%;
    font-size: 16px !important;
  }
</style>