<script setup>
import { postTest } from "@/assets/javascript/api.js";
import { db } from "@/assets/javascript/setting/firebase.js";
import { ref, onValue } from "firebase/database";

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
  <button @click="postTestClicker">postTest</button>
</template>
