<script>
import { mapState, mapMutations } from 'vuex'

import HisweTwoLineTitle from '~/components/ui/two-line-title'
import HisweField from '~/components/ui/field.vue'

const FORM_ACTION = `/api/contact`

export default {
  name: `section-contact`,
  components: { HisweTwoLineTitle, HisweField },
  data() {
    return {
      disabled: false,
      name: ``,
      email: ``,
      message: ``,
    }
  },
  FORM_ACTION,
  computed: {
    ...mapState(`contact`, {
      validation: `fields`,
    }),
  },
  methods: {
    enable(event) {
      this.disabled = false
    },
    handleSubmit(event) {
      this.disabled = true
      this.$http
        .$post(FORM_ACTION, {
          name: this.name,
          email: this.email,
          message: this.message,
        })
        .then((data) => {
          if (data.notification) {
            this.showNotification(data.notification)
          }
          if (data.validation) {
            const isInvalid = Object.values(data.validation)
              .map((field) => field.valid)
              .includes(false)
            // let the user automatically fix his errors
            if (isInvalid) this.disabled = false
            this.setValidation(data.validation)
          }
        })
        .catch((error) => {
          this.disabled = false
          console.log(`ERROR`)
          this.showNotification({
            content: `An error as occurred, please try later`,
            type: `error`,
          })
        })
    },
    ...mapMutations(`contact`, {
      setValidation: `SET_FIELDS`,
    }),
    ...mapMutations(`notification`, {
      showNotification: `ADD`,
    }),
  },
}
</script>

<template>
  <form
    class="contact"
    :action="$options.FORM_ACTION"
    method="post"
    novalidate="novalidate"
    @submit.prevent="handleSubmit"
    @click="enable"
  >
    <HisweTwoLineTitle class="form__title" text="contact me" :level="2" />
    <div class="contact__inputs">
      <HisweField
        class="field--name"
        name="name"
        type="text"
        v-model="name"
        :disabled="disabled"
      />
      <HisweField
        class="field--email"
        name="email"
        type="email"
        v-model="email"
        required="required"
        :disabled="disabled"
        :valid="validation.email.valid"
      />
    </div>
    <HisweField
      class="field--message"
      name="message"
      tag="textarea"
      v-model="message"
      required="required"
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
.contact {
  background: var(--c-primary-darkest);
  color: var(--c-primary-lighter);
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
