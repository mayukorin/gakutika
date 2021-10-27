import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import InteractJsTrial from "../views/InteractJsTrial.vue";
import In2 from "../views/In2.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/trial",
    name: "Trial",
    component: InteractJsTrial,
  },
  {
    path: "/trial2",
    name: "Trial2",
    component: In2
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
