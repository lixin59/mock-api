<template>
  <div class="appBody">
    <AppHeader />
    <div class="layout-body">
      <div class="left-box">
        <AppMenu />
      </div>
      <div class="right-box">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import AppHeader from './AppHeader/index.vue';
  import AppMenu from './AppMenu/index.vue';
</script>

<style scoped>
  .appBody {
    width: 100vw;
    height: 100vh;
    background: url('../assets/img/window.jpg');
    background-size: cover;
  }
  .layout-body {
    display: flex;
    width: 100%;
  }
  .left-box {
    width: 100px;
  }
  .right-box {
    width: calc(100% - 100px);
  }
</style>
