<script setup>
import { pages } from "@/assets/javascript/setting/nav.js";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pageNow = ref(route.path);

watch(
  () => route.path,
  () => {
    pageNow.value = route.path;
    console.log(pageNow.value);
  }
);
</script>

<template>
  <aside class="side-container">
    <ul class="nav-list">
      <li v-for="page in pages" :key="page.name" class="transition">
        <router-link
          :to="page.route"
          class="main-page flex"
          :class="{
            active: pageNow === page.route || pageNow.startsWith(page.route),
          }"
        >
          <!-- <div class="icon" :class="page.icon" /> -->
          {{ page.name }}
        </router-link>
        <ul class="sub-page">
          <li
            v-for="child in page.child"
            :key="child.name"
            class="transition"
            :class="{ active: pageNow === child.route }"
          >
            <router-link :to="child.route">{{ child.name }}</router-link>
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
    font-size: 14px;
    > li {
      .main-page {
        align-items: center;
        margin-bottom: 8px;
        border-radius: 4px;
        padding: 8px 14px;
        transition: 0.15s;

        a {
          width: 100%;
          height: 100%;
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
