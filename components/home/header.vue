<template>
  <div class="home-header">
    <h1>
      I make custom<br>
      website for<br>
      everyone's need
    </h1>
    <UiTwoColumnHeader>
      <template #left>
        <h2 class="name">
          I'm<br>
          Yannick<br>
          “hiswe”<br>
          Aïvayan
        </h2>
      </template>
      <template #right>
        <p>A full stack Javascript web-developer.</p>
        <p>
          Depending on the project I will use the most appropriate set of tools.
        </p>
      </template>
    </UiTwoColumnHeader>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/css/scss-vars';

.home-header {
  text-align: center;
  background: white;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 70vh;

  @media #{$mq-medium} {
    height: auto;
  }
}

h1 {
  text-align: center;
  padding: 2rem 0 1rem;
  line-height: 1;
  font-size: 1.85rem;
  text-transform: uppercase;
  font-weight: 900;
  margin: 0;

  @media #{$mq-small} {
    padding-left: 1rem;
    padding-right: 1rem;

    br {
      display: none;
    }
  }

  @media #{$mq-medium-only} {
    font-size: 2rem;
  }
}

.name {
  line-height: 1;
  font-size: 2rem;
  font-weight: 900;
  margin: 0;
}

.two-column-header {
  p {
    margin: 0;

    +p {
      margin-top: 1rem;

      @media #{$mq-medium-only} {
        margin-top: 0;
      }
    }
  }
}
</style>
