<template>
  <div>
    <div class="center">
      <h2>{{ source }}</h2>
      <p v-if="warning" ref="p"><span class="label label-danger">请输入搜索关键词</span></p>
    </div>

    <div class="col-md-6 col-md-offset-3">
      <div class="input-group input-group-md">
        <input type="text" class="form-control" placeholder="歌曲/歌手/专辑" v-model="key">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button" @click="change">Go!</button>
        </span>
      </div>
    </div>

    <div class="col-md-6 col-md-offset-3 center" v-if="show">
      <ol class="breadcrumb">
        <li><router-link to="/NetEase">网易云</router-link></li>
        <li><router-link to="/QQ">QQ</router-link></li>
        <li><router-link to="/XiaMi">虾米</router-link></li>
      </ol>
    </div>

    <div class="col-md-6 col-md-offset-3 center">
      <keep-alive>
        <router-view v-bind:byQQ="msg" v-bind:byNetEase="msg" v-bind:byXiaMi="msg" v-bind:allSearch="check" v-on:addSongToList="playCurrentMusic">
        </router-view>
      </keep-alive>
    </div>

    <div class="col-md-6 col-md-offset-3">
      <aplayer :autoplay="flag" :controls="true" :list="songList" :music="songList[current]" :showLrc="true" v-if="flag" ref="player"/>
    </div>
  </div>
</template>

<script>
import aplayer from "vue-aplayer";

export default {
  name: "App",
  components: { aplayer: aplayer },
  data() {
    return {
      source: "All Music",
      msg: "",
      key: "",
      check: 0,
      songList: [],
      current: 0,
      flag: false,
      warning: false,
      show: false
    };
  },
  methods: {
    change() {
      if (this.key == "") {
        this.warning = true;
      } else {
        this.author = "";
        this.msg = eval("'" + encodeURI(this.key) + "'");
        console.log(this.msg);
        this.check += 1;
        if (this.check == 1) this.show = true;
      }
    },
    playCurrentMusic(song) {
      this.songList.push(song);
      this.current = this.songList.length - 1;
      this.flag = true;
      if (this.current > 0) this.$refs.player.audio.autoplay = true;
    }
  },
  watch: {
    check: function(old, val) {
      if (this.key == "") this.warning = true;
      else this.warning = false;
    },
    key: function() {
      if (this.key != "") this.warning = false;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  height: auto;
}

.center {
  text-align: center;
}
</style>
