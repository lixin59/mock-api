<template>
  <svg viewBox="0 0 1440 600" preserveAspectRatio="none meet" :height="height" :width="width">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script>
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'SvgIcon',
    props: {
      prefix: {
        type: String,
        default: 'icon'
      },
      name: {
        type: String,
        required: true
      },
      color: {
        type: String,
        default: '#333'
      },
      height: {
        type: String,
        default: '100%',
        required: true
      },
      width: {
        type: String,
        default: '100%',
        required: true
      }
    },
    setup(props) {
      const symbolId = computed(() => `#${props.prefix}-${props.name}`);
      return { symbolId };
    }
  });
</script>
