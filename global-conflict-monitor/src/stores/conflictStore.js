import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL

export const useConflictStore = defineStore('conflict', {
  state: () => ({
    conflicts: [],
    currentConflict: null,
    isLoading: false,
    error: null
  }),

  getters: {
    activeCount: (state) =>
      state.conflicts.filter(c => c.estado === 'ACTIVO').length,

    frozenCount: (state) =>
      state.conflicts.filter(c => c.estado === 'CONGELADO').length,

    finishedCount: (state) =>
      state.conflicts.filter(c => c.estado === 'FINALIZADO').length
  },

  actions: {
    async fetchConflicts() {
      this.isLoading = true
      this.error = null
      try {
        const res = await fetch(`${API_URL}/api/v1/conflicts`)
        if (!res.ok) throw new Error('Error al carregar els conflictes')
        const data = await res.json()
        // Ensure it's an array, never contaminate state with error objects
        this.conflicts = Array.isArray(data) ? data : []
      } catch (err) {
        this.error = err.message
        this.conflicts = []
      } finally {
        this.isLoading = false
      }
    },

    async fetchConflictById(id) {
      this.isLoading = true
      this.error = null
      this.currentConflict = null
      try {
        const res = await fetch(`${API_URL}/api/v1/conflicts/${id}`)
        if (!res.ok) throw new Error('Conflicte no trobat')
        const data = await res.json()
        this.currentConflict = data
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },

    async createConflict(payload) {
      this.error = null
      try {
        const res = await fetch(`${API_URL}/api/v1/conflicts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (!res.ok) throw new Error('Error al crear el conflicte')
        await this.fetchConflicts()
        return true
      } catch (err) {
        this.error = err.message
        return false
      }
    }
  }
})
