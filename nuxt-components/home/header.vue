<template lang="pug">
  .header
    h2 I make custom<br> website for<br> everyone's need
    dl.presentation
      dt.presentation__title I'm<br> Yannick<br> “hiswe”<br> Aïvayan
      dd.presentation__description
        p a full stack Javascript web-developer
        p depending on the project I will use the most appropriate set of tools.
</template>

<style lang="scss" scoped>
.header {
  padding: 0 0 var(--two-gutter);
  text-align: center;
  background: white;

  @media #{$mq-medium} {
    // width: grid-size(12);
    width: grid-size(18);
    padding: 0;
  }
}
@media #{$mq-small} {
  br {
    display: none;
  }
}
h2 {
  text-align: center;
  padding: 2.5em 0;
  line-height: 1;
  font-size: 1.85rem;
  text-transform: uppercase;
  font-weight: 900;
  margin: 0;

  @media #{$mq-medium} {
    font-size: 2rem;
    padding: var(--grid-size);
  }
}
.presentation {
  display: flex;
  margin: 0;

  @supports (display: grid) {
    @include grid;
    grid-auto-rows: auto;
  }

  @media #{$mq-medium} {
    display: block;
  }

  &__title,
  &__description {
    width: 50%;
    flex: 0 1 50%;
    margin: 0;

    @supports (display: grid) {
      width: auto;
    }
  }
  &__title {
    padding-right: var(--gutter);
    text-align: right;
    color: var(--c-accent);
    line-height: 1;
    font-size: 2rem;
    font-weight: 900;

    @supports (display: grid) {
      padding: 0;
      grid-area: 1 / 1 / 1 / 8;
    }
    @media #{$mq-medium} {
      font-size: 1.2rem;
      text-align: center;
      padding: 0;

      br {
        display: none;
      }
    }
  }
  &__description {
    padding-left: var(--gutter);
    text-align: left;
    color: var(--c-primary-darker);
    font-size: 0.9rem;

    @supports (display: grid) {
      grid-area: 1 / 9 / 1 / 16;
      padding: 0;
    }
    @media #{$mq-medium} {
      text-align: center;
      padding: var(--half-gutter) var(--gutter);
    }
    p {
      margin: 0;

      + p {
        margin-top: var(--gutter);
        @media #{$mq-medium} {
          margin-top: 0;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: `home-header`,
}
</script>
