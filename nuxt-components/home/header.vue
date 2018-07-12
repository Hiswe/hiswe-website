<template lang="pug">
  header.header
    h1 I make custom<br> website for<br> everyone's need
    hiswe-header(tag="div")
      template(slot="left"): h2.name I'm<br> Yannick<br> “hiswe”<br> Aïvayan
      template(slot="right")
        p A full stack Javascript web-developer.
        p Depending on the project I will use the most appropriate set of tools.
</template>

<style lang="scss" scoped>
.header {
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

    + p {
      margin-top: 1rem;
      @media #{$mq-medium-only} {
        margin-top: 0;
      }
    }
  }
}
// .presentation {
//   display: grid;
//   grid-template-columns: 1fr 4fr 1fr 5fr 1fr;
//   grid-template-areas: '. title . description .';
//   margin: 0;
//   padding: 0;
//   grid-auto-rows: auto;

//   @media #{$mq-medium-only} {
//     display: block;
//   }

//   &__title {
//     text-align: right;
//     color: var(--c-accent);
//     line-height: 1;
//     font-size: 2rem;
//     font-weight: 900;
//     padding: 0;
//     grid-area: title;

//     @media #{$mq-medium-only} {
//       font-size: 1.2rem;
//       text-align: center;
//       padding: 0;

//       br {
//         display: none;
//       }
//     }
//   }
//   &__description {
//     text-align: left;
//     color: var(--c-primary-darker);
//     grid-area: description;
//     font-size: 0.9rem;
//     padding: 0;
//     margin: 0;

//     @media #{$mq-medium-only} {
//       text-align: center;
//       padding: var(--half-gutter) var(--gutter);
//     }
//     p {
//       margin: 0;

//       + p {
//         margin-top: var(--gutter);
//         @media #{$mq-medium-only} {
//           margin-top: 0;
//         }
//       }
//     }
//   }
// }
</style>

<script>
export default {
  name: `home-header`,
}
</script>
