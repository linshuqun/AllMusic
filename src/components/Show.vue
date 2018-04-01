<template>
  <div id="show">
    <img src="../assets/loading.gif" width="20px" height="20px" v-if="!ok">
    <div v-if="ok">
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="text-center">歌曲</th>
            <th class="text-center">歌手</th>
            <th class="text-center">专辑</th>
         </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td @click="play(item)">{{ item.name }}</td>
            <td>{{ item.artists }}</td>
            <td>{{ item.album }}</td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul class="pager">
          <li><a @click="previousPage">上一页</a></li>
          <li><a @click="nextPage">下一页</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "show",
  props: ["source", "search", "word"],
  data() {
    return {
      items: [], // 用于保存获得的歌曲信息
      ok: false, // 判断歌曲信息是否可以展示
      page: 1,   // 当前页
      total: 0,  // 返回信息中的歌曲总数
      success: 0 // 判断是否可以触发事件，传递歌曲对象
    };
  },
  methods: {
    getItems: function() {
      console.log(this.source + " get items");
      var _this = this;
      _this.items.splice(0, _this.items.length);
      let url =
        "http://localhost:8081/search/song/?&source=" +
        this.source +
        "&key=" +
        this.word +
        "&page=" +
        this.page;
      _this.ok = false;
      // 向本地服务器发送请求，根据关键词获得歌曲信息
      axios.get(url).then(
        function(res) {
          if (res.data.songList) {
            _this.total = res.data.total / 10;
            var result = res.data.songList;
            for (let i = 0; i < result.length; i++) {
              let item = {
                name: "",     // 歌曲名
                artists: "",  // 歌手名
                mid: "",      // 歌曲id
                album: "",    // 专辑名
                //aid: "",
                cover: "",    // 封面路径
                file: ""      // 歌曲的真实url 虾米用
              };
              item.name = result[i].name;
              item.artists = result[i].artists
                .map(function(artist, index, array) {
                  return artist.name;
                })
                .toString();
              item.mid = result[i].id;
              item.album = result[i].album.name;
              //item.aid = result[i].album.id;
              item.cover = result[i].album.coverSmall;
              // 如果返回信息存在file属性，则直接保留
              if (result[i].file) item.file = result[i].file;
              _this.items.push(item);
            }
            _this.ok = true;
          }
        },
        function(err) {
          console.log(err);
        }
      );
    },
    // 下一页
    nextPage: function() {
      if (this.page + 1 <= this.total) {
        this.page += 1;
        this.getItems();
      }
    },
    // 上一页
    previousPage: function() {
      if (this.page - 1 >= 1) {
        this.page -= 1;
        this.getItems();
      }
    },
    // 播放歌曲，出发事件，向上层传递对象
    play: function(item) {
      var that = this;
      let song = {
        title: "",
        author: "",
        src: "",
        pic: "",
        lrc: ""
      };
      song.title = item.name;
      song.author = item.artists;
      song.pic = item.cover;
      // 如果来源是虾米的话，直接使用file属性，否则再次发起请求，根据mid获得真实url
      if (item.file != "") {
        song.src = item.file;
        that.success += 1;
        console.log(that.success);
        that.ready(song);
      } else {
        let url =
          "http://localhost:8081/get/song/?source=" +
          that.source +
          "&id=" +
          item.mid;
        axios.get(url).then(
          function(res) {
            console.log(res.data);
            if (res.data.success == false) song.src = false;
            else song.src = res.data.url;
            that.success += 1;
            console.log('get song');
            console.log(that.success);
            that.ready(song);
          },
          function(err) {
            console.log(err);
          }
        );
      }
      // 根据歌曲名与歌手获得歌词
      let lyricUrl =
        "http://localhost:8081/get/lyric/?&title=" +
        song.title +
        "&artists=" +
        song.author;
      axios.get(lyricUrl).then(
        function(res) {
          song.lrc = res.data;
          that.success += 1;
          console.log('get lyric');
          console.log(that.success);
          that.ready(song);
        },
        function(err) {
          //item.lrc = '未找到歌词';
          console.log(err);
        }
      );
    },
    // 当真实url与歌词都获得时，触发事件，将歌曲对象传递给上层，用以播放
    ready: function(song) {
      if (this.success != 0 && this.success % 2 == 0)
        this.$emit("playSong", song);
    }
  },
  watch: {
    search: function(val, old) {
      if (this.search > 1) {
        this.page = 1;
        this.getItems();
      }
    }
  },
  created: function() {
    console.log(this.source + " created");
    this.getItems();
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  margin-top: 2px;
}
li {
  margin: 0 10px;
}
a:hover {
  color: #42b983;
  cursor: pointer;
}
td:hover {
  color: #42b983;
  cursor: pointer;
}
table {
  text-align: center;
  table-layout: fixed;
}
#show {
  margin-top: 2px;
}
</style>
