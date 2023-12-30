<script setup lang="ts">
import { notificationKey } from '~/composables/inject-keys'

const notificationProvider = inject(notificationKey)
const disabled = ref(false)
const name = ref(``)
const email = ref(``)
const message = ref(``)

function onSubmit(event: Event) {
  if (disabled.value)
    return
  const myForm = event.target
  if (!(myForm instanceof HTMLFormElement))
    return
  const formData = new FormData(myForm)
  const searchParams = new URLSearchParams()
  // Display the key/value pairs
  for (const pair of formData.entries()) {
    if (typeof pair[1] === `string`)
      searchParams.append(pair[0], pair[1])
  }

  disabled.value = true

  // Need to duplicate form for Netlify to be able to parse it
  // Need to point to that page ¯\_(ツ)_/¯
  // https://answers.netlify.com/t/nuxt-3-contact-form-solution/83523/3
  $fetch('/form.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: searchParams.toString(),
  }).then(onSuccess)
    .catch(onError)
    .finally(() => disabled.value = false)
}
function onSuccess() {
  notificationProvider?.addNotification(`message send`, `success`)
  resetForm()
}
function onError() {
  notificationProvider?.addNotification(`An error as occurred, please try later`, `error`)
}

function resetForm() {
  name.value = ``
  email.value = ``
  message.value = ``
}
</script>

<template>
  <form
    class="contact bg-primary-darkest color-primary-lighter"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    name="contact"
    method="POST"
    @submit.prevent="onSubmit"
  >
    <UiTwoLineTitle
      class="form__title text-center md:text-left self-center p-4 md:p-0"
      text="contact me"
      tag="h2"
    />
    <div class="contact__inputs">
      <input type="hidden" name="form-name" value="contact">
      <UiField
        v-model="name"
        class="field--name"
        name="name"
        type="text"
        :disabled="disabled"
      />
      <UiField
        v-model="email"
        class="field--email"
        name="email"
        type="email"
        required
        :disabled="disabled"
      />
    </div>
    <UiField
      v-model="message"
      class="field--message"
      name="message"
      tag="textarea"
      required
      :disabled="disabled"
    />
    <div class="contact__submit">
      <button
        class="contact__button border-none  h-10 block w-full
          text-black hover:text-white
          bg-primary hover:bg-accent"
        type="submit"
        :disabled="disabled"
      >
        send
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.contact {
  padding: var(--vertical-space) var(--gutter);
  grid-area: contact;

  @media #{$mq-medium} {
    padding: var(--vertical-space) 0;
    display: grid;
    grid-template-columns: 1fr 6fr 1fr 9fr 1fr;
    grid-template-rows: repeat(2, min-content) auto min-content;
    grid-template-areas:
      '. .      . title   .'
      '. inputs . message .'
      '. .      . message .'
      '. button . message .';
  }
}

.contact__submit {
  grid-area: button;
  padding-top: var(--gutter);
}

.contact__button {
  padding: var(--half-gutter) var(--gutter);
  transition: color 0.25s, background-color 0.25s, transform 0.15s;

  &:active {
    transform: translateY(3px);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  @media #{$mq-medium} {
    padding: var(--quarter-gutter);
  }
}

.form__title {
  grid-area: title;
}

.contact__inputs {
  grid-area: inputs;
}

.field--message {
  grid-area: message;
}
</style>
