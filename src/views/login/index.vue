<template>
  <div class="bc">
    <SvgIcon name="waves" width="100%" height="110%"></SvgIcon>
    <div class="loginBox">
      <div class="loginTitle">
        <div class="loginAvatar">Mock Api</div>
      </div>
      <div class="loginForm">
        <div>
          <div class="p-inputgroup field" style="width: 300px">
            <span class="p-inputgroup-addon loginInput">
              <i class="pi pi-user"></i>
            </span>
            <InputText v-model="user.account" class="loginInput" type="text" placeholder="用户名 / 邮箱" />
          </div>
          <small v-show="userNamePrefix.show" id="username-help" class="p-error">{{ userNamePrefix.msg }}</small>
        </div>
        <div>
          <div class="p-inputgroup" style="width: 300px">
            <span class="p-inputgroup-addon loginInput">
              <i class="pi pi-lock"></i>
            </span>
            <InputText v-model="user.pwd" class="loginInput" type="password" placeholder="密码" />
          </div>
          <small v-show="passwordPrefix.show" id="password-help" class="p-error">{{ passwordPrefix.msg }}</small>
        </div>
        <Button
          label="登录"
          class="p-button-raised"
          style="width: 300px; background: #46ddc8; border: 1px solid #46ddc8"
          :loading="loginLoading"
          @click="login"
        />
        <div class="loginDesc">
          <Button label="快速注册" class="p-button-link buttonLink" />|
          <Button label="忘记密码?" class="p-button-link buttonLink" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import SvgIcon from '/@/components/SvgIcon/index.vue';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';

  const loginLoading = ref(false);

  const user = reactive({
    account: '',
    pwd: ''
  });
  const userNamePrefix = reactive({ show: false, msg: '请输入用户名！' });
  const passwordPrefix = reactive({ show: false, msg: '请输入密码！' });

  const prefix = () => {
    let pass = true;
    userNamePrefix.show = false;
    passwordPrefix.show = false;
    if (user.account === '') {
      userNamePrefix.show = true;
      pass = false;
    }
    if (user.pwd === '') {
      passwordPrefix.show = true;
      pass = false;
    }
    return pass;
  };
  const login = () => {
    const pass = prefix();
    if (!pass) {
      return;
    }

    // 验证通过，展示 loading
    loginLoading.value = true;

    console.log('登录');
    loginLoading.value = false;
  };
</script>

<style scoped>
  .bc {
    width: 100vw;
    height: 100vh;
    /*background: #ff0938;*/
    overflow: hidden;
  }
  .loginBox {
    width: 400px;
    height: 300px;
    position: absolute;
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    border-radius: 12px;
    -webkit-border-radius: 12px;
    color: rgba(255, 255, 255, 0.75);
  }
  .loginTitle {
    width: 100%;
    height: 20%;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
  }
  .loginAvatar {
    width: 200px;
    height: 60px;
    border-radius: 10px;
    background: rgba(6, 212, 215, 0.5);
    backdrop-filter: blur(6px);
    position: relative;
    top: -20px;
    color: #ffffff;
    margin: 0 auto;
    line-height: 60px;
  }
  .loginForm {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 80%;
  }
  .loginInput {
    background-color: rgba(200, 200, 200, 0.25);
    /*color: #ffffff;*/
  }
  .loginDesc {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #ffffff;
  }
  .buttonLink {
    color: #ffffff;
    font-size: 14px;
  }
</style>
