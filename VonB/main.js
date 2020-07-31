const app = new Vue({
  el: "#app",
  data: {
    navWidth: "0%",
    riskStatus: "",
    networkError: null,
    codeExpired: null
  },
  methods: {
    openNav() {
      this.navWidth = "100%";
    },
    closeNav() {
      this.navWidth = "0%";
    },
    openAS() {
      window.location.href = "./comingSoon.html";
    },
    openGP() {
      window.location.href = "https://play.google.com/store/apps/details?id=com.vonb.harry";
    }
  },
  created() {
    // Get the hash from the URL
    let url_string = window.location.href;
    let hash = new URL(url_string).hash;
    console.log(hash);

    // Fetch data associated with the retrieved hash to display risk status
    fetch("https://us-central1-vonb-app.cloudfunctions.net/userDataforQrcode?qrcode=" + hash.slice(1))
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        this.riskStatus = data.risk;
        if(!this.riskStatus) this.codeExpired = true;
        console.log(this.riskStatus);
      })
      .catch(error => {
        this.networkError = true;
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });    
  },
  mounted() {
    setTimeout(() => $("#myModal").modal("show"), 5000);
  }
});