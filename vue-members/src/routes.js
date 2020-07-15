import searchMembers from "./components/searchMembers.vue";
import memberView from "./components/memberView.vue";

export default [
  { path: "/", component: searchMembers },
  { path: "/:id", component: memberView, props: true }
];
