<script setup lang="ts">
defineOptions({
  name: `HomeTechsServer`,
})
</script>

<template>
  <div class="grid grid-cols-[1fr_5.5rem_5.5rem] gap-x-8 gap-y-6 p-8 md:p-0">
    <UiTwoLineTitle class="p-0 text-start md:text-end" text="ser-ver" />
    <HomeTechsItem name="node" href="https://nodejs.org/en/">
      <SvgoTechNode />
    </HomeTechsItem>
    <HomeTechsItem name="koa" href="https://koajs.com/">
      <SvgoTechKoa />
    </HomeTechsItem>
    <HomeTechsItem name="express" class="justify-self-end" long href="https://expressjs.com/">
      <SvgoTechExpress />
    </HomeTechsItem>
    <HomeTechsItem name="postgre" href="https://www.postgresql.org/">
      <SvgoTechPostgre />
    </HomeTechsItem>
    <HomeTechsItem name="mongo" href="https://www.mongodb.com/">
      <SvgoTechMongo />
    </HomeTechsItem>
  </div>
</template>
