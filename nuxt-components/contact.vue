<template lang="pug">
form.contact(
  :action="action"
  method="post"
  novalidate
  @submit.prevent="handleSubmit"
  @click="enable"
)
  hiswe-title(
    text="contact me"
    class="form__title"
    :level="2"
  )
  hiswe-field(
    name="name"
    type="text"
    :disabled="disabled"
  )
  hiswe-field(
    name="email"
    type="email"
    required
    :disabled="disabled"
    :valid="validation.email.valid"
  )
  hiswe-field(
    name="message"
    tag="textarea"
    required
    :disabled="disabled"
    :valid="validation.message.valid"
  )
  button(
    type="submit"
    :disabled="disabled"
  ) send
</template>

<style lang="scss" scoped>
.contact {
  background: var(--c-primary-darkest);
  color: var(--c-primary-lighter);
  padding: var(--vertical-space) var(--gutter);
  grid-area: contact;

  @media #{$mq-medium} {
    padding: var(--vertical-space) 0;
    display: grid;
    grid-template-columns: 1fr 6fr 1fr 9fr 1fr;
    grid-template-rows: auto 5rem 5rem minmax(2rem, auto) 3rem;
    grid-template-areas:
      '. .      . title   .'
      '. name   . message .'
      '. email  . message .'
      '. .      . message .'
      '. button . message .';
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
.field--name {
  grid-area: name;
}
.field--email {
  grid-area: email;
}
.field--message {
  grid-area: message;
}
button {
  background: var(--c-primary);
  color: black;
  border: 0;
  margin-top: var(--gutter);
  padding: var(--half-gutter) var(--gutter);
  transition: color 0.25s, background-color 0.25s, transform 0.15s;
  grid-area: button;

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
    margin-top: 0;
    padding: var(--quarter-gutter);
  }
}
</style>

<script>
import serialize from 'form-serialize'

export default {
  name: `section-contact`,
  data() {
    return {
      action: `/api/contact`,
      disabled: false,
    }
  },
  computed: {
    validation() {
      return this.$store.state.validation.fields
    },
  },
  methods: {
    enable(event) {
      this.disabled = false
    },
    handleSubmit(event) {
      const body = serialize(event.target, { hash: true, empty: true })
      this.disabled = true
      this.$http
        .post(this.action, body)
        .then(response => {
          const { data } = response
          if (data.notification) {
            this.$store.commit(`notification/ADD`, data.notification)
          }
          if (data.validation) {
            const isInvalid = Object.values(data.validation)
              .map(field => field.valid)
              .includes(false)
            // let the user automatically fix his errors
            if (isInvalid) this.disabled = false
            this.$store.commit(`validation/SET`, data.validation)
          }
        })
        .catch(error => {
          this.disabled = false
          this.$store.commit(`notification/ADD`, {
            content: `An error as occured, please try later`,
            type: `error`,
          })
        })
    },
  },
}
</script>

