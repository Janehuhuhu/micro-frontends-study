<template>
  <div id="app">
    <Container />
  </div>
</template>

<script>
import Container from "./layout";
export default {
  name: "App",
  components: {
    Container,
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
.container {
  height: 100vh;
}
</style>
