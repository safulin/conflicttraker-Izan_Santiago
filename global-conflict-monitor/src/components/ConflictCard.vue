<script setup>
import BaseCard from './BaseCard.vue'
import { computed } from 'vue'

const props = defineProps(['conflict'])
defineEmits(['view-details'])

// Calculamos la clase de color basada en el estado
const statusClass = computed(() => {
  if (props.conflict.estado === 'ACTIVO') return 'activo'
  if (props.conflict.estado === 'CONGELADO') return 'congelado'
  if (props.conflict.estado === 'FINALIZADO') return 'finalizado'
  return ''
})
</script>

<template>
  <BaseCard :class="statusClass">
    <template #header>
      <h3>{{ conflict.nombre || 'Conflicte sense nom' }}</h3>
    </template>
    
    <div class="conflict-content">
      <p><strong>Estat:</strong> {{ conflict.estado }}</p>
      <div class="flags" v-if="conflict.paises && conflict.paises.length">
        <img 
          v-for="pais in conflict.paises" 
          :key="pais" 
          :src="`https://flagcdn.com/w20/${pais.toLowerCase()}.png`" 
          width="20" 
          alt="bandera"
        />
      </div>
    </div>

    <template #footer>
      <button @click="$emit('view-details', conflict.id)">Veure Detalls</button>
    </template>
  </BaseCard>
</template>

<style scoped>
/* Clases dinámicas aplicadas al BaseCard */
.activo { border-left: 5px solid #e53935; background-color: #ffebee; }
.congelado { border-left: 5px solid #1e88e5; background-color: #e3f2fd; }
.finalizado { border-left: 5px solid #43a047; background-color: #e8f5e9; }

.flags { display: flex; gap: 8px; margin-top: 10px; }
button { padding: 8px 12px; background: #2c3e50; color: white; border: none; border-radius: 4px; cursor: pointer; }
button:hover { background: #1a252f; }
</style>