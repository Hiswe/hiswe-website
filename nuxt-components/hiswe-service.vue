<template lang="pug">
dl(:class="`service ${id}`")
  dt
    h3 {{title}}
    // p: i.hicon.penBottom
    a(:href="`#${id}`") more details
  dd.panel
    slot
  dd.panel.panel--left
    slot(name="left")
  dd.panel.panel--right
    slot(name="right")
  dd.close: a(href="#")
</template>

<style lang="scss" scoped>
// .service {
//   --panel-height: 300px;
//   position: relative;

//   &:nth-child(odd) {
//     transform: skewY(-30deg);
//   }
//   &:nth-child(even) {
//     transform: skewY(30deg);
//   }

//   &:target {
//     transform: none;
//   }
// }

// dt,
// .panel {
//   height: var(--panel-height);
//   position: relative;
// }

// dt {
//   $target: 'dl:target >';
//   $center-panel: 'dl:nth-child(even) >';

//   z-index: 3;
//   background: white;
//   padding: 0;
//   text-align: center;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: box-shadow 0.25s ease 0s;

//   &:hover {
//     box-shadow: inset 0 0 0 8px var(--c-accent);
//   }

//   #{$center-panel} & {
//     background: var(--c-primary-lighter);
//   }
//   #{$target} & {
//     background: var(--c-primary-darker);
//   }

//   h6 {
//     font-size: 1.75rem;
//     text-transform: uppercase;
//     letter-spacing: 0.125em;
//     font-weight: normal;
//     margin: 0;
//   }

//   a {
//     position: absolute;
//     top: 0;
//     right: 0;
//     left: 0;
//     bottom: 0;
//     text-indent: 100%;
//     white-space: nowrap;
//     overflow: hidden;
//   }
// }
// .panel {
//   position: absolute;
//   top: 0;
//   width: 100%;
//   z-index: 10;
//   background: var(--c-primary-black);
//   color: white;
//   margin: 0;

//   &--left {
//     right: 100%;
//   }

//   &--right {
//     left: 100%;
//   }
// }
</style>


<script>
export default {
  name: `hiswe-service`,
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      require: false,
    },
  },
  computed: {
    id() {
      if (!this.title) return false
      return `service-${this.title.replace(' ', '-').toLowerCase()}`
    },
  },
}
</script>
