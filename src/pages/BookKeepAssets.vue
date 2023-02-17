<script setup>
import CustomModal from "@/components/CustomModal.vue";
import { ref } from "vue";
const showModal = ref(true);
</script>
<template>
  <h1 class="page-title">Assets</h1>
  <button @click="showModal = true">123123</button>
  <CustomModal v-if="showModal" v-model="showModal" title="NEW Asset" />
</template>
