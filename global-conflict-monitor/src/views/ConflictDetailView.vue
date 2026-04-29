<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConflictStore } from '../stores/conflictStore'

const route = useRoute()
const router = useRouter()
const store = useConflictStore()

onMounted(() => store.fetchConflictById(route.params.id))

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

const statusColors = { ACTIVO: '#e74c3c', CONGELADO: '#2980b9', FINALIZADO: '#27ae60' }
const statusLabels = { ACTIVO: 'Actiu', CONGELADO: 'Congelat', FINALIZADO: 'Finalitzat' }
</script>

<template>
  <div class="page">
    <button class="back" @click="router.push('/')">← Tornar</button>

    <div v-if="store.isLoading" class="msg">Carregant...</div>
    <div v-else-if="store.error" class="msg error">{{ store.error }}</div>

    <div v-else-if="store.currentConflict" class="card">
      <div class="card-header">
        <h1>{{ store.currentConflict.nombre }}</h1>
        <span
          class="badge"
          :style="{ backgroundColor: statusColors[store.currentConflict.estado] }"
        >
          {{ statusLabels[store.currentConflict.estado] || store.currentConflict.estado }}
        </span>
      </div>

      <div class="info">
        <div class="info-item">
          <span class="label">Data d'inici</span>
          <span>{{ formatDate(store.currentConflict.fecha_inicio) }}</span>
        </div>
        <div class="info-item">
          <span class="label">Estat</span>
          <span>{{ statusLabels[store.currentConflict.estado] || store.currentConflict.estado }}</span>
        </div>
        <div class="info-item">
          <span class="label">ID</span>
          <span>#{{ store.currentConflict.id }}</span>
        </div>
      </div>

      <div class="description">
        <p class="label">Descripció</p>
        <p>{{ store.currentConflict.descripcion || 'Sense descripció.' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 700px; margin: 0 auto; padding: 2rem 1rem; }

.back {
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}
.back:hover { background: #eee; }

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1.5rem;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
h1 { font-size: 1.4rem; }

.badge {
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.info {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}
.info-item { display: flex; flex-direction: column; gap: 0.2rem; }
.label { font-size: 0.75rem; color: #888; font-weight: 600; text-transform: uppercase; }

.description p:last-child { margin-top: 0.5rem; line-height: 1.6; color: #444; }

.msg { text-align: center; padding: 3rem; color: #888; }
.error { color: #c0392b; }
</style>
