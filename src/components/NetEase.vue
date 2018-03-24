<template>
  <div id="xiami">
    <show source="netease" v-bind:word="byNetEase" v-bind:search="allSearch"></show>
  </div>
</template>

<script>
import show from "./Show.vue"

export default {
  name: "NetEase",
  props: ["byNetEase", "allSearch"],
  components: { show }
};
</script>

<style>

</style>
