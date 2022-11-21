<template>
  <div class="hello">
    <p>hello</p>
    <!-- 子应用内容 -->
    <div id="subapp"><p>sub-app</p></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  mounted() {
    const subapp = document.getElementById("subapp");
    const oDiv = subapp.attachShadow({ mode: "open" });
    oDiv.innerHTML = `
      <p>这是通过 shadow dom 添加的内容</p>
      <style>
        p {color: pink}
      </style>
    `;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  color: red;
}
</style>
