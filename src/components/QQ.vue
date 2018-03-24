<template>
  <div id="qq">
    <show source="qq" v-bind:word="byQQ" v-bind:search="allSearch"></show>
  </div>
</template>

<script>
import show from "./Show.vue"

export default {
  name: "QQ",
  props: ["byQQ", "allSearch"],
  components: { show }
};
</script>

<style scoped>

</style>
