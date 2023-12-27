<script setup lang="ts">
import { notificationKey } from '~/composables/inject-keys'

const notificationProvider = inject(notificationKey)
</script>

<template>
  <aside v-if="notificationProvider?.notifications" class="notifications fixed bottom-0 left-1/2 w-full -translate-x-1/2 flex flex-col-reverse">
    <NotificationsItem
      v-for="notification in notificationProvider.notifications.value"
      :key="notification.id"
      :notification="notification"
    />
  </aside>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.notifications {
  max-width: $stop-medium;
}
</style>
