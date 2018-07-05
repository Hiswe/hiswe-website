<style lang="scss" scoped>
.two-line-title {
  line-height: 1;
  margin: 0;

  @media #{$mq-medium} {
    line-height: 0.85;
  }
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
    level: {
      type: Number,
      default: 3,
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
  render(createElement) {
    return createElement(
      `h${this.level}`, // tag name
      {
        class: `two-line-title`,
      },
      [
        createElement(`span`, { class: this.classNames }, [
          // this._v === text node
          // https://stackoverflow.com/questions/42414627/create-text-node-with-custom-render-function-in-vue-js
          this._v(this.firstLine),
        ]),
        createElement(`span`, { class: `second-line` }, [
          this._v(this.secondLine),
        ]),
      ]
    )
  },
}
</script>

