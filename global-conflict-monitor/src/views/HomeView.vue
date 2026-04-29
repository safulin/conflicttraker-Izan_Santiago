<script setup>
import { onMounted } from 'vue'
import { useConflictStore } from '../stores/conflictStore'
import ConflictCard from '../components/ConflictCard.vue'

const store = useConflictStore()

onMounted(() => {
  store.fetchConflicts()
})
</script>

<template>
  <div class="container">
    <h1>Monitor de Conflictes Globals</h1>
    
    <div v-if="store.isLoading" class="loading">
      Carregant dades del backend...
    </div>
    
    <div v-else>
      <p class="summary">Conflictes Actius: <strong>{{ store.activeConflictsCount || 0 }}</strong></p>
      
      <div class="conflict-grid">
        <ConflictCard
          v-for="conflict in store.conflicts"
          :key="conflict.id"
          :conflict="conflict"
          @view-details="(id) => console.log('Obrint detalls:', id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
.summary { font-size: 1.2rem; margin-bottom: 2rem; }
.loading { font-size: 1.5rem; text-align: center; margin-top: 3rem; color: #666; }
.conflict-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
</style>