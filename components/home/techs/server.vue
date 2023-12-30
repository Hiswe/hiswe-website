<script setup lang="ts">
defineOptions({
  name: `HomeTechsServer`,
})
</script>

<template>
  <div class="grid grid-reverse grid-cols-[1fr_5.5rem] gap-x-8 gap-y-6 justify-items-end direction-rtl md:direction-ltr">
    <UiTwoLineTitle class="p-0 text-start md:text-end" text="ser-ver" />
    <HomeTechsItem name="node" href="https://nodejs.org/en/">
      <SvgoTechNode />
    </HomeTechsItem>
    <HomeTechsItem name="express" long href="https://expressjs.com/">
      <SvgoTechExpress />
    </HomeTechsItem>
    <HomeTechsItem name="postgre" href="https://www.postgresql.org/">
      <SvgoTechPostgre />
    </HomeTechsItem>
  </div>
</template>
