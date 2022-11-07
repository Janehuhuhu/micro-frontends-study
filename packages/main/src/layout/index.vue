<template>
  <div>
    <el-container class="container">
      <el-aside width="100px">
        <Menu />
      </el-aside>
      <el-container>
        <el-header>微前端</el-header>
        <el-main>
          <!-- 主应用路由渲染出口 -->
          <router-view></router-view>
          <!-- 微前端子应用渲染出口 -->
          <div id="subapp-container"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "./menu.vue";
export default {
  name: "App",
  components: {
    Menu,
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* height: 100vh; */
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0;
}
.el-aside {
  background-color: #ccc;
  color: #333;
  text-align: center;
  line-height: 40px;
  padding-top: 20px;
}
.container {
  height: 100vh;
}
</style>
