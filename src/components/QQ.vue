<template>
  <div id="qq">
    <show source="qq" v-bind:word="byQQ" v-bind:search="allSearch" v-on:playSong="addSong" v-on:passInfor="getInfor"></show>
  </div>
</template>

<script>
import show from "./Show.vue";

export default {
  name: "QQ",
  props: ["byQQ", "allSearch"],
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

<style scoped>

</style>
