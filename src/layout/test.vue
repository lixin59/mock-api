<template>
  <div>test page</div>
  <Button label="test toast" @click="test" />
  <Toast />
  <div>
    <p>Enter "date" to display the current date, "greet {0}" for a message and "random" to get a random number.</p>
    <Terminal welcome-message="Welcome to PrimeVue" prompt="primevue $" class="dark-demo-terminal" />
  </div>

  <Dialog v-model:visible="displayBasic">
    <template #header>
      <h3>Header</h3>
    </template>

    Content

    <template #footer>
      <Button label="No" icon="pi pi-times" class="p-button-text" @click="changeBasic" />
      <Button label="Yes" icon="pi pi-check" autofocus @click="changeBasic" />
    </template>
  </Dialog>
  <Button @click="changeBasic">dialog</Button>
</template>

<script setup lang="ts">
  import Toast from 'primevue/toast';
  import Button from 'primevue/button';
  import Terminal from 'primevue/terminal';
  import Dialog from 'primevue/dialog';
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import TerminalService from 'primevue/terminalservice';

  const displayBasic = ref(false);
  const changeBasic = () => {
    displayBasic.value = !displayBasic.value;
  };

  import { useToast } from 'primevue/usetoast';
  const toast = useToast();
  const test = () => {
    toast.add({ severity: 'info', summary: 'Info Message', detail: '测试要', life: 3000 });
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
  };
  onMounted(() => {
    TerminalService.on('command', commandHandler);
  });

  onBeforeUnmount(() => {
    TerminalService.off('command', commandHandler);
  });

  const commandHandler = (text) => {
    let response;
    const argsIndex = text.indexOf(' ');
    const command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
      case 'date':
        response = 'Today is ' + new Date().toDateString();
        break;

      case 'greet':
        response = 'Hola ' + text.substring(argsIndex + 1);
        break;

      case 'random':
        response = Math.floor(Math.random() * 100);
        break;

      default:
        response = 'Unknown command: ' + command;
    }

    TerminalService.emit('response', response);
  };
</script>

<style lang="scss" scoped>
  p {
    margin-top: 0;
  }

  ::v-deep(.dark-demo-terminal) {
    background-color: #212121;
    color: #ffffff;

    .p-terminal-command {
      color: #80cbc4;
    }
    .p-terminal-input {
      color: #28e710;
    }

    .p-terminal-prompt {
      color: #ffd54f;
    }

    .p-terminal-response {
      color: #ff0938;
    }
  }
</style>
