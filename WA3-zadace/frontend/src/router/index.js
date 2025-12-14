import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/Home.vue"),
      name: "Home",
    },
    {
      path: "/pizze/:naziv",
      component: () => import("../views/SinglePizza.vue"),
      name: "SinglePizza",
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
