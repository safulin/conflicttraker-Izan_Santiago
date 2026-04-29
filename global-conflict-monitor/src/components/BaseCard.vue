<template>
  <div class="card">
    <div v-if="$slots.header"><slot name="header" /></div>
    <slot />
    <div v-if="$slots.footer" class="footer"><slot name="footer" /></div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.footer { margin-top: auto; padding-top: 0.5rem; }
</style>
