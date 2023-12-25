<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tag?: `input` | `textarea`
    modelValue?: string
    name: string
    valid?: boolean
    disabled?: boolean
  }>(),
  {
    tag: `input`,
    valid: true,
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [string]
}>()

const pristine = ref(true)
const input = ref<HTMLInputElement | HTMLTextAreaElement>()

watch(() => props.disabled, (newVal, _oldVal) => {
  // disabled mean it has been submitted
  // • reset pristine state for validation showing
  if (newVal === true)
    pristine.value = true
})

const shouldDisplayError = computed(() => pristine.value && !props.valid)
const isTextarea = computed(() => props.tag === `textarea`)

onMounted(() => {
  if (isTextarea.value)
    autoResize()
})
function autoResize() {
  if (!input.value)
    return
  const originalRows = input.value.getAttribute(`rows`)
  // force a one-liner by default
  // • this make it easy to calculate the right height
  input.value.setAttribute(`rows`, `1`)
  input.value.style.minHeight = `auto`
  const { scrollHeight } = input.value
  input.value.style.minHeight = `${scrollHeight}px`
  input.value.scrollTop = scrollHeight
  if (originalRows)
    input.value.setAttribute(`rows`, originalRows)
}

function onInput(event: Event) {
  // https://stackoverflow.com/a/44321394
  const isInput = event.currentTarget instanceof HTMLInputElement || event.currentTarget instanceof HTMLTextAreaElement
  if (!isInput)
    return
  emit(`update:modelValue`, event.currentTarget.value)
  if (isTextarea.value)
    autoResize()
}

function handleBlur() {
  // ignore if event is a window blur
  // if (document.activeElement === this.controlEl) return
  pristine.value = false
}
</script>

<template>
  <div class="field" :class="{ 'field--invalid': shouldDisplayError, 'field--disabled': disabled }">
    <label :for="name">
      {{ name }}
      <Transition name="error-fade">
        <span v-if="shouldDisplayError" class="field__error-message">
          {{ name }} is invalid
        </span>
      </Transition>
    </label>
    <component :is="tag" :id="name" ref="input" :name="name" :disabled="disabled" @blur="handleBlur" @input="onInput" />
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
