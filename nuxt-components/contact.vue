<template lang="pug">
  form.contact
    hiswe-title(text="contact me" class="form__title")
    fieldset.field.field--name
      label(for="name") name
      input(id="name" type="text")
    fieldset.field.field--email
      label(for="email") email
      input(id="email" type="email")
    fieldset.field.field--message
      label(for="message") message
      textarea(id="message")
    button(type="submit") send
</template>

<style lang="scss" scoped>
.contact {
  background: var(--c-primary-darkest);
  color: var(--c-primary-lighter);
  padding: var(--gutter);

  @media #{$mq-medium} {
    padding: var(--grid-size) 0;
    display: grid;
    grid-template-columns:
      1fr
      [left-start] repeat(6, 1fr)
      [left-end] 1fr
      [right-start] repeat(9, 1fr)
      [right-end] 1fr;
    grid-auto-rows: var(--grid-size);
  }
}
.two-line-title {
  padding: var(--gutter);
  text-align: center;
}
fieldset {
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
}
button {
  background: var(--c-primary);
  border: 0;
  margin-top: var(--gutter);
  padding: var(--half-gutter) var(--gutter);

  @media #{$mq-medium} {
    margin-top: 0;
    grid-area: 9 / left-start / 10 / left-end;
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
  grid-area: 4 / left-start / 6 / left-end;
}
.field--email {
  grid-area: 6 / left-start / 8 / left-end;
}
.field--message {
  grid-area: 4 / right-start / 10 / right-end;
}
</style>

<script>
export default {
  name: `section-contact`,
}
</script>

