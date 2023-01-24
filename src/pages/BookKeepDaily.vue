<script setup>
import CustomButton from "@/components/CustomButton.vue";
import TagMenu from "@/components/TagMenu.vue";
import { reactive, computed } from "vue";

const state = reactive({
  tagNow: "expense",
  menuList: [
    { name: "Expense", value: "expense" },
    { name: "Revenue", value: "revenue" },
  ],
  expenseType: [
    { name: "Luuch", icon: "lunch" },
    { name: "Dinner", icon: "dinner" },
    { name: "YT premium", icon: "youtube" },
    { name: "Traffic", icon: "train" },
    { name: "Drink", icon: "drink" },
    { name: "Game", icon: "game" },
    { name: "New", icon: "plus" },
  ],
  revenueType: [
    { name: "Salary", icon: "salary" },
    { name: "Other", icon: "money" },
    { name: "New", icon: "plus" },
  ],
});

const showTypList = computed(() => {
  switch (state.tagNow) {
    case "expense":
      return state.expenseType;
    case "revenue":
      return state.revenueType;
  }
  return [];
});
</script>

<template>
  <h1 class="page-title">Daily Consumption</h1>
  <TagMenu :menu="state.menuList" v-model="state.tagNow" />
  <ul class="type-btn-group">
    <li v-for="typ in showTypList" :key="typ.name" class="type-btn">
      <CustomButton :word="typ.name">
        <template v-if="typ.icon" #icon>
          <div class="center icon" :class="`${typ.icon}-icon`" />
        </template>
      </CustomButton>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.menu-container {
  margin-bottom: 24px;
}

.type-btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.icon {
  height: 20px;
  width: 20px;
  margin-right: 6px;
}
</style>
