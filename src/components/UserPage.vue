<template>
  <div style="margin-top: 20px;">
    <h2>User: {{ $route.params.username }}</h2>

    <input
      v-model="search"
      @input="updateSessionStorage"
      placeholder="Type search query"
      style="padding: 8px; width: 300px;"
    />

    <p>Current stored query for this page: "{{ currentStoredQuery }}"</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      currentStoredQuery: '',
    };
  },
  mounted() {
    const storedQuery = sessionStorage.getItem('atlassian.search-dialog-query');
    this.search = storedQuery || '';
    this.currentStoredQuery = this.search;
  },
  methods: {
    updateSessionStorage() {
      sessionStorage.setItem('atlassian.search-dialog-query', this.search);
      this.currentStoredQuery = this.search;
    },
  },
};
</script>
