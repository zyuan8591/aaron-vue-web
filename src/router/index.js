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
        {
          path: "/bookkeep/assets",
          name: "BookkeepAssets",
          component: () => import("@/pages/BookKeepAssets.vue"),
        },
        {
          path: "/bookkeep/daily",
          name: "BookkeepDaily",
          component: () => import("@/pages/BookKeepDaily.vue"),
        },
        {
          path: "/ramenmap",
          name: "RamenMap",
          component: () => import("@/pages/RamenMap.vue"),
        },
        {
          path: "/fitness",
          name: "Fitness",
          component: () => import("@/pages/FitnessCal.vue"),
        },
        {
          path: "/test",
          name: "Test",
          component: () => import("@/pages/TestPage.vue"),
        },
      ],
    },
  ],
});

export default router;
