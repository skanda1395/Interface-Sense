import { searchMembers, memberView } from "./cmpts.js";

export default [
  { path: "/", component: searchMembers },
  { path: "/:id", component: memberView, props: true }
];
