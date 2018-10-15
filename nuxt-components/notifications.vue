<template lang="pug">
aside.notifications
  hiswe-notification(
    v-for="message in messages"
    :key="message.id"
    :message="message"
  )
</template>

<style lang="scss" scoped>
@import '~/nuxt-assets/css/scss-vars.scss';

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

<script>
import Notification from '~/nuxt-components/notification-item'

export default {
  name: `hiswe-notifications`,
  components: {
    'hiswe-notification': Notification,
  },
  computed: {
    messages() {
      return this.$store.state.notification.messages
    },
  },
}
</script>

