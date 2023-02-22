<script setup>
import { pages } from "@/assets/javascript/setting/nav.js";
import { reactive, computed } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import CustomButton from "@/components/CustomButton.vue";

const authStore = useAuthStore();
const userInfo = reactive(authStore.userInfo);
const { login, logout } = authStore;

const logBtnWord = computed(() => (userInfo.isLogin ? "LOG OUT" : "LOG IN"));
const logHandler = () => {
  if (userInfo.isLogin) return logout();
  login();
};
</script>

<template>
  <div class="header-wrapper">
    <div class="header flex-vertical-center">
      <router-link to="/" class="title"> B591ank</router-link>
      <div class="header-right flex-vertical-center">
        <nav>
          <ul class="flex">
            <li v-for="page in pages" :key="page" class="transition">
              <router-link :to="page.route">
                {{ page.name }}
              </router-link>
            </li>
          </ul>
        </nav>
        <CustomButton
          class="log-btn"
          :word="logBtnWord"
          size="tag"
          @click="logHandler"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-wrapper {
  position: sticky;
  top: 0;
  width: 100vw;
  border-bottom: 1px solid var(--border-clr);
  backdrop-filter: blur(5px);

  .header {
    max-width: var(--container-width);
    height: var(--header-height);
    margin: 0 auto;
    padding: 0 2rem;
    justify-content: space-between;
    .title {
      font-size: 25px;
      color: var(--main-clr);
      font-family: "Press Start 2P", cursive;
    }

    .header-right {
      nav {
        ul {
          border-right: 1px solid var(--border-clr);
          li {
            margin-right: 2rem;
            &:hover,
            &.active {
              color: var(--main-clr);
            }
          }
        }
      }

      .github-icon {
        width: 20px;
        height: 20px;
        margin-left: 2rem;
        cursor: pointer;
        opacity: 0.5;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}

:deep(.log-btn.tag) {
  margin-left: 26px;
  padding: 2px 10px;
}
</style>
