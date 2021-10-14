<script>
export default {
  name: "login",
  methods: {
    goHome() {
      this.$router.push("/welcome");
    },
  },
};
</script>

<template>
  <div>
    <h1>欢迎来到登录界面</h1>
    <el-button @click="goHome">回首页</el-button>
  </div>
</template>

<style scoped></style>
