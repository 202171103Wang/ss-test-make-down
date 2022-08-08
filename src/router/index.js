import MainPage from "../view/main-page/index.vue";
import MakeDown from "../view/make-down/index.vue";
import * as VueRouter from "vue-router";
const routes = [
  { path: "/", component: MainPage, redirect: "/Main" },
  {
    path: "/Main",
    component: MainPage,
  },
  { path: "/toMakeDown", component: MakeDown },
];
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});
export default router;
