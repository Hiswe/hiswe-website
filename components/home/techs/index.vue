<script setup lang="ts">
defineOptions({
  name: `HomeTechs`,
})
</script>

<template>
  <section class="techs bg-primary-darker items-start p-8 flex flex-col md:flex-row flex-wrap lg:justify-evenly gap-8">
    <HomeTechsFramework />
    <HomeTechsServer class="self-end md:self-auto" />
    <HomeTechsBuild />
  </section>
</template>
