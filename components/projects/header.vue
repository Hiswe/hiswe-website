<script>
import TwoLineTitle from '~/components/ui/two-line-title.vue'

export default {
  name: `projects-header`,
  components: { TwoLineTitle },
}
</script>

<template>
  <div class="project-header">
    <TwoLineTitle class="project-header-title" text="Open Source" tag="h2" />
    <p>
      Projects that I've created and maintain to give back to the open source
      community.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.project-header {
  display: grid;
  grid-area: header;
  grid-template-columns: 1fr 4fr 1fr 5fr 1fr;
  grid-template-areas: '. title . description .';
  margin: 0;
  padding: var(--two-gutter) 0;
  background: white;
}

.project-header-title {
  grid-area: title;
  color: var(--c-accent);
  text-align: right;
}

p {
  grid-area: description;
  margin: 0;
  color: var(--c-primary-darker);
}
</style>
