<template>
  <div>
    <div class="aside-item"><router-link to="/">首页</router-link></div>
    <div class="aside-item">
      <router-link to="subapp-vue">vue</router-link>

      <!-- <a href="http://localhost:8081/subapp-vue">vue</a> -->
    </div>
    <div class="aside-item">
      <router-link to="subapp-react">react</router-link>

      <!-- <a href="http://localhost:8081/subapp-react">react</a> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "Menu",
};
</script>

<style scoped>
.router-link-active {
  text-decoration: none;
}
.aside-item {
  height: 40px;
  cursor: pointer;
}

/*包含以下四种的链接*/
a {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
a:link {
  text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
a:active {
  text-decoration: none;
}
</style>