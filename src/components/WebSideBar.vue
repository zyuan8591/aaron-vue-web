<script setup>
import SearchIcon from "@/assets/svg/SearchIcon.vue";
import { pages } from "@/assets/javascript/setting/nav.js";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pageNow = ref(route.path);

watch(
  () => route.path,
  () => {
    pageNow.value = route.path;
  }
);
</script>

<template>
  <aside class="side-container">
    <div class="search-section">
      <SearchIcon />
      <input type="text" placeholder="Quick Search..." />
    </div>
    <ul class="nav-list">
      <li
        v-for="page in pages"
        :key="page.name"
        class="flex transition"
        :class="{ active: pageNow === page.route }"
      >
        <div class="icon" :class="page.icon" />
        <router-link :to="page.route">{{ page.name }}</router-link>
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

  .search-section {
    padding: 6px 12px 6px 8px;
    border: 1px solid var(--light-grey-clr);
    border-radius: 0.375rem;
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    svg {
      position: absolute;
      top: 50%;
      left: 8px;
      transform: translateY(-50%);
      color: var(--light-grey-clr);
    }

    input {
      padding-left: 42px;
      border: none;

      &:focus {
        outline: none;
      }
    }
  }

  .nav-list {
    li {
      margin-bottom: 1rem;
      font-size: 14px;
      align-items: center;

      &.active {
        color: var(--main-clr);
      }
      .icon {
        width: 20px;
        height: 20px;
        border: 1px solid var(--light-grey-clr);
        border-radius: 3px;
        margin-right: 1rem;
        text-transform: capitalize;
      }
    }
  }
}
</style>
