<script>
import { mapState } from 'vuex'

import HisweNotification from '~/components/notifications/item.vue'

export default {
  name: `hiswe-notifications`,
  components: { HisweNotification },
  computed: {
    ...mapState(`notification`, {
      notifications: `list`,
    }),
  },
}
</script>

<template>
  <aside class="notifications">
    <HisweNotification v-for="notification in notifications" :key="notification.id" :notification="notification" />
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
