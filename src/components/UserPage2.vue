<template>
    <div class="container mt-4">
      <h3 class="mb-3">User: {{ $route.params.username || 'Guest' }}</h3>
  
      <div class="alert alert-secondary" v-if="search">
        <strong>Search received:</strong> {{ search }}
      </div>
      <div v-else class="text-muted">
        Waiting for search input from another tab...
      </div>
    </div>
  </template>
  
  <script>
  const STORAGE_KEY = 'atlassian.search-dialog-query'
  const channel = new BroadcastChannel('user-search-channel')
  
  export default {
    name: 'UserSearchListener',
    data() {
      return {
        search: ''
      }
    },
  
    mounted() {
      // Initial sessionStorage fetch
      this.search = sessionStorage.getItem(STORAGE_KEY) || ''
  
      // Listen for messages
      channel.onmessage = (event) => {
        const { path, value } = event.data || {}
        if (path === '/user') {
          this.search = value
          sessionStorage.setItem(STORAGE_KEY, value) // Optional: keep it in sync
        }
      }
    },
  
    beforeDestroy() {
      channel.close()
    }
  }
  </script>
  