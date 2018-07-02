<template lang="pug">
  section.contact
    hiswe-title(text="contact me")
    form
      fieldset
        label(for="name") name
        input(id="name" type="text")
      fieldset
        label(for="email") email
        input(id="email" type="email")
      fieldset
        label(for="message") message
        textarea(id="message")
      button(type="submit") send
    aside
      a(href="https://github.com/hiswe"): hiswe-icon(name="github")
      a(href="https://twitter.com/hiswehalya"): hiswe-icon(name="twitter")
      a(href="https://medium.com/@hiswehalya"): hiswe-icon(name="medium")
      a(href="https://codepen.io/Hiswe"): hiswe-icon(name="codepen")
</template>

<style lang="scss" scoped>
section {
  background: var(--c-primary-darkest);
  color: var(--c-primary-lighter);
}
.two-line-title {
  padding: var(--gutter);
  text-align: center;
}
form {
  padding: var(--gutter);
}
fieldset {
  border: 0;
  padding: 0;
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
}
button {
  background: var(--c-primary);
  border: 0;
  margin-top: var(--gutter);
  padding: var(--half-gutter) var(--gutter);
}
aside {
  margin: var(--gutter) auto;
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.1);
  padding: var(--gutter);
  margin: 0;

  a {
    color: var(--c-primary);
  }
}
</style>


<script>
export default {
  name: `section-contact`,
}
</script>

