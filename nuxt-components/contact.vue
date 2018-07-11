<template lang="pug">
  form.contact(
    :action="action"
    method="post"
    novalidate
    @submit.prevent="handleSubmit"
  )
    hiswe-title(
      text="contact me"
      class="form__title"
      :disabled="loading"
    )
    hiswe-field(name="name"  type="text")
    hiswe-field(
      name="email"
      type="email"
      required
      :disabled="loading"
      :valid="validation.email.valid"
    )
    hiswe-field(
      name="message"
      tag="textarea"
      required
      :disabled="loading"
      :valid="validation.message.valid"
    )
    button(
      type="submit"
      :disabled="loading"
    ) send
</template>

<style lang="scss" scoped>
.contact {
  background: var(--c-primary-darkest);
  color: var(--c-primary-lighter);
  padding: var(--gutter);
  grid-area: contact;

  @media #{$mq-medium} {
    padding: var(--gutter) 0;
    display: grid;
    grid-template-columns:
      1fr
      [left-start] repeat(6, 1fr)
      [left-end] 1fr
      [right-start] repeat(9, 1fr)
      [right-end] 1fr;
    grid-auto-rows: minmax(2rem, auto);
  }
}
.two-line-title {
  padding: var(--gutter);
  text-align: center;
}
button {
  background: var(--c-primary);
  border: 0;
  margin-top: var(--gutter);
  padding: var(--half-gutter) var(--gutter);
  transition: color 0.25s, background-color 0.25s;

  &:hover {
    background-color: var(--c-accent);
    color: white;
  }
  @media #{$mq-medium} {
    margin-top: 0;
    padding: var(--quarter-gutter);
  }
}
.form__title {
  @media #{$mq-medium} {
    grid-area: 1 / right-start / 3 / right-end;
    text-align: left;
    padding: 0;
  }
}
.field--name {
  grid-area: 3 / left-start / 5 / left-end;
}
.field--email {
  grid-area: 5 / left-start / 7 / left-end;
}
.field--message {
  grid-area: 3 / right-start / 9 / right-end;
}
button {
  grid-area: 8 / left-start / 9 / left-end;
}
</style>

<script>
import serialize from 'form-serialize'

export default {
  name: `section-contact`,
  data() {
    return {
      action: `/api/contact`,
      loading: false,
    }
  },
  computed: {
    validation() {
      return this.$store.state.validation.fields
    },
  },
  methods: {
    handleSubmit(event) {
      const body = serialize(event.target, { hash: true, empty: true })
      this.loading = true
      this.$http
        .post(this.action, body)
        .then(response => {
          const { data } = response
          if (data.notification) {
            this.$store.commit(`notification/ADD`, data.notification)
          }
          if (data.validation) {
            this.$store.commit(`validation/SET`, data.validation)
          }
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          commit(`notification/ADD`, {
            content: `An error as occured, please try later`,
            type: `error`,
          })
        })
    },
  },
}
</script>

