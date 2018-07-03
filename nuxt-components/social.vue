<template lang="pug">
  aside.social: div
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
.social {
  margin: var(--gutter) auto;
  background: var(--c-primary-darkest-highlight);
  padding: var(--gutter);
  margin: 0;
  --svg-icon-scale: 1.5;

  @media #{$mq-big} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
div {
  display: flex;
  justify-content: space-between;
  max-width: 350px;
  margin: 0 auto;

  @media #{$mq-big} {
    flex-direction: column;
  }
}
a {
  color: var(--c-primary);
  text-decoration: none;
  text-align: center;
  transition: color 0.25s;

  &:hover {
    color: var(--c-accent-lighter);
  }
  @media #{$mq-big} {
    display: flex;
    align-items: center;

    + a {
      margin-top: var(--gutter);
    }
  }
}
span,
svg {
  display: block;
  margin: 0 auto;
}
span {
  padding: 0.5em 0 0;
  font-size: 0.6rem;

  @media #{$mq-big} {
    flex-grow: 1;
    text-align: left;
    font-size: 1rem;
    padding: 0 0 0 1em;
  }
}
</style>

<script>
export default {
  name: `hiswe-social`,
}
</script>


