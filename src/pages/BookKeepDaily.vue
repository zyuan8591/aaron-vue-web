<script setup>
import CustomButton from "@/components/CustomButton.vue";
import TagMenu from "@/components/TagMenu.vue";
import { reactive, computed, watch } from "vue";
import { numberWithCommas } from "@/assets/javascript/common";

const state = reactive({
  tagNow: "expense",
  bg: "red",
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
    // { name: "New", icon: "plus" },
  ],
  revenueType: [
    { name: "Salary", icon: "salary" },
    { name: "Other" },
    // { name: "New", icon: "plus" },
  ],
  newRecord: {
    typ: "",
    amount: 0,
    note: "",
    isShow: false,
  },
  dailyList: [
    {
      date: "2023-01-01",
      typ: "expense",
      subTyp: "Lunch",
      amount: 60,
      note: "水餃",
    },
    {
      date: "2023-01-01",
      typ: "revenue",
      subTyp: "Salary",
      amount: 40000,
      note: "薪資",
    },
  ],
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
  <ul class="daily-list">
    <li
      v-for="(item, idx) in state.dailyList"
      :key="idx"
      class="list-item normal-container"
      :class="item.typ"
    >
      <span class="subTyp">{{ item.subTyp }}</span>
      <span class="amount">{{ numberWithCommas(item.amount) }}</span>
      <!-- <div class="edit-icon" /> -->
      <CustomButton word="EDIT" size="tag" />
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
  margin-bottom: 1rem;

  button.active {
    background: var(--main-clr);
    color: #fff;
  }
}

.newRecord {
  height: 0;
  overflow: hidden;
  &.active {
    height: 41px;
    margin-bottom: 1rem;
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

.daily-list {
  display: flex;
  flex-direction: column;
  .list-item {
    border: 1px solid transparent;
    padding: 8px 12px;
    border-radius: 3px;
    display: grid;
    align-items: center;
    grid-template-columns: 100px 1fr min-content;
    gap: 1rem;

    :deep(.tag) {
      place-items: center;
      font-size: 14px;
      line-height: 14px;
    }

    &.expense {
      border-color: var(--main-clr);
      span {
        color: var(--main-clr);
      }
    }
    &.revenue {
      border-color: var(--main-green);
      span {
        color: var(--main-green);
      }
    }

    .amount {
      text-align: end;
      &::before {
        content: "$ ";
      }
    }

    .edit-icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
}
</style>
