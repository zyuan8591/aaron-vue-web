import { ref } from "vue";
import { db } from "@/assets/javascript/setting/firebase.js";
import { ref as dbRef, set, onValue } from "firebase/database";

export function useFirebase(method, route, payload) {
  if (method === "get") {
    const data = ref([]);
    console.log(route);
    onValue(dbRef(db, route), (snapshot) => {
      data.value = snapshot.val() || [];
    });

    return { data };
  } else if (method === "post") {
    set(dbRef(db, route), payload);
  }
}
