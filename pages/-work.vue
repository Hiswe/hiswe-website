<script>
import HisweMainContent from '~/components/main-content.vue'
import HisweTwoLineTitle from '~/components/ui/two-line-title'

export default {
  name: `PageWork`,
  components: { HisweMainContent, HisweTwoLineTitle },
  transition: `page`,
  head: {
    title: `work`,
  },
}
</script>

<template>
  <HisweMainContent page="work">
    <template #header>
      <HisweTwoLineTitle text="wo-rk" />
    </template>
  </HisweMainContent>
</template>
