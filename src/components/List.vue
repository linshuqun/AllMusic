<template>
  <div>
      <h1>这是首页，打算显示推荐歌单</h1>
      <player></player>
  </div>
</template>

<script>
import player from "./Player.vue"
export default {
  name: 'List',
  components: { player }
}
</script>

<style>

</style>
