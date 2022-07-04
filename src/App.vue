<!--<script setup lang="ts">-->
<!--  // This starter template is using Vue 3 <script setup> SFCs-->
<!--  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup-->
<!--  import HelloWorld from './components/learn/HelloWorld.vue';-->
<!--</script>-->

<template>
  <router-view />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { usePrimeVue } from 'primevue/config';
  const changeToChinese = () => {
    const primevue = usePrimeVue();
    primevue!.config!.locale!.weak = '弱';
    primevue!.config!.locale!.medium = '中';
    primevue!.config!.locale!.strong = '强';
    primevue!.config!.locale!.passwordPrompt = '请输入密码';
  };
  onMounted(() => {
    changeToChinese();
  });
</script>
