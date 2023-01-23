<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  menu: {
    type: Array,
    default: () => {
      return [];
    },
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const clickTagHandler = (val) => {
  emit("update:modelValue", val);
};
</script>

<template>
  <ul class="menu-container">
    <li
      v-for="tag in props.menu"
      :key="tag.name"
      :class="{ active: tag.value === props.modelValue }"
      @click="clickTagHandler(tag.value)"
    >
      {{ tag.name }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  border-bottom: 1px solid var(--border-clr);
  font-size: 14px;
  li {
    margin: 0px 0px -1px 24px;
    padding: 12px 0 10px;
    cursor: pointer;
    border-bottom: 2px solid transparent;

    &:hover {
      border-color: var(--darken-border-clr);
    }

    &.active {
      color: var(--main-clr);
      border-color: var(--main-clr);
    }

    &:first-of-type {
      margin-left: 0;
    }
  }
}
</style>
