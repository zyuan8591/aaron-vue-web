<script setup>
import { onMounted, onUnmounted, useSlots, reactive } from "vue";
import CustomButton from "@/components/CustomButton.vue";
import { useEventListener } from "@/composables/useEventListener.js";
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
const emit = defineEmits(["update:modelValue", "confirm"]);
const body = document.querySelector("body");

const state = reactive({ slots: {} });

useEventListener(window, "keydown", () => emit("update:modelValue", false));

onMounted(() => {
  body.classList.add("not-scroll");
  state.slots = useSlots();
});
onUnmounted(() => {
  body.classList.remove("not-scroll");
});
</script>
<template>
  <div class="modal-container" @click.self="emit('update:modelValue', false)">
    <div class="modal normal-container">
      <h2 v-if="props.title" class="page-title">{{ props.title }}</h2>
      <div v-if="state.slots.modalBody" class="modal-body">
        <slot name="modalBody" />
      </div>
      <div class="modal-footer">
        <slot name="modalFooter" />
        <div v-if="!state.slots.modalFooter" class="btn-group">
          <CustomButton
            word="Cancel"
            @click="emit('update:modelValue', false)"
          />
          <CustomButton word="Confirm" @click="emit('confirm')" />
        </div>
      </div>
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
    min-width: 280px;
    max-width: 400px;

    .modal-footer {
      margin-top: 1rem;

      .btn-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
