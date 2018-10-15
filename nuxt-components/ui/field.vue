<style lang="scss" scoped>


.field {
  border: 0;
  padding: 0;

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  @media #{$mq-medium} {
    display: flex;
    flex-direction: column;
  }

  &__error-message {
    font-style: italic;
    padding-left: 0.5em;
    font-size: 0.9em;
    color: red;
    display: inline-block;
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
.error-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.75s, transform 0.5s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateX(15px);
  }
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pristine: true,
    }
  },
  watch: {
    disabled(newVal, oldVal) {
      // disabled mean it has been submited
      // • reset pristine state for validation showing
      if (newVal === true) this.pristine = true
    },
  },
  computed: {
    showError() {
      return !this.valid && this.pristine
    },
    isTextarea() {
      return this.tag === `textarea`
    },
  },
  mounted() {
    if (this.isTextarea) this.autoresize()
  },
  methods: {
    handleBlur(event) {
      // ignore if event is a window blur
      if (document.activeElement === this.controlEl) return
      this.pristine = false
    },
    autoresize(event) {
      const { input } = this.$refs
      const originalRows = input.getAttribute(`rows`)
      // force a one-liner by default
      // • this make it easy to calculate the right height
      input.setAttribute(`rows`, `1`)
      input.style.minHeight = `auto`
      const { scrollHeight } = input
      input.style.minHeight = `${scrollHeight}px`
      input.scrollTop = scrollHeight
      input.setAttribute(`rows`, originalRows)
    },
  },
  render(h) {
    return (
      <div
        class={[
          `field`,
          `field--${this.name}`,
          {
            'field--invalid': this.showError,
            'field--disabled': this.disabled,
          },
        ]}
      >
        <label for={this.name}>
          {this.name}
          <transition name="error-fade">
            {!this.showError ? null : (
              <span class="field__error-message">{`${
                this.name
              } is invalid`}</span>
            )}
          </transition>
        </label>
        {h(this.tag, {
          ref: `input`,
          attrs: {
            id: this.name,
            name: this.name,
            disabled: this.disabled,
            ...this.$attrs,
          },
          on: this.isTextarea
            ? {
                // https://vuejs.org/v2/guide/render-function.html#Event-amp-Key-Modifiers
                '&blur': this.handleBlur,
                '&input': this.autoresize,
              }
            : { '&blur': this.handleBlur },
        })}
      </div>
    )
  },
}
</script>
