<script setup lang="ts">
const { data } = await useFetch('/api/users')
</script>

<template>
  <div>
    Nuxt module playground!
    <pre v-html="JSON.stringify(data, null, 2)" />
  </div>
</template>
