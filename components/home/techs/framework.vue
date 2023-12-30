<script setup lang="ts">
defineOptions({
  name: `HomeTechsFramework`,
})
</script>

<template>
  <div class="grid grid-cols-[1fr_8rem] gap-x-8 gap-y-6">
    <UiTwoLineTitle class="p-0" text="frame-work" />
    <HomeTechsItem name="vue" href="https://vuejs.org/">
      <SvgoTechVue />
    </HomeTechsItem>
    <HomeTechsItem name="nuxt" long class="justify-self-end" href="https://nuxt.com/">
      <SvgoTechNuxt />
    </HomeTechsItem>
    <HomeTechsItem name="vitest" href="https://vitest.dev/">
      <SvgoTechVitest />
    </HomeTechsItem>
  </div>
</template>
