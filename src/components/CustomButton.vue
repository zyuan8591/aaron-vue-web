<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  word: {
    type: String,
    default: "",
  },
  isTransition: {
    type: Boolean,
    default: false,
  },
  transitionClr: {
    type: String,
    default: "",
  },
});

const transitionStyle = computed(() => {
  if (!props.isTransition) return {};
  return {
    "--button-clr": props.transitionClr,
  };
});
</script>
<template>
  <button
    class="transition"
    :style="transitionStyle"
    :class="{ 'transition-btn': props.isTransition }"
  >
    <slot name="icon" />
    {{ props.word }}
  </button>
</template>

<style lang="scss" scoped>
button {
  font-size: 14px;
  display: flex;
  border: 1px solid var(--border-clr);
  border-radius: 3px;
  background: none;
  padding: 8px 12px;
  cursor: pointer;

  &.transition-btn {
    border: 2px solid var(--button-clr);
    background: var(--button-clr);
    color: #fff;
    border-radius: 3px;
    padding: 8px 20px;
    &:hover {
      background: #fff;
      color: var(--button-clr);
    }
  }
}
</style>
