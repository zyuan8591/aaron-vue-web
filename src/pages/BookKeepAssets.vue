<script setup>
import CustomModal from "@/components/CustomModal.vue";
import { numberWithCommas } from "@/assets/javascript/common";
import { ref, reactive, computed, watch, onMounted } from "vue";
import XSvg from "@/assets/svg/XSvg.vue";
import { useFirebase } from "@/composables/useFirebase.js";
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();
const userInfo = reactive(authStore.userInfo);
const data = ref([]);

const assets = reactive({
  data: [],
  newAsset: { name: "", amount: 0 },
});

onMounted(() => {
  if (data.value) assets.data = data.value;
});

watch(
  () => data.value,
  () => {
    assets.data = data.value;
  }
);

watch(
  () => userInfo.uid,
  () => {
    const { dbData } = useFirebase("get", `users/${userInfo.uid}/bankList`);
    data.value = dbData;
  }
);

const assetsTotal = computed(() => {
  const total = assets.data?.reduce((total, val) => total + val.amount, 0) || 0;
  return numberWithCommas(total);
});

// Modal: ADD / DEL Assets Handler
const isShowModal = ref(false);
const modalState = ref("");
const delItem = ref(0);
const showModal = (state, id = 0) => {
  isShowModal.value = true;
  delItem.value = id;
  modalState.value = state;
};
const confirmHandler = () => {
  let newData = [];
  if (modalState.value === "add") {
    const id = assets.data.length ? assets.data.at(-1)?.id + 1 : 1;
    const name = assets.newAsset.name;
    const amount = assets.newAsset.amount;
    newData = [...assets.data, { id, name, amount }];
    assets.newAsset = { name: "", amount: 0 };
  } else if (modalState.value === "del") {
    newData = [...assets.data].filter((d) => d.id !== delItem.value);
  }
  useFirebase("post", `users/${userInfo.uid}/bankList`, newData);
  isShowModal.value = false;
};
</script>
<template>
  {{ assets.data }}
  <h1 class="page-title flex-vertical-center">
    Assets <XSvg class="add-svg" @click="showModal('add')" />
  </h1>
  <div class="normal-container assets-total">TOTAL：{{ assetsTotal }}</div>
  <ul class="assets-list pb-1">
    <li
      v-for="data in assets.data"
      :key="data.id"
      class="normal-container flex-vertical-center"
    >
      <span>{{ data.name }}</span>
      <span>{{ numberWithCommas(data.amount) }}</span>
      <XSvg class="del-btn" @click="showModal('del', data.id)" />
    </li>
  </ul>
  <!-- New Bank Modal -->
  <CustomModal
    v-if="isShowModal"
    v-model="isShowModal"
    :title="modalState === 'add' ? 'NEW Asset' : 'Delete Asset'"
    @confirm="confirmHandler"
  >
    <template v-if="modalState === 'add'" #modalBody>
      <div class="form-control">
        <label for="newAssetName">Asset Name</label>
        <input type="text" id="newAssetName" v-model="assets.newAsset.name" />
      </div>
      <div class="form-control">
        <label for="newAssetAmount">Asset Amount</label>
        <input
          type="number"
          id="newAssetAmount"
          v-model="assets.newAsset.amount"
          min="0"
        />
      </div>
    </template>
  </CustomModal>
</template>
<style lang="scss" scoped>
.add-svg {
  margin-left: 10px;
  transform: rotate(45deg);
}
.assets-list {
  li {
    position: relative;
    justify-content: space-between;
    padding-right: 3rem;

    .del-btn {
      position: absolute;
      right: 1rem;
    }
  }
}

.assets-total {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: fit-content;
}
</style>
