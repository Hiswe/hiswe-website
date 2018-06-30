<template lang="pug">
  h3.two-line-title <span :class="classNames">{{firstLine}}</span><span>{{secondLine}}</span>
</template>

<style lang="scss" scoped>
.two-line-title {
  font-size: 3rem;
  line-height: 1;
  font-weight: 900;
  margin: 0;
}
.has-dash::after {
  content: '-';
}
span:last-child {
  display: block;
  font-size: 2rem;
  font-weight: 200;
}
</style>


<script>
const TITLE_REGEX = /^(\w+)[\s-](\w+)$/
const TITLE_WITH_SPACE_REGEX = /^\w+\s\w+$/

export default {
  name: `two-line-title`,
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    classNames() {
      const hasSpace = TITLE_WITH_SPACE_REGEX.test(this.text)
      return {
        'has-space': hasSpace,
        'has-dash': !hasSpace,
      }
    },
    firstLine() {
      return TITLE_REGEX.exec(this.text)[1]
    },
    secondLine() {
      return TITLE_REGEX.exec(this.text)[2]
    },
  },
}
</script>

