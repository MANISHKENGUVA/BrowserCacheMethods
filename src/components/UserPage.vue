<template>
  <div style="margin-top: 20px;">
    <h2>User: {{ $route.params.username || "ji" }}</h2>

    <input
      v-model="search"
      placeholder="Type search query"
      style="padding: 8px; width: 300px;"
    />

    <p><strong>Current search query:</strong> "{{ search }}"</p>
    <p><strong>Cached for /user:</strong> "{{ currentStoredQuery }}"</p>
    <pre><strong>In-memory Cache (queriesByRoute):</strong> {{ queriesByRoute }}</pre>
  </div>
</template>

<script>
const STORAGE_KEY = 'atlassian.search-dialog-query'
const queriesByRoute = {}
const channel = new BroadcastChannel('user-search-channel')

export default {
  name: 'UserPage',

  data() {
    return {
      search: ''
    }
  },

  computed: {
    isUserRoute() {
      return this.$route.path === '/user'
    },
    currentStoredQuery() {
      return queriesByRoute['/user'] || ''
    },
    queriesByRoute() {
      return queriesByRoute
    }
  },

  watch: {
    search(newVal) {
      if (this.isUserRoute) {
        queriesByRoute['/user'] = newVal
        sessionStorage.setItem(STORAGE_KEY, newVal)
        channel.postMessage({ path: '/user', value: newVal }) // Cross-tab broadcast
      }
    },

    '$route.path': {
      immediate: true,
      handler() {
        if (this.isUserRoute) {
          if (queriesByRoute['/user']) {
            this.search = queriesByRoute['/user']
          } else {
            const stored = sessionStorage.getItem(STORAGE_KEY) || ''
            this.search = stored
            queriesByRoute['/user'] = stored
          }
        } else {
          this.search = ''
        }
      }
    }
  },

  mounted() {
    channel.onmessage = (event) => {
      const { path, value } = event.data || {}
      if (path === '/user') {
        queriesByRoute['/user'] = value
        sessionStorage.setItem(STORAGE_KEY, value)
        if (this.isUserRoute) {
          this.search = value
        }
      }
    }
  },

  beforeDestroy() {
    channel.close()
  }
}
</script>
