<script lang="ts">
export default {
    props: {
        text: { type: String, required: true },
        active: Boolean,
    }
}
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
  color: var(--cinza, #FFFAF3);
  background: var(--cinza-claro, #F0633C);
  font-weight: 400;
}

.tag.ativa {
  color: var(--creme, #FFFAF3);
  background: var(--coral, #F0633C);
  font-weight: 700;
}
</style>
