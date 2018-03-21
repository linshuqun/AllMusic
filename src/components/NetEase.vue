<template>
  <div id="xiami">
    <show source="netease" v-bind:word="byNetEase" v-bind:search="allSearch"></show>
    <player></player>
  </div>
</template>

<script>
import show from "./Show.vue"
import player from "./Player"

export default {
  name: "NetEase",
  props: ["byNetEase", "isSearch"],
  components: { show }
};
</script>

<style>

</style>
