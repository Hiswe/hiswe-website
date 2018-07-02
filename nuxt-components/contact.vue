<template lang="pug">
  section.contact
    form.contact__form
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
    aside: div
      a(href="https://github.com/hiswe")
        hiswe-icon(name="github")
        span github
      a(href="https://twitter.com/hiswehalya")
        hiswe-icon(name="twitter")
        span twitter
      a(href="https://medium.com/@hiswehalya")
        hiswe-icon(name="medium")
        span medium
      a(href="https://codepen.io/Hiswe")
        hiswe-icon(name="codepen")
        span codepen
</template>

<style lang="scss" scoped>
.contact {
  background: var(--c-primary-darkest);
  color: var(--c-primary-lighter);

  @media #{$mq-medium} {
    width: grid-size(18);
  }
}
.two-line-title {
  padding: var(--gutter);
  text-align: center;
}
.contact__form {
  padding: var(--gutter);

  @media #{$mq-medium} {
    padding: var(--grid-size) 0;
    display: grid;
    grid-template-columns:
      var(--grid-size) [left-start] repeat(6, var(--grid-size))
      [left-end] var(--grid-size) [right-start] repeat(9, var(--grid-size)) [right-end] var(
        --grid-size
      );
    grid-auto-rows: var(--grid-size);
  }
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
aside {
  margin: var(--gutter) auto;
  background: rgba(255, 255, 255, 0.1);
  padding: var(--gutter);
  margin: 0;
  --svg-icon-scale: 1.5;

  div {
    display: flex;
    justify-content: space-between;
    max-width: 350px;
    margin: 0 auto;
  }
  a {
    color: var(--c-primary);
    text-decoration: none;
    text-align: center;
  }
  span,
  svg {
    display: block;
    margin: 0 auto;
  }
  span {
    padding: 0.5em 0 0;
    font-size: 0.6rem;
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

