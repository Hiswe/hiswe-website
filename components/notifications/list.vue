<script setup lang="ts">
const notifications = computed<{ id: string }[]>(() => [])
</script>

<template>
  <aside class="notifications">
    <NotificationsItem v-for="notification in notifications" :key="notification.id" :notification="notification" />
  </aside>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.notifications {
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: $stop-medium;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
}
</style>
