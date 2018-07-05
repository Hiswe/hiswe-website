<template lang="pug">
  div(:class="`main-content page-${page}`")
    slot
</template>

<script>
export default {
  name: `hiswe-main-content`,
  props: {
    page: {
      type: String,
      required: true,
    },
  },
}
</script>

