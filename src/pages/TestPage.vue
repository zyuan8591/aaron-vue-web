<script setup>
import { postTest } from "@/assets/javascript/api.js";
import { db } from "@/assets/javascript/setting/firebase.js";
import { ref, onValue } from "firebase/database";
import { reactive, watchEffect } from "vue";
// Pinia
import { useAuthStore } from "@/stores/auth.js";
// import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const userInfo = reactive(authStore.userInfo);
const { login, logout } = authStore;
watchEffect(
  () => userInfo,
  () => console.log(userInfo)
);

const postTestClicker = async () => {
  const data = { name: "kevin", age: 26, birthday: "1997-11-29" };
  try {
    await postTest(data);
    console.log("success");
  } catch (e) {
    console.error(e);
  }
};

const starCountRef = ref(db, `test`);
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});
</script>
<template>
  <h1>hello</h1>
  <div>{{ userInfo }}</div>
  <button @click="postTestClicker">postTest</button>
  <button v-if="!userInfo.isLogin" @click="login">Login</button>
  <button v-else @click="logout">Logout</button>
</template>
<style scoped lang="scss">
button {
  display: block;
  margin: 10px 0;
}
</style>
