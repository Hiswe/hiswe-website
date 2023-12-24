<script setup lang="ts">
defineProps<{
  name: string,
}>()
</script>

<template>
  <span>icon-{{ name }}</span>
</template>