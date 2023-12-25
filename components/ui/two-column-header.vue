<template>
  <div class="two-column-header">
    <div class="two-column-header__left">
      <slot name="left" />
    </div>
    <div class="two-column-header__right">
      <slot name="right" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.two-column-header {
  display: grid;
  grid-area: header;
  grid-template-columns: 1fr 4fr 1fr 5fr 1fr;
  grid-template-areas: '. left . right .';
  margin: 0;
  padding: var(--vertical-space) 0;
  background: white;
}

.two-column-header__left {
  grid-area: left;
  color: var(--c-accent);
  text-align: right;
}

.two-column-header__right {
  grid-area: right;
  text-align: left;
  margin: 0;
  color: var(--c-primary-darker);
}
</style>
