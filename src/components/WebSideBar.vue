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
      <li v-for="page in pages" :key="page.name" class="transition">
        <div class="main-page flex" :class="{ active: pageNow === page.route }">
          <div class="icon" :class="page.icon" />
          <router-link :to="page.route">{{ page.name }}</router-link>
        </div>
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
    font-size: 14px;
    > li {
      margin-bottom: 1rem;
      .main-page {
        align-items: center;
        margin-bottom: 12px;

        .icon {
          width: 20px;
          height: 20px;
          border: 1px solid var(--light-grey-clr);
          border-radius: 3px;
          margin-right: 1rem;
          text-transform: capitalize;
        }

        &.active {
          color: var(--main-clr);
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
