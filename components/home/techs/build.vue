<script setup lang="ts">
defineOptions({
  name: `HomeTechsBuild`,
})
</script>

<template>
  <div class="grid grid-cols-[1fr_5.5rem] gap-x-8 gap-y-6">
    <UiTwoLineTitle class="p-0 text-start md:text-end col-span-2" text="bu-ild" />
    <HomeTechsItem name="vite" class="justify-self-end" href="https://vitejs.dev/">
      <SvgoTechVite />
    </HomeTechsItem>
    <HomeTechsItem name="webpack" href="https://webpack.js.org">
      <SvgoTechWebpack />
    </HomeTechsItem>
  </div>
</template>
