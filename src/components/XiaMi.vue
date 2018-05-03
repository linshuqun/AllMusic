<template>
  <div id="xiami">
    <show source="xiami" v-bind:word="byXiaMi" v-bind:search="allSearch" v-on:playSong="addSong" v-on:passInfor="getInfor"></show>
  </div>
</template>

<script>
import show from "./Show.vue";

export default {
  name: "XiaMi",
  props: ["byXiaMi", "allSearch"],
  components: { show },
  methods: {
    addSong(song) {
      this.$emit("addSongToList", song);
    },
    getInfor(infor) {
      this.$emit("transferInfor", infor);
    }
  }
};
</script>

<style>

</style>
