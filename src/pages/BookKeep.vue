<script setup>
import CustomButton from "@/components/CustomButton.vue";
import TagMenu from "@/components/TagMenu.vue";
import { reactive } from "vue";

const state = reactive({
  tagNow: "expense",
  menuList: [
    { name: "Expense", value: "expense" },
    { name: "Revenue", value: "revenue" },
  ],
});
</script>
<template>
  <h1 class="page-title">BookkeeP</h1>
  <TagMenu :menu="state.menuList" v-model="state.tagNow" />
  {{ state.tagNow }}
</template>

<style lang="scss" scoped>
.menu-container {
  margin-bottom: 24px;
}
</style>
