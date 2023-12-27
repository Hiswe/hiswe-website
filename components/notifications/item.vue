<script setup lang="ts">
import { type Notification, notificationKey } from '~/composables/inject-keys'

const props = defineProps<{
  notification: Notification
}>()

const REMOVE_DELAY = 6_666
const timerId = ref<number>()
const content = ref<HTMLParagraphElement>()

const notificationProvider = inject(notificationKey)

onMounted(() => {
  timerId.value = window.setTimeout(removeNotification, REMOVE_DELAY)
  if (content.value)
    content.value.style.setProperty('--expanded', `${content.value.offsetHeight}px`)
})

onUnmounted(() => {
  if (timerId.value)
    window.clearTimeout(timerId.value)
})

function removeNotification() {
  if (!notificationProvider)
    return
  notificationProvider.removeNotification(props.notification.id)
}
</script>

<template>
  <Transition name="notification" appear>
    <div class="notification" @click="removeNotification">
      <p
        ref="content"
        class="notification__content"
        :class="`notification__content--${notification.type}`"
      >
        {{ notification.message }}
      </p>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.notification {
  transform-origin: bottom center;
  max-height: var(--expanded, 70px);
  min-height: var(--expanded, 70px);
  transition: all 0.5s;
}

.notification-leave-to-active {
  transition: all 0.25s;
}

.notification-enter,
.notification-leave-to {
  opacity: 0;
  max-height: 0;
  min-height: 0;
}

.notification__content {
  border: 1em solid rgba(0, 0, 0, 0.5);
  border-width: 1em 1em 0;
  background-color: greenyellow;
  background-clip: padding-box;
  padding: 1em;
  margin: 0;
  text-align: center;
}

.notification__content--error {
  background-color: red;
  color: white;
}
</style>
