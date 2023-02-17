<script setup>
import WebHeader from "@/components/WebHeader.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <WebHeader />
  <div class="main-container flex">
    <SideBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  max-width: var(--container-width);
  max-height: calc(100vh - var(--header-height));
  margin: 0 auto;
  padding: 40px 32px 0;

  main {
    flex: 1 1 auto;
    padding-left: calc(var(--nav-width) + 32px);
  }

  .side-container {
    height: calc(100vh - var(--header-height) - 40px);
    overflow: scroll;
  }
}
</style>
