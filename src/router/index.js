import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
      children: [
        {
          path: "/bookkeep",
          name: "Bookkeep",
          component: () => import("@/pages/BookKeep.vue"),
        },
      ],
    },
  ],
});

export default router;
