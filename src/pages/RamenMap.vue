<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { reactive, ref, onMounted, watch, computed } from "vue";
import { useGeolocation } from "@vueuse/core";
import { Loader } from "@googlemaps/js-api-loader";

const { coords } = useGeolocation();

const authStore = useAuthStore();
const userInfo = reactive(authStore.userInfo);

const isMapLoading = ref(false);
const states = reactive({
  google: null,
  map: null,
  markers: null,
});

const initMap = async () => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    version: "weekly",
    libraries: ["places"],
    language: "zh-TW",
  });
  states.google = await loader.load();
  states.map = new states.google.maps.Map(document.getElementById("map"), {
    // center: { lat: 25.0425, lng: 121.5468 },
    center: { lat: coords.value.latitude, lng: coords.value.longitude },
    zoom: 14,
    mapTypeControl: false,
    fullscreenControl: false,
  });

  new states.google.maps.Marker({
    position: { lat: coords.value.latitude, lng: coords.value.longitude },
    map: states.map,
  });
};

const hasPermission = computed(() => userInfo.permission === "admin");

watch(coords, async () => {
  if (isFinite(coords.value.latitude)) {
    isMapLoading.value = false;

    await initMap();
  }
});

onMounted(async () => {
  isMapLoading.value = true;
});
</script>
<template>
  <h1 class="page-title">Ramen Map</h1>
  <div v-if="!hasPermission">請向管理員申請權限</div>
  <div v-if="hasPermission && isMapLoading" class="loader" />
  <div id="map" v-show="hasPermission && !isMapLoading"></div>
</template>
<style scoped lang="scss">
#map {
  width: 100%;
  height: 600px;
}
</style>
