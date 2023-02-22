import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      meta: { isLogin: false },
      component: () => import("@/views/HomeView.vue"),
      children: [
        {
          path: "/bookkeep",
          name: "Bookkeep",
          meta: { isLogin: false },

          component: () => import("@/pages/BookKeep.vue"),
        },
        {
          path: "/bookkeep/assets",
          name: "BookkeepAssets",
          meta: { isLogin: false },

          component: () => import("@/pages/BookKeepAssets.vue"),
        },
        {
          path: "/bookkeep/daily",
          name: "BookkeepDaily",
          meta: { isLogin: false },

          component: () => import("@/pages/BookKeepDaily.vue"),
        },
        {
          path: "/ramenmap",
          name: "RamenMap",
          meta: { isLogin: false },

          component: () => import("@/pages/RamenMap.vue"),
        },
        {
          path: "/fitness",
          name: "Fitness",
          meta: { isLogin: false },

          component: () => import("@/pages/FitnessCal.vue"),
        },
        {
          path: "/test",
          name: "Test",
          meta: { isLogin: false },

          component: () => import("@/pages/TestPage.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log("from", from);
  console.log("to", to);
  console.log(to.meta.isLogin);
  next();
});

export default router;
