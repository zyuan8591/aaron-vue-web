<script setup>
import { pages } from "@/assets/javascript/setting/nav.js";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import HashIcon from "@/assets/svg/HashIcon.vue";
import { useAuthStore } from "@/stores/auth.js";

const route = useRoute();
const pageNow = ref(route.path);
const hoverPage = ref("");

const authStore = useAuthStore();

const pageList = computed(() => {
  let list = pages;
  if (authStore.userInfo.permission !== "admin") {
    const adminPage = ["/test"];
    list = list.filter((l) => !adminPage.includes(l.route));
  }
  return list;
});

const checkPageActive = (route) => {
  return pageNow.value.startsWith(route) || hoverPage.value.startsWith(route);
};

watch(
  () => route.path,
  () => {
    pageNow.value = route.path;
  }
);
</script>

<template>
  <aside class="side-container">
    <ul class="nav-list">
      <li v-for="page in pageList" :key="page.name" class="transition">
        <router-link
          :to="page.route"
          class="main-page flex"
          :class="{ active: checkPageActive(page.route) }"
          @mouseover="hoverPage = page.route"
          @mouseleave="hoverPage = ''"
        >
          <!-- <div class="icon" :class="page.icon" /> -->
          <HashIcon
            class="icon"
            :isActive="checkPageActive(page.route)"
            activeClr="#ef233c"
          />
          {{ page.name }}
        </router-link>
        <ul class="sub-page">
          <li
            v-for="child in page.child"
            :key="child.name"
            class="transition"
            :class="{ active: pageNow === child.route }"
          >
            <router-link :to="child.route" class="flex">
              {{ child.name }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
.side-container {
  top: calc(40px + var(--header-height));
  width: var(--nav-width);
  margin-right: 2rem;
  padding-bottom: 40px;
  position: fixed;

  .nav-list {
    font-size: 16px;
    > li {
      .main-page {
        align-items: center;
        margin-bottom: 8px;
        border-radius: 4px;
        padding: 8px 14px;

        .icon {
          margin-right: 10px;
        }

        &.active,
        &:hover {
          color: var(--main-clr);
          background: var(--hover-red);
        }
      }

      .sub-page {
        padding-left: 1rem;
        border-left: 1px solid var(--light-grey-clr);
        margin-left: 1px;
        li {
          margin-bottom: 8px;
          margin-left: calc(-1rem - 1px);
          padding-left: calc(1rem + 1px);
          border-left: 1px solid transparent;

          &:hover {
            border-color: var(--darken-border-clr-second);
          }
          &.active {
            border-color: var(--main-clr);
            color: var(--main-clr);
          }
        }
      }
    }
  }
}
</style>
