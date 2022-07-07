<template>
  <Dock :model="dockItems" position="left">
    <template #item="{ item }">
      <a
        v-tooltip.right="item.label"
        style="cursor: pointer"
        href="#"
        class="p-dock-action"
        @click="onDockItemClick($event, item)"
      >
        <img :alt="item.label" :src="item.icon" style="width: 100%" />
      </a>
    </template>
  </Dock>
  <!--  <Dock :model="dockItems" position="right">-->
  <!--    <template #icon="{ item }">-->
  <!--      <img :alt="item.label" :src="item.icon" style="width: 100%" />-->
  <!--    </template>-->
  <!--  </Dock>-->
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Dock from 'primevue/dock';
  import type { MenuItem } from 'primevue/menuitem';
  import { useRouter } from 'vue-router';
  import { routerPath } from '/@/router/constant';

  const router = useRouter();

  const dockItems = ref<MenuItem[]>([
    {
      label: '首页',
      icon: 'src/assets/icons/home.svg',
      command() {
        router.push({
          name: routerPath.home
        });
      }
    },
    {
      label: '接口管理',
      icon: 'src/assets/icons/cloud.svg',
      command() {
        router.push({
          name: routerPath.api
        });
      }
    },
    {
      label: '日志查看',
      icon: 'src/assets/icons/book.svg',
      command() {
        router.push({
          name: routerPath.logs
        });
      }
    },
    {
      label: '用户管理',
      icon: 'src/assets/icons/user.svg',
      command() {
        router.push({
          name: routerPath.users
        });
      }
    }
  ]);

  const onDockItemClick = (event: any, item: MenuItem) => {
    if (item.command) {
      item.command(event);
    }

    event.preventDefault();
  };
</script>

<style scoped></style>
