<template>
  <div class="box has-text-weight-bold">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "Box",
});
</script>

<style scoped>
.box {
  background: #faf0ca;
}
</style>
