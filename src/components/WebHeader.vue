<template>
  <div class="header-wrapper">
    <div class="header flex-vertical-center">
      <router-link to="/" class="title"> B591ank</router-link>
      <nav>
        <ul>
          <li v-for="page in state.pages" :key="page">
            <router-link :to="page.route">
              {{ page.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const state = reactive({
  pages: [{ name: "bookkeep", route: "/bookkeep" }],
});
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: sticky;
  top: 0;
  width: 100vw;
  border-bottom: 1px solid var(--border-clr);
  background: var(--header-bg);

  .header {
    width: var(--container-width);
    height: var(--header-height);
    margin: 0 auto;
    padding: 0 32px;
    .title {
      font-size: 25px;
    }
  }
}
</style>
