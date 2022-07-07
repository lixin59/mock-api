<template>
  <div class="layout-topbar">
    <TieredMenu id="user_menu" ref="menu" :model="items" :popup="true" />
    <div class="layout-topbar-start"></div>
    <div v-if="token" class="layout-topbar-end">
      <div class="topbar-submenu">
        <Button type="button" class="p-button-secondary p-button-text px-3" @click="add">
          <i class="pi pi-bell" style="font-size: 24px"></i>
        </Button>
      </div>
      <div class="topbar-submenu">
        <Button
          v-tooltip.left="userName"
          type="button"
          class="p-button-secondary p-button-text px-3"
          @click="showUserMenu"
        >
          <img
            alt="logo"
            src="https://img0.baidu.com/it/u=3705976499,876034426&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            style="width: 2rem; border-radius: 50%"
          />
        </Button>
      </div>
    </div>
    <div v-else class="layout-topbar-end">
      <div class="topbar-submenu">
        <Button type="button" class="p-button-secondary p-button-text px-3" @click="jumpToLogin"> 登录 | 注册 </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '/@/store/modules/user';
  import Button from 'primevue/button';
  // import Avatar from 'primevue/avatar';
  import TieredMenu from 'primevue/tieredmenu';
  import { useToast } from 'primevue/usetoast';
  import { useConfirm } from 'primevue/useconfirm';
  import type { MenuItem } from 'primevue/menuitem';

  const router = useRouter();
  const confirm = useConfirm();
  const toast = useToast();
  const userStore = useUserStore();

  const { userName, token } = storeToRefs(userStore);

  const jumpToLogin = () => {
    router.push({
      name: 'login'
    });
  };

  const menu = ref();
  const items = ref<MenuItem[]>([
    {
      label: '个人中心',
      icon: 'pi pi-fw pi-user'
    },
    {
      separator: true
    },
    {
      label: '退出登录',
      icon: 'pi pi-fw pi-power-off',
      command() {
        ConfirmLogout();
      }
    }
  ]);

  const ConfirmLogout = () => {
    confirm.require({
      message: '您确认要退出登录吗?',
      header: '退出登录',
      icon: 'pi pi-info-circle',
      acceptClass: 'p-button-danger',
      accept: () => {
        // 跳转到登录页
        router.push({
          name: 'login'
        });
        toast.add({ severity: 'success', summary: '登出成功', detail: `Mock Api 欢迎您下次回来`, life: 3000 });
      },
      reject: () => {}
    });
  };

  const showUserMenu = (event: any) => {
    menu.value.toggle(event);
  };
</script>

<style scoped>
  .layout-topbar {
    height: 4rem;
    /*position: fixed;*/
    width: 100%;
    z-index: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 2rem;
    border: 1px solid #eff3f8;
    background: #f3f3f3;
  }
  .layout-topbar-start {
    border-radius: 4px;
    display: flex;
  }
  .layout-topbar-end {
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-left: auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .topbar-submenu {
    display: flex;
    align-items: center;
    justify-content: center;
    /*cursor: pointer;*/
    /*width: 4rem;*/
    /*margin-right: 0.5rem;*/
    text-align: center;
  }
</style>
