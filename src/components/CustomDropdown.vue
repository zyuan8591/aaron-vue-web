<script setup>
import { ref, computed } from "vue";
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
  <div>{{ props.modelValue }}</div>
  {{ props.options }}
  {{ currentOption }}
  <h1>hello</h1>
  <div
    class="dropdown-container"
    :style="{ width: props.width ? `${props.width}px` : auto }"
  >
    <input
      type="text"
      @click="isOpenDropdown = !isOpenDropdown"
      readonly
      :value="currentOption.key"
    />
    <div class="arrow-down" />
    <div v-if="isOpenDropdown" class="options-container normal-container">
      <div
        class="option"
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
  }

  .arrow-down {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  }

  .options-container {
    position: absolute;
    transform: translateY(40px);
    border: 1px solid --border-clr;
    width: 100%;
    margin-top: 5px;

    .option {
      line-height: 40px;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
