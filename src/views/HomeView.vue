<script setup>
import WebHeader from "@/components/WebHeader.vue";
</script>

<template>
  <WebHeader />
  <main>
    <div>Hello</div>
    <div>你好</div>
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
main {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 40px 32px 0;
  height: 300vh;
}
</style>
