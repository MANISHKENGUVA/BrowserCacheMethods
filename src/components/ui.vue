<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Global in-memory store for queries by route path
const queriesByRoute = {}

// SessionStorage key to sync current query string
const STORAGE_KEY = 'atlassian.search-dialog-query'

const route = useRoute()
const search = ref('')

// Save the current route path (including params) for keying queries
const routeKey = route.fullPath

// On mount, load query from memory or fallback to sessionStorage
onMounted(() => {
  if (queriesByRoute[routeKey]) {
    search.value = queriesByRoute[routeKey]
  } else {
    search.value = sessionStorage.getItem(STORAGE_KEY) || ''
    queriesByRoute[routeKey] = search.value
  }
})

// Watch the input and keep both in-memory and sessionStorage updated
watch(search, (newVal) => {
  queriesByRoute[routeKey] = newVal
  sessionStorage.setItem(STORAGE_KEY, newVal)
})
</script>

<template>
  <div style="margin-top: 20px;">
    <h2>User: {{ route.params.username }}</h2>
    <input
      v-model="search"
      placeholder="Type search query"
      style="padding: 8px; width: 300px;"
    />
    <p>Current stored query for this page: "{{ queriesByRoute[route.fullPath] }}"</p>
  </div>
</template>
