<template>
  <div class="main">
    <div class="button-panel">
      <el-button type="primary" @click="toMarkDown"
        >进入MakeDown编辑器</el-button
      >
      <el-button type="primary" @click="toMarkDown"
        >进入JSON转换编辑器</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  methods: {
    toMarkDown() {
      this.$router.push({
        path: "toMakeDown",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  text-align: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.button-panel {
  padding-top: 10%;
}
</style>
