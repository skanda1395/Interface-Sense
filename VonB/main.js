const app = new Vue({
  el: "#app",
  data: {
    navWidth: "0%",
    riskStatus: "",
    networkError: true,
    codeExpired: true
  },
  methods: {
    openNav() {
      this.navWidth = "100%";
    },
    closeNav() {
      this.navWidth = "0%";
    }
  },
  created() {
    // Get the hash from the URL
    let url_string = window.location.href;
    let hash = new URL(url_string).hash;

    // Fetch data associated with the retrieved hash to display risk status
    fetch("https://us-central1-vonb-app.cloudfunctions.net/userDataforQrcode?qrcode=" + hash)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then(data => {
        this.riskStatus = data.split(' ')[0];
        console.log(this.riskStatus);
      })
      .catch(error => {
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