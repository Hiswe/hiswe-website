<script setup lang="ts">
import { nanoid } from 'nanoid'

import { type Notification, type NotificationType, notificationKey } from '~/composables/inject-keys'

defineSlots<{
  default(): any
}>()

const notifications = ref<Notification[]>([])

function addNotification(message: string, type: NotificationType) {
  notifications.value.push({ id: nanoid(), message, type })
}
function removeNotification(id: string) {
  const messageIndex = notifications.value.findIndex(message => message.id === id)
  notifications.value.splice(messageIndex, 1)
}

provide(notificationKey, {
  notifications,
  addNotification,
  removeNotification,
})
</script>

<template>
  <main role="main">
    <MainNavigation />
    <slot />
    <NotificationsList />
  </main>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

main {
  min-height: 100vh;

  @media #{$mq-big} {
    display: grid;
    grid-template-columns: 2fr 1fr 3fr;
    grid-template-rows: 70px auto;
    grid-template-areas:
      '.            .            main-nav'
      'main-content main-content main-content';
  }
}
</style>
