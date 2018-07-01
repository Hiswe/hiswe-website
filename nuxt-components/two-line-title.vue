<template lang="pug">
  h3.two-line-title <span :class="classNames">{{firstLine}}</span><span class="second-line">{{secondLine}}</span>
</template>

<style lang="scss" scoped>
.two-line-title {
  line-height: 1;
  margin: 0;
}
.first-line {
  font-weight: 900;
  font-size: 3rem;
  text-transform: uppercase;
}
.has-dash::after {
  content: '-';
}
.second-line {
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
        'first-line': true,
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

