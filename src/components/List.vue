<template>
  <div>
    <img src="../assets/loading.gif" width="20px" height="20px" v-if="waiting">
    <div class="panel panel-info" v-if="!waiting">
      <div class="panel-heading">
        <h3 class="panel-title">热门歌曲</h3>
      </div>
      <div class="panel-body">
        <table class="table">
          <thead>
            <tr>
              <th class="text-center">歌曲</th>
              <th class="text-center">歌手</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(song, index) in songList" :key="index">
              <td @click="play(song)">{{ song.title }}</td>
              <td>{{ song.author }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "List",
  data() {
    return {
      songList: [],
      waiting: true
    };
  },
  created: function() {
    var that = this;
    // 发起请求获得推荐歌曲
    let url = "http://localhost:8081/suggest";
    axios.get(url).then(
      function(res) {
        let result = res.data.songList;
        // 填充songList数组
        for (let i = 0; i < 10; i++) {
          // 每首歌包含的信息
          let song = {
            title: "",    // 歌曲名
            author: "",   // 歌手名
            src: "",      // 歌曲来源
            pic: "",      // 封面来源
            lrc: ""       // 歌词
          };
          song.title = result[i].name;
          song.author = result[i].artists
            .map(function(artist, index, array) {
              return artist.name;
            })
            .toString();
          song.pic = result[i].album.coverSmall;
          song.src = result[i].file;
          that.songList.push(song);
        }
        // 取消等待图片的显示
        that.waiting = false;
      },
      function(err) {
        console.log(err);
      }
    );
  },
  methods: {
    play: function(song) {
      var that = this;
      // 根据歌曲名与歌手名查询歌词
      let url =
        "http://localhost:8081/get/lyric?title=" +
        song.title +
        "&artists=" +
        song.author;
      axios.get(url).then(
        function(res) {
          console.log(res.data);
          song.lrc = res.data;
          that.$emit("addSongToList", song);
        },
        function(err) {
          console.log(err);
          song.lrc = '未找到歌词';
          that.$emit("addSongToList", song);
        }
      );
    }
  }
};
</script>

<style scoped>
img {
  margin-top: 20px;
}
td:hover {
  color: #42b983;
  cursor: pointer;
}
</style>
