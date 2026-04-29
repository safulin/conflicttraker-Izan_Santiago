<template>
  <div class="base-card">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts" setup>
// BaseCard component – minimal implementation
</script>

<style scoped>
.base-card {
  background-color: var(--card-bg, #fff);
  border: 1px solid var(--card-border, #e0e0e0);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
