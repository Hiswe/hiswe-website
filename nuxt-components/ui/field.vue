<style lang="scss" scoped>
.field {
  border: 0;
  padding: 0;

  @media #{$mq-medium} {
    display: flex;
    flex-direction: column;
  }

  &__error-message {
    font-style: italic;
    padding-left: 0.5em;
    font-size: 0.9em;
    color: red;
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

  .field--invalid & {
    border-color: red;
  }

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
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

export default {
  name: `hiswe-field`,
  data() {
    return {
      pristine: true,
    }
  },
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
  computed: {
    showError() {
      return !this.valid && this.pristine
    },
  },
  methods: {
    handleBlur(event) {
      // ignore if event is a window blur
      if (document.activeElement === this.controlEl) return
      this.pristine = false
    },
  },
  render(h) {
    return h(
      `div`,
      {
        class: [
          `field`,
          `field--${this.name}`,
          {
            'field--invalid': this.showError,
          },
        ],
      },
      [
        h(
          `label`,
          {
            attrs: { for: this.name },
          },
          [
            this.name,
            this.showError
              ? h(
                  `span`,
                  { class: `field__error-message` },
                  `${this.name} is invalid`
                )
              : null,
          ]
        ),
        h(this.tag, {
          attrs: {
            id: this.name,
            name: this.name,
            ...this.$attrs,
          },
          on: {
            // https://vuejs.org/v2/guide/render-function.html#Event-amp-Key-Modifiers
            '&blur': this.handleBlur,
          },
        }),
      ]
    )
  },
}
</script>
