<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConflictStore } from '../stores/conflictStore'
import ConflictCard from '../components/ConflictCard.vue'

const router = useRouter()
const store = useConflictStore()

const search = ref('')
const filterStatus = ref('')
const showForm = ref(false)
const form = ref({ nombre: '', descripcion: '', estado: 'ACTIVO', fecha_inicio: '' })

onMounted(() => store.fetchConflicts())

const filtered = computed(() =>
  store.conflicts.filter(c => {
    const matchSearch = !search.value ||
      c.nombre?.toLowerCase().includes(search.value.toLowerCase())
    const matchStatus = !filterStatus.value || c.estado === filterStatus.value
    return matchSearch && matchStatus
  })
)

async function submitForm() {
  if (!form.value.nombre.trim()) return
  const ok = await store.createConflict(form.value)
  if (ok) {
    showForm.value = false
    form.value = { nombre: '', descripcion: '', estado: 'ACTIVO', fecha_inicio: '' }
  }
}
</script>

<template>
  <div class="page">
    <header>
      <h1>Monitor de Conflictes Globals</h1>
      <p>Total: {{ store.conflicts.length }} | Actius: {{ store.activeCount }}</p>
    </header>

    <div class="controls">
      <input v-model="search" type="text" placeholder="Cercar conflicte..." />
      <select v-model="filterStatus">
        <option value="">Tots</option>
        <option value="ACTIVO">Actiu</option>
        <option value="CONGELADO">Congelat</option>
        <option value="FINALIZADO">Finalitzat</option>
      </select>
      <button @click="showForm = !showForm">
        {{ showForm ? 'Cancel·lar' : 'Nou conflicte' }}
      </button>
    </div>

    <div v-if="showForm" class="form-box">
      <h2>Nou Conflicte</h2>
      <div class="form-row">
        <label>Nom</label>
        <input v-model="form.nombre" type="text" placeholder="Nom del conflicte" />
      </div>
      <div class="form-row">
        <label>Estat</label>
        <select v-model="form.estado">
          <option value="ACTIVO">Actiu</option>
          <option value="CONGELADO">Congelat</option>
          <option value="FINALIZADO">Finalitzat</option>
        </select>
      </div>
      <div class="form-row">
        <label>Data d'inici</label>
        <input v-model="form.fecha_inicio" type="date" />
      </div>
      <div class="form-row">
        <label>Descripció</label>
        <textarea v-model="form.descripcion" rows="3" placeholder="Descripció..."></textarea>
      </div>
      <button class="btn-submit" @click="submitForm">Crear</button>
      <p v-if="store.error" class="error">{{ store.error }}</p>
    </div>

    <div v-if="store.isLoading" class="msg">Carregant...</div>
    <div v-else-if="store.error && !showForm" class="msg error">{{ store.error }}</div>
    <div v-else-if="filtered.length === 0" class="msg">No hi ha resultats.</div>

    <div v-else class="grid">
      <ConflictCard
        v-for="c in filtered"
        :key="c.id"
        :conflict="c"
        @view-details="id => router.push(`/conflicts/${id}`)"
      />
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 1100px; margin: 0 auto; padding: 2rem 1rem; }

header { margin-bottom: 1.5rem; }
header h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
header p { color: #666; font-size: 0.9rem; }

.controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}
.controls input, .controls select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}
.controls input { flex: 1; min-width: 180px; }
.controls button {
  padding: 0.5rem 1rem;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.controls button:hover { background: #555; }

.form-box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
.form-box h2 { margin-bottom: 1rem; font-size: 1.1rem; }
.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
}
.form-row label { font-size: 0.85rem; font-weight: 600; color: #555; }
.form-row input, .form-row select, .form-row textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  font-family: inherit;
}
.btn-submit {
  padding: 0.5rem 1.25rem;
  background: #2c7a2c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-submit:hover { background: #388e38; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
.msg { text-align: center; padding: 3rem; color: #888; }
.error { color: #c0392b; font-size: 0.85rem; margin-top: 0.5rem; }
</style>
