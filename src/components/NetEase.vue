<template>
  <div id="xiami">
    <show source="netease" v-bind:word="byNetEase" v-bind:search="allSearch" v-on:playSong="addSong"></show>
  </div>
</template>

<script>
import show from "./Show.vue";

export default {
  name: "NetEase",
  props: ["byNetEase", "allSearch"],
  components: { show },
  methods: {
    addSong(song) {
      this.$emit("addSongToList", song);
    }
  }
};
</script>

<style>

</style>
