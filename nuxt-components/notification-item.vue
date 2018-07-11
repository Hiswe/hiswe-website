<template lang="pug">
transition(name="notification" appear): div.notification(@click="removeNotification")
  p(
    ref="content"
    :class="`notification__content notification__content--${message.type}`"
  ) {{message.content}}
</template>

<style lang="scss" scoped>
.notification {
  transform-origin: bottom center;
  max-height: var(--expanded, 70px);
  min-height: var(--expanded, 70px);
  transition: all 0.5s;

  &__content {
    border: 1em solid rgba(0, 0, 0, 0.5);
    border-width: 1em 1em 0;
    background-color: greenyellow;
    background-clip: padding-box;
    padding: 1em;
    margin: 0;
    text-align: center;

    &--error {
      background-color: red;
      color: white;
    }
  }
  &-leave-to-active {
    transition: all 0.25s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    max-height: 0;
    min-height: 0;
  }
}
</style>

<script>
// const REMOVE_DELAY = 4400
const REMOVE_DELAY = 6600

export default {
  name: `notification`,
  data() {
    return {
      timerId: false,
    }
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  // mounted instead of create for use only in client side
  mounted() {
    this.$el.style.setProperty(
      '--expanded',
      `${this.$refs.content.offsetHeight}px`
    )
    this.timerId = window.setTimeout(
      () => this.removeNotification(),
      REMOVE_DELAY
    )
  },
  methods: {
    removeNotification(notificationId) {
      window.clearTimeout(this.timerId)
      this.timerId = false
      this.$store.commit(`notification/REMOVE`, this.message.id)
    },
  },
}
</script>
