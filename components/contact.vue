<script setup lang="ts">
const disabled = false
const name = ref(``)
const email = ref(``)
const message = ref(``)
const validation = computed(() => ({
  email: { valid: true },
  message: { valid: true },
}))

function onSubmit(event: Event) {
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

  $fetch('/form.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: searchParams.toString(),
  }).then(() => console.log('/thank-you/'))
    .catch(error => console.error(error))

  // fetch('/', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //   body: new URLSearchParams(formData).toString(),
  // })
  //   .then(() => navigate('/thank-you/'))
  //   .catch(error => alert(error))
}
</script>

<template>
  <form
    class="contact bg-primary-darkest color-primary-lighter"
    :action="$options.FORM_ACTION"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    name="contact"
    method="POST"
    @submit.prevent="onSubmit"
  >
    <UiTwoLineTitle class="form__title" text="contact me" tag="h2" />
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
        :valid="validation.email.valid"
      />
    </div>
    <UiField
      v-model="message"
      class="field--message"
      name="message"
      tag="textarea"
      required
      :disabled="disabled"
      :valid="validation.message.valid"
    />
    <div class="contact__submit">
      <button class="contact__button" type="submit" :disabled="disabled">
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
  display: block;
  background: var(--c-primary);
  color: black;
  border: 0;
  width: 100%;
  height: 2.5rem;
  padding: var(--half-gutter) var(--gutter);
  transition: color 0.25s, background-color 0.25s, transform 0.15s;

  &:hover {
    background-color: var(--c-accent);
    color: white;
  }

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
  padding: var(--gutter);
  text-align: center;
  grid-area: title;
  align-self: center;

  @media #{$mq-medium} {
    text-align: left;
    padding: 0;
  }
}

.contact__inputs {
  grid-area: inputs;
}

.field--message {
  grid-area: message;
}
</style>
