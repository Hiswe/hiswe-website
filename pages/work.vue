<script>
export default {
  name: `page-work`,
  transition: `page`,
  head: {
    title: `work`,
  },
}
</script>

<template lang="pug">
hiswe-main-content(page="work")
  template(slot="header")
    hiswe-title(text="wo-rk")
</template>
