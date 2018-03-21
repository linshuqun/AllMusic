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
            <td>{{ item.name }}</td>
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
      items: [],
      ok: false,
      page: 1,
      total: 0
    };
  },
  methods: {
    getItems: function() {
      console.log(this.source + " get items");
      var _this = this;
      _this.items.splice(0, _this.items.length);
      let url =
        "https://music-api-jwzcyzizya.now.sh/api/search/song/" +
        this.source +
        "?key=" +
        this.word +
        "&page=" +
        _this.page +
        "&limit=10";
      _this.ok = false;
      axios.get(url).then(
        function(res) {
          _this.total = res.data.total / 10;
          var result = res.data.songList;
          for (let i = 0; i < result.length && i < 10; i++) {
            let item = {
              name: "",
              artists: "",
              mid: "",
              album: "",
              aid: ""
            };
            item.name = result[i].name;
            item.artists = result[i].artists
              .map(function(artist, index, array) {
                return artist.name;
              })
              .toString();
            item.mid = result[i].id;
            item.album = result[i].album.name;
            item.aid = result[i].album.id;
            _this.items.push(item);
          }
          _this.ok = true;
        },
        function(err) {
          console.log(err);
        }
      );
    },
    nextPage: function() {
      if (this.page + 1 <= this.total) {
        this.page += 1;
        this.getItems();
      }
    },
    previousPage: function() {
      if (this.page - 1 >= 1) {
        this.page -= 1;
        this.getItems();
      }
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
