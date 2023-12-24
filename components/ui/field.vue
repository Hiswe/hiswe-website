<script>
export default {
  name: `hiswe-field`,
  props: {
    tag: { type: String, default: `input` },
    value: { type: String, default: `` },
    name: { type: String, required: true },
    valid: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      pristine: true,
    }
  },
  watch: {
    disabled(newVal, oldVal) {
      // disabled mean it has been submitted
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
    if (this.isTextarea) this.autoResize()
  },
  methods: {
    handleBlur(event) {
      // ignore if event is a window blur
      if (document.activeElement === this.controlEl) return
      this.pristine = false
    },
    onInput(event) {
      this.$emit(`input`, event.target.value)
      if (this.isTextarea) this.autoResize()
    },
    autoResize(event) {
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
}
</script>

<template>
  <div class="field" :class="{ 'field--invalid': showError, 'field--disabled': disabled }">
    <label :for="name">
      {{ name }}
      <transition name="error-fade">
        <span v-if="showError" class="field__error-message">
          {{ name }} is invalid
        </span>
      </transition>
    </label>
    <component :is="tag" ref="input" :id="name" :name="name" :disabled="disabled" @blur="handleBlur" @input="onInput" />
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.field {
  border: 0;
  padding: 0;

  @media #{$mq-medium} {
    display: flex;
    flex-direction: column;
  }
}

.field--disabled {
  opacity: 0.5;
  pointer-events: none;
}

.field__error-message {
  font-style: italic;
  padding-left: 0.5em;
  font-size: 0.9em;
  color: red;
  display: inline-block;
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
  border: 3px solid var(--c-primary-darker);
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
