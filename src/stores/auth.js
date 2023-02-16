import { reactive } from "vue";
import { defineStore } from "pinia";
import { auth } from "@/assets/javascript/setting/firebase.js";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const userInfo = reactive({
    isLogin: false,
    name: "",
    photo: "",
    googleToken: "",
  });

  const login = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        userInfo.googleToken = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        userInfo.isLogin = true;
        userInfo.name = user.displayName;
        userInfo.photo = user.photoURL;
        console.log(user);
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
    signOut(auth);
  };

  return { userInfo, login, logout };
});
