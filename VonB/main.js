const app = new Vue({
  el: "#app",
  data: {
    navWidth: "0%"
  },
  methods: {
    openNav() {
      this.navWidth = "100%";
    },
    closeNav() {
      this.navWidth = "0%";
    }
  }
});