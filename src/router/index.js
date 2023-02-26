import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
      children: [
        {
          path: "/assets",
          name: "assets",
          component: () => import("@/pages/BookKeepAssets.vue"),
        },
        {
          path: "/daily",
          name: "daily",
          component: () => import("@/pages/BookKeepDaily.vue"),
        },
        {
          path: "/ramenmap",
          name: "ramenmap",
          component: () => import("@/pages/RamenMap.vue"),
        },
        {
          path: "/fitness",
          name: "fitness",
          component: () => import("@/pages/FitnessCal.vue"),
        },
        {
          path: "/test",
          name: "test",
          meta: { isAdmin: true },
          component: () => import("@/pages/TestPage.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.isAdmin) {
    console.log(authStore.userInfo.permission);
    if (authStore.userInfo.permission === "admin") {
      return next();
    } else {
      return next("/");
    }
  }
  next();
});

export default router;
