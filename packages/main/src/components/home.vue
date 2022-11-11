<template>
  <div>
    <h1>我是主应用</h1>
    <button @click="() => $router.replace('/subapp-vue')">replaceState</button>
  </div>
</template>

<script>
export default {
  name: "HomeComp",
};
</script>