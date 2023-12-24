<script>
const TITLE_REGEX = /^(\w+)[\s-](.+)$/
const TITLE_WITH_SPACE_REGEX = /^\w+\s.+$/

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
  render(h) {
    return h(
      `h${this.level}`, // tag name
      {
        class: `two-line-title`,
      },
      [
        h(`span`, { class: this.classNames }, [
          // this._v === text node
          // https://stackoverflow.com/questions/42414627/create-text-node-with-custom-render-function-in-vue-js
          this._v(this.firstLine),
        ]),
        h(`span`, { class: `second-line` }, [this._v(this.secondLine)]),
      ]
    )
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.two-line-title {
  line-height: 1;
  margin: 0;

  @media #{$mq-small} {
    font-size: 6vw;
  }

  @media #{$mq-medium} {
    line-height: 0.85;
    font-size: calc(2vw + 0.5rem);
  }

  @media #{$mq-big} {
    font-size: 1.5rem;
  }
}

.first-line {
  font-weight: 900;
  font-size: 2em;
  text-transform: uppercase;
}

.has-dash::after {
  content: '-';
}

.second-line {
  display: block;
  font-size: 1.5em;
  font-weight: 200;
}</style>
