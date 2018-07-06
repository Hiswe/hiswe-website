<style lang="scss" scoped>
.two-column-header {
  display: grid;
  grid-area: header;
  grid-template-columns: 1fr 4fr 1fr 5fr 1fr;
  grid-template-areas: '. left . right .';
  margin: 0;
  padding: var(--two-gutter) 0;
  background: white;

  &__left {
    grid-area: left;
    color: var(--c-accent);
    text-align: right;
  }
  &__right {
    grid-area: right;
    margin: 0;
    color: var(--c-primary-darker);
  }
}
</style>

<script>
export default {
  name: `hiswe-two-column-header`,
  props: {
    tag: {
      type: String,
      required: true,
      default: `header`,
    },
  },
  render(createElement) {
    return createElement(
      this.tag,
      {
        class: `two-column-header`,
      },
      [
        createElement(
          `div`,
          { class: `two-column-header__left` },
          this.$slots.left
        ),
        createElement(
          `div`,
          { class: `two-column-header__right` },
          this.$slots.right
        ),
      ]
    )
  },
}
</script>

