<script setup lang="ts">
defineOptions({
  name: `HomeTechsBuild`,
})
</script>

<template>
  <div class="grid grid-cols-[1fr_5.5rem] gap-x-8 gap-y-6">
    <UiTwoLineTitle class="p-0 text-start md:text-end" text="bu-ild" />
    <HomeTechsItem name="webpack" href="https://webpack.js.org">
      <SvgoTechWebpack />
    </HomeTechsItem>
    <HomeTechsItem name="parcel" class="justify-self-end" href="https://parceljs.org">
      <SvgoTechParcel />
    </HomeTechsItem>
    <HomeTechsItem name="gulp" href="https://gulpjs.com">
      <SvgoTechGulp />
    </HomeTechsItem>
  </div>
</template>
