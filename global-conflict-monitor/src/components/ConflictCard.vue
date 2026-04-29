<script setup>
import BaseCard from './BaseCard.vue'
import { computed } from 'vue'

const props = defineProps(['conflict'])
const emit = defineEmits(['view-details'])

const statusColors = { ACTIVO: '#e74c3c', CONGELADO: '#2980b9', FINALIZADO: '#27ae60' }
const statusLabels = { ACTIVO: 'Actiu', CONGELADO: 'Congelat', FINALIZADO: 'Finalitzat' }

const formattedDate = computed(() => {
  if (!props.conflict.fecha_inicio) return '—'
  return new Date(props.conflict.fecha_inicio).toLocaleDateString('ca-ES', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
})
</script>

<template>
  <BaseCard>
    <template #header>
      <div class="header">
        <h3>{{ conflict.nombre || 'Sense nom' }}</h3>
        <span class="badge" :style="{ backgroundColor: statusColors[conflict.estado] }">
          {{ statusLabels[conflict.estado] || conflict.estado }}
        </span>
      </div>
    </template>

    <p class="desc">{{ conflict.descripcion || 'Sense descripció.' }}</p>
    <p class="date">{{ formattedDate }}</p>

    <template #footer>
      <button @click="emit('view-details', conflict.id)">Veure detalls</button>
    </template>
  </BaseCard>
</template>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.75rem; }
h3 { font-size: 0.95rem; font-weight: 600; }
.badge { color: #fff; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; }
.desc { font-size: 0.85rem; color: #666; line-height: 1.4; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; margin-bottom: 0.5rem; }
.date { font-size: 0.8rem; color: #999; }
button { width: 100%; padding: 0.5rem; background: #fff; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
button:hover { background: #f0f0f0; }
</style>
