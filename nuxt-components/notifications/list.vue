<script>
import { mapState } from 'vuex'

import HisweNotification from './item'

export default {
  name: `hiswe-notifications`,
  components: {
    HisweNotification,
  },
  computed: {
    ...mapState(`notification`, {
      notifications: `list`,
    }),
  },
}
</script>

<template lang="pug">
aside.notifications
  hiswe-notification(
    v-for="notification in notifications"
    :key="notification.id"
    :notification="notification"
  )
</template>

<style lang="scss" scoped>
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
