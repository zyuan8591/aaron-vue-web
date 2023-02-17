import { db } from "@/assets/javascript/setting/firebase.js";
import { ref, set } from "firebase/database";

/* BANK FUNCTION */

function postBankList(uid, data) {
  if (!uid) return;
  set(ref(db, `users/bankList/${uid}`), data);
}

/* TEST FUNCTION */

function postTest(data) {
  set(ref(db, "test/"), data);
}

export { postBankList, postTest };
