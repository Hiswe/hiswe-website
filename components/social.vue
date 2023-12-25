<template>
  <aside class="social">
    <div>
      <a href="https://github.com/hiswe">
        <SvgoSocialGithub />
        <span>github</span>
      </a>
      <a href="https://twitter.com/hiswehalya">
        <SvgoSocialTwitter />
        <span>twitter</span>
      </a>
      <a href="https://medium.com/@hiswehalya">
        <SvgoSocialMedium />
        <span>medium</span>
      </a>
      <a href="https://codepen.io/Hiswe">
        <SvgoSocialCodepen />
        <span>codepen</span>
      </a>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.social {
  margin: var(--gutter) auto;
  background: var(--c-primary-darkest-highlight);
  padding: var(--vertical-space) var(--gutter);
  margin: 0;
  grid-area: social;
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

    +a {
      margin-top: var(--gutter);
    }
  }
}

span,
svg {
  display: block;
  margin: 0 auto;
}

svg {
  width: 36px;
  height: 36px;
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
