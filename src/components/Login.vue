<template>
  <div>
      <form class="form-inline">
        <div class="form-group">
            <label class="sr-only" for="InputEmail3">Email address</label>
            <input type="email" class="form-control" id="InputEmail3" placeholder="Email">
        </div>
        <div class="form-group">
            <label class="sr-only" for="InputPassword3">Password</label>
            <input type="password" class="form-control" id="InputPassword3" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-default">登录</button>
        <span role="presentation" class="disabled"><a href="#">注册</a></span>
        </form>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>


