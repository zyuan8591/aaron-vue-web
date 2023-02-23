<script setup>
import CustomModal from "@/components/CustomModal.vue";
import { numberWithCommas } from "@/assets/javascript/common";
import { ref, reactive, computed, watch, onMounted } from "vue";
import XSvg from "@/assets/svg/XSvg.vue";
import { useFirebase } from "@/composables/useFirebase.js";
import { useAuthStore } from "@/stores/auth.js";
import CustomDropdown from "@/components/CustomDropdown.vue";

const authStore = useAuthStore();
const userInfo = reactive(authStore.userInfo);

const assetModel = { name: "", amount: 0, type: "cash", price: 0 };
const assets = reactive({
  data: [],
  newAsset: { ...assetModel },
  assetType: [
    { key: "Deposit / Cash", value: "cash" },
    { key: "Stock", value: "stock" },
  ],
});

// GET user's data list
const uid = JSON.parse(window.localStorage.getItem("userInfo")).uid;
const { data } = useFirebase("get", `users/${uid}/bankList`);
onMounted(() => {
  if (data.value) assets.data = data.value;
});
watch(data, () => (assets.data = data.value));

const assetsTotal = computed(() => {
  const total =
    assets.data?.reduce((total, val) => {
      let amount = val.amount;
      if (val.type === "stock") amount = val.amount * val.price;
      return total + amount;
    }, 0) || 0;
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
    const type = assets.newAsset.type;
    const price = assets.newAsset.price;
    newData = [...assets.data, { id, name, amount, type, price }];
    assets.newAsset = { ...assetModel };
  } else if (modalState.value === "del") {
    newData = [...assets.data].filter((d) => d.id !== delItem.value);
  }
  useFirebase("post", `users/${userInfo.uid}/bankList`, newData);
  isShowModal.value = false;
};
</script>
<template>
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
      <span v-if="data.type === 'cash'">
        {{ numberWithCommas(data.amount) }}
      </span>
      <span v-else>{{ numberWithCommas(data.amount * data.price) }}</span>
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
        <label for="" class="no-wrap">Asset Type</label>
        <CustomDropdown
          :options="assets.assetType"
          v-model="assets.newAsset.type"
        />
      </div>
      <div class="form-control">
        <label for="newAssetAmount">Asset Amount</label>
        <input
          type="number"
          id="newAssetAmount"
          v-model="assets.newAsset.amount"
        />
      </div>
      <div v-if="assets.newAsset.type === 'stock'" class="form-control">
        <label for="newAssetAmount">Stock Price</label>
        <input
          type="number"
          id="newAssetAmount"
          v-model="assets.newAsset.price"
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
