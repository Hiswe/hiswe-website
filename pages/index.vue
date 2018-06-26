<template lang="pug">
.home
  h1 Hi,

  p I'm Yannick Aïvayan
  p a full stack Javascript developer

  h2 I make custom website for everyone's need

  p depending on the project I will use the most appropriate set of tools
  p **Different needs implies different tools**
  p As long as it's web tech!

  ul: li responsive

  h3 showcase website

  p needs

  ul
    li provide all the informations
    li in a nice way
    li as soon as possible

  p The main focus will be on:

  ul
    li fast page serving
    li fast page display
    li lightweight animations & interactivity

  h4 tools

  ul: li vanilla JS

  h3 web-application

  p needs

  ul
    li maintain a complex application state
    li handle any complex user actions

  h4 tools

  ul
    li handle application
      ul
        li [React](https://reactjs.org/)
        li [Vue.js](https://vuejs.org/)
    li offline application
      ul: li [workbox](https://developers.google.com/web/tools/workbox/)

  ul
    li: a(href="https://github.com/hiswe"): img( src="~/assets/logos/©github.svg" width="100")
    li: a(href="https://medium.com/@hiswehalya"): img( src="~/assets/logos/©medium.svg" width="100")
    li: a(href="https://codepen.io/Hiswe"): img( src="~/assets/logos/©codepen.svg" width="100")

</template>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
}
</style>

