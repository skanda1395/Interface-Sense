const member = {
  props: ["member"],
  template: `
  <li class="list-group-item px-3 member" @click="fill_and_slide">
    <span class="name">{{ member.firstName }} {{ member.lastName }}</span><br>                        
    <span class="companyName text-muted">{{ member.firmName }}</span>
    <ion-icon name="chevron-forward-outline" class="text-secondary" size="small"></ion-icon>
  </li>
  `,
  methods: {
    fill_and_slide() {
      let input = document.getElementById("ref_list");
      input.value = this.member.firstName + " " + this.member.lastName;
      $(".appHeader, #appCapsule").slideDown("fast", () => {
        $("#list").css("position", "relative");
      });
    }
  },
  mounted() {
    console.clear();      
  }
}

const app = new Vue({
  el:"#list",
  components: {
    member
  },
  data: {
    membersList: null,
    displayList: false,
    inputName: "",
    memberCount: null
  },
  methods: {
    searchList() {
      console.log("search list invoked");
      this.displayList = true;
    },
    filterList() {
      let filterValue = this.inputName.toUpperCase();
      let membersList = document.getElementById("list");
      let members = membersList.querySelectorAll(".member");
      this.memberCount = members.length;

      for (let i = 0; i < members.length; i++) {
        // console.log('input:', filterValue, 'textContent:', members[i].textContent.toUpperCase());
        if (members[i].textContent.toUpperCase().indexOf(filterValue) > -1) {
          members[i].style.display = "";
        } 
        else {
          members[i].style.setProperty("display", "none",);
          this.memberCount--;
        }
      }
    },
    clearInput() {
      this.inputName = "";
    }
  },
  computed: {
    showClear() {
      console.log('show clear triggered!');
      return this.inputName? true: false;
    },
  },
  watch: {
    inputName: function(value) {
      if(!value) this.filterList();
      $("#reference_name input").focus();
    }
  },
  created() {
    console.log("making a request now!");
    fetch("http://164.52.195.248:8062/members")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      this.membersList = data;
    })
    .catch(error => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
  }
});