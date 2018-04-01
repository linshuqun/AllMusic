<template>
  <div>
    <div class="center">
      <h2>{{ source }}</h2>
      <p v-if="warning"><span class="label label-danger">请输入搜索关键词</span></p>
      <p v-if="copyright"><span class="label label-danger">未提供版权无法播放</span></p>
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
      <aplayer :autoplay="flag" :controls="true" :list="songList" :music="songList[current]" :showLrc="true" theme='#337ab7' v-if="flag" ref="player"/>
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
      msg: "",              // 将key转换成unicode形式以便搜索
      key: "",              // 输入框中的字符
      check: 0,             // 判断是否要搜索
      songList: [],         // 播放列表
      current: 0,           // 当前播放歌曲的索引
      flag: false,          // 是否要显示播放控制组件
      warning: false,       // 是否要显示警告信息
      show: false,          // 是否要显示来源标签
      copyright: false      // 是否要显示版权信息
    };
  },
  methods: {
    change() {
      if (this.key == "") {
        this.warning = true;
      } else {
        this.author = "";
        // 将字符转换成unicode的形式
        this.msg = eval("'" + encodeURI(this.key) + "'");
        this.check += 1;
        // 若是第一次搜索
        if (this.check == 1) {
          // 显示来源标签
          this.show = true;
          // 跳转路由，显示网易云组件
          this.$router.push({ path: `/netease` });
        }
      }
    },
    playCurrentMusic(song) {
      console.log(song);
      var that = this;
      // 判断歌曲是否能够播放
      if (song.src == false) {
        // 显示提示信息
        this.copyright = true;
        setTimeout(() => {
          that.copyright = false;
        }, 3000);
        return;
      }
      // 往歌曲列表中添加点击歌曲
      this.songList.push(song);
      // 当前播放歌曲的索引指向新添加的歌曲
      this.current = this.songList.length - 1;
      this.flag = true;
      // 当歌曲不止一首时，防止自动播放失效
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
  color: #2c3e50;
  height: auto;
}

.center {
  text-align: center;
}
</style>
