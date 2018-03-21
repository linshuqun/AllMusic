<template>
  <div id="xiami">
    <show source="xiami" v-bind:word="byXiaMi" v-bind:search="allSearch"></show>
  </div>
</template>

<script>
import show from "./Show.vue"
import player from "./Player"

export default {
  name: "XiaMi",
  props: ["byXiaMi", "allSearch"],
  components: { show }
};
</script>

<style>

</style>
