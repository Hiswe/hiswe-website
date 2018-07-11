<style lang="scss" scoped>
.field {
  border: 0;
  padding: 0;

  @media #{$mq-medium} {
    display: flex;
    flex-direction: column;
  }
}
label {
  @media #{$mq-medium} {
    flex: 0 0 var(--grid-size);
    height: var(--grid-size);
    padding-top: 0.5rem;
  }
}
label,
input,
textarea {
  display: block;
  color: white;
}
input,
textarea {
  background: none;
  border: 4px solid var(--c-primary-darker);
  display: block;
  width: 100%;
  flex-grow: 1;
  padding: 0 0.5em;
  transition: border 0.25s, background 0.25s;

  &:focus {
    background: var(--c-primary-darkest-highlight);
    border-color: var(--c-primary);
  }
}
input {
  padding: 0 0.5em;
}
textarea {
  padding: 0.5em;
  min-height: 8em;
  resize: vertical;
}
</style>


<script>
export default {
  name: `hiswe-field`,
  props: {
    tag: {
      type: String,
      default: `input`,
    },
    name: {
      type: String,
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  render(h) {
    return h(
      `div`, // tag name
      {
        class: [`field`, `field--${this.name}`],
      },
      [
        h(
          `label`,
          {
            attrs: { for: this.name },
          },
          [this._v(this.name)]
        ),
        h(this.tag, {
          attrs: {
            id: this.name,
            name: this.name,
            ...this.$attrs,
          },
        }),
      ]
    )
  },
}
</script>
