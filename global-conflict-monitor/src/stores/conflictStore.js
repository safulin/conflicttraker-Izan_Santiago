import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL

export const useConflictStore = defineStore('conflict', {
  state: () => ({
    conflicts: [],
    isLoading: false
  }),
  actions: {
    async fetchConflicts() {
      this.isLoading = true
      try {
        const response = await fetch(`${API_URL}/api/v1/conflicts`)
        if (!response.ok) throw new Error('Error al obtenir conflictes')
        const data = await response.json()
        this.conflicts = data
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    }
  }
})
