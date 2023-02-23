<script setup>
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  options: {
    type: Array,
    default: function () {
      return [];
    },
  },
  modelValue: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 0,
  },
});

const closeModal = () => (isOpenDropdown.value = false);

const dropdownRef = ref(null);
onClickOutside(dropdownRef, () => closeModal());

const isOpenDropdown = ref(false);
const emit = defineEmits(["update:modelValue"]);

const currentOption = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue);
});

const changeHandler = (opt) => {
  isOpenDropdown.value = false;
  emit("update:modelValue", opt.value);
};
</script>
<template>
  <div
    class="dropdown-container"
    :style="{ width: props.width ? `${props.width}px` : '100%' }"
    ref="dropdownRef"
  >
    <input
      type="text"
      @click="isOpenDropdown = !isOpenDropdown"
      readonly
      :placeholder="currentOption.key"
    />
    <div class="arrow-down transition" :class="{ active: isOpenDropdown }" />
    <div v-if="isOpenDropdown" class="options-container normal-container">
      <div
        class="option transition"
        v-for="opt in options"
        :key="opt.value"
        @click="changeHandler(opt)"
      >
        {{ opt.key }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.dropdown-container {
  display: flex;
  flex-direction: column;
  height: 40px;
  position: relative;

  input {
    cursor: pointer;
    &::placeholder {
      color: var(--main-content-clr);
    }
  }

  .arrow-down {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    transform-origin: center;

    &.active {
      transform: translateY(-50%) rotate(-180deg);
    }
  }

  .options-container {
    position: absolute;
    transform: translateY(40px);
    border: 1px solid --border-clr;
    width: 100%;
    margin-top: 5px;
    padding: 0;

    .option {
      padding: 0 15px;
      line-height: 40px;
      cursor: pointer;
      user-select: none;
      font-size: 14px;
      margin: 5px 0;
      &:hover {
        background: var(--hover-red);
        color: #fff;
      }
    }
  }
}
</style>
