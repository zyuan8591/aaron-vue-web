import { ref } from "vue";
import { db } from "@/assets/javascript/setting/firebase.js";
import { ref as dbRef, set, onValue } from "firebase/database";

export function useFirebase(method, route, payload) {
  if (method === "get") {
    const dbData = ref([]);
    onValue(dbRef(db, route), (snapshot) => {
      dbData.value = snapshot.val() || [];
    });

    return { dbData };
  } else if (method === "post") {
    console.log(route);
    console.log(payload);
    set(dbRef(db, route), payload);
  }
}
