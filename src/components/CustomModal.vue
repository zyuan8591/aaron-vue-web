<script setup>
import { onMounted, onUnmounted } from "vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
const body = document.querySelector("body");

onMounted(() => {
  body.classList.add("not-scroll");
});
onUnmounted(() => {
  body.classList.remove("not-scroll");
});
</script>
<template>
  <div class="modal-container" @click.self="emit('update:modelValue', false)">
    <div class="modal normal-container">
      <h2 v-if="props.title" class="page-title">{{ props.title }}</h2>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--light-main-bg);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    margin: 0 32px;
    flex-grow: 1;
    max-width: 500px;
  }
}
</style>
