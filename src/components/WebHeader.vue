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
        <a
          href="https://github.com/zyuan8591/aaron-vue-web"
          class="github-icon transition"
          target="_blank"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { pages } from "@/assets/javascript/setting/nav.js";
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: sticky;
  top: 0;
  width: 100vw;
  border-bottom: 1px solid var(--border-clr);
  background: var(--header-bg);

  .header {
    max-width: var(--container-width);
    height: var(--header-height);
    margin: 0 auto;
    padding: 0 2rem;
    justify-content: space-between;
    .title {
      font-size: 25px;
      color: var(--main-clr);
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
</style>
