import { db } from "@/assets/javascript/setting/firebase.js";
import { ref, set } from "firebase/database";

/* TEST FUNCTION */

function postTest(data) {
  set(ref(db, "test/"), data);
}

export { postTest };
