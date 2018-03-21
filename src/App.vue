<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <h2>{{ source }}</h2>
    <h3>{{ author }}</h3>
    <p>{{ key }}</p>

    <div class="col-md-6 col-md-offset-3">
      <div class="input-group input-group-md">
        <input type="text" class="form-control" placeholder="歌曲/歌手/专辑" v-model="key">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button" @click="change">Go!</button>
        </span>
      </div>
    </div>

    <div class="col-md-6 col-md-offset-3">
      <ol class="breadcrumb">
        <li><router-link to="/NetEase">网易云</router-link></li>
        <li><router-link to="/QQ">QQ</router-link></li>
        <li><router-link to="/XiaMi">虾米</router-link></li>
      </ol>
      <keep-alive>
        <router-view v-bind:byQQ="msg" v-bind:byNetEase="msg" v-bind:byXiaMi="msg" v-bind:allSearch="check">
        </router-view>
      </keep-alive>
    </div>

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      source: "All Music",
      author: "linshuqun",
      msg: "",
      key: "",
      check: 0
    };
  },
  methods: {
    change() {
      if (this.key == "") {
        this.author = "qingshuru";
      } else {
        this.author = "";
        this.msg = eval("'" + encodeURI(this.key) + "'");
        console.log(this.msg);
        this.check += 1;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
