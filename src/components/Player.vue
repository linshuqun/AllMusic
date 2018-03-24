<template>
  <div>
      <p>this is controller</p>
      <aplayer :music="songList" :narrow="false" theme="#b7daff" v-if="flag" ref="player">
      </aplayer> -->
  </div>
</template>

<script>
import aplayer from "vue-aplayer";

export default {
  name: "player",
  components: { aplayer },
  props: ['songList'],
  data() {
    return {
      flag: false,
      songList: []
    }
  },
  async mounted () {
    await this.init();
    let aplayer = this.$refs.player.control;
    aplayer.play();
  },
  methods: {
    async init() {
      // 应该要有一波操作
      
      this.flag = true;
    }
  }
};
</script>

