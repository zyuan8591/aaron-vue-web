<script setup>
import CustomButton from "@/components/CustomButton.vue";
import TagMenu from "@/components/TagMenu.vue";
import { reactive, computed, watch, nextTick } from "vue";

const state = reactive({
  tagNow: "expense",
  menuList: [
    { name: "Expense", value: "expense" },
    { name: "Revenue", value: "revenue" },
  ],
  expenseType: [
    { name: "Lunch", icon: "lunch" },
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
  newRecord: {
    typ: "",
    amount: 0,
    note: "",
    isShow: false,
  },
});

const showTypList = computed(() => {
  if (state.tagNow === "expense") return state.expenseType;
  return state.revenueType;
});

watch(
  () => state.newRecord.typ,
  async () => {
    // console.log(newVal);
    // console.log(OldVal);
  },
  { deep: true }
);

watch(
  () => state.tagNow,
  () => (state.newRecord.isShow = false)
);

const typClickHandler = (typ) => {
  if (typ === "New") return (state.newRecord.isShow = false);
  state.newRecord.isShow = true;
  state.newRecord.typ = typ;
};

const isTypBtnActive = (name) => {
  return state.newRecord.typ === name && state.newRecord.isShow;
};
</script>

<template>
  <h1 class="page-title">Daily Consumption</h1>
  <TagMenu :menu="state.menuList" v-model="state.tagNow" />
  <ul class="type-btn-group">
    <li v-for="typ in showTypList" :key="typ.name" class="type-btn">
      <CustomButton
        :word="typ.name"
        @click="typClickHandler(typ.name)"
        :class="{ active: isTypBtnActive(typ.name) }"
      >
        <template v-if="typ.icon" #icon>
          <div class="center icon" :class="`${typ.icon}-icon`" />
        </template>
      </CustomButton>
    </li>
  </ul>
  <div
    class="newRecord transition flex"
    :class="{ active: state.newRecord.isShow }"
  >
    <!-- {{ state.newRecord.typ }} -->
    <input
      type="number"
      class="amount"
      v-model="state.newRecord.amount"
      placeholder="Amount"
    />
    <input
      type="text"
      class="note"
      v-model="state.newRecord.note"
      placeholder="Note"
    />
    <CustomButton
      word="Confirm"
      :isTransition="true"
      transitionClr="var(--main-clr)"
      class="confirm"
    />
    <CustomButton
      word="Cancel"
      :isTransition="true"
      transitionClr="var(--main-content-clr)"
      @click="state.newRecord.isShow = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.menu-container {
  margin-bottom: 24px;
}

.type-btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;

  button.active {
    background: var(--main-clr);
    color: #fff;
  }
}

.newRecord {
  height: 0;
  overflow: hidden;
  margin-bottom: 1rem;
  &.active {
    height: 41px;
  }

  input {
    margin-right: 1rem;
  }

  .confirm {
    margin-right: 0.5rem;
  }
}

.icon {
  height: 20px;
  width: 20px;
  margin-right: 6px;
}
</style>
