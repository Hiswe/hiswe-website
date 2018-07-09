<template lang="pug">
  aside.notifications
    div(
      v-for="message in messages"
      :key="message.id"
      :class="`notification notification--${message.type}`"
    )
      p {{message.content}}
</template>

<style lang="scss" scoped>
.notifications {
  position: fixed;
  bottom: 0;
}
.notification {
  background: greenyellow;
}
</style>

<script>
export default {
  name: `hiswe-notifications`,
  computed: {
    messages() {
      return this.$store.state.notification.messages
    },
  },
}
</script>

