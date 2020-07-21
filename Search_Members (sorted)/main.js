import routes from "./routes.js"

const router = new VueRouter({
  routes,
  mode: "history"
});

const app = new Vue({
  router
}).$mount('#app');