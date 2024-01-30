<script lang="ts">
export default {
  props: {
    text: { type: String, required: true },
    active: Boolean,
  },
};
</script>

<template>
  <span :class="['tag', { ativa: active }]">
    {{ text }}
  </span>
</template>

<style scoped>
.tag {
  display: inline-block;
  border-radius: 0.5rem;
  min-width: 4.25rem;
  padding: 0.5rem;
  text-align: center;
  transition: 0.2s;
  color: var(--cinza, #fffaf3);
  background: var(--cinza-claro, #f0633c);
  font-weight: 400;
}

.tag.ativa {
  color: var(--creme, #fffaf3);
  background: var(--coral, #f0633c);
  font-weight: 700;
}
</style>
