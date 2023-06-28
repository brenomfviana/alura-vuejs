<template>
  <div class="box has-text-weight-bold" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "Box",
  data() {
    return {
      styles: {
        background: "#faf0ca",
      },
    };
  },
});
</script>
