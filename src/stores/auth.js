import { reactive } from "vue";
import { defineStore } from "pinia";
import { auth } from "@/assets/javascript/setting/firebase.js";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useFirebase } from "@/composables/useFirebase.js";

export const useAuthStore = defineStore("auth", () => {
  const userInfo = reactive({
    isLogin: false,
    name: "",
    photo: "",
    uid: "",
    permission: "",
  });

  auth.onAuthStateChanged(function (user) {
    if (user) {
      userInfo.isLogin = true;
      userInfo.name = user.displayName;
      userInfo.photo = user.photoURL;
      userInfo.uid = user.uid;
      const { data } = useFirebase("get", `users/${user.uid}/permission`);
      userInfo.permission = data;
    } else {
      userInfo.isLogin = false;
      userInfo.name = "";
      userInfo.photo = "";
      userInfo.uid = "";
    }
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
  });

  const login = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        // const user = result.user;
        console.log(result);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error("errorCode", errorCode);
        console.error("errorMessage", errorMessage);
        console.error("email", email);
        console.error("credential", credential);
      });
  };

  const logout = () => {
    userInfo.isLogin = false;
    userInfo.name = "";
    userInfo.photo = "";
    userInfo.uid = "";
    signOut(auth);
  };

  return { userInfo, login, logout };
});
