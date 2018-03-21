<template>
  <div id="qq">
    <show source="qq" v-bind:word="byQQ" v-bind:search="allSearch"></show>
    <player></player>
  </div>
</template>

<script>
import show from "./Show.vue"
import player from "./Player"

export default {
  name: "QQ",
  props: ["byQQ", "allSearch"],
  components: { show,  player }
};
</script>

<style scoped>

</style>
