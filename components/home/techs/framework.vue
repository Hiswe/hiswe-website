<script setup lang="ts">
defineOptions({
  name: `HomeTechsFramework`,
})
</script>

<template>
  <div class="grid grid-cols-[1fr_5.5rem] gap-x-8 gap-y-6 justify-items-end">
    <UiTwoLineTitle class="p-0" text="frame-work" />
    <HomeTechsItem name="vue" href="https://vuejs.org/">
      <SvgoTechVue />
    </HomeTechsItem>
    <HomeTechsItem name="nuxt" long href="https://nuxt.com/">
      <SvgoTechNuxt />
    </HomeTechsItem>
    <HomeTechsItem name="vitest" href="https://vitest.dev/">
      <SvgoTechVitest />
    </HomeTechsItem>
  </div>
</template>
