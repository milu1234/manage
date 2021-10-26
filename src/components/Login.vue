<script>
export default {
  name: "login",
  methods: {
    goHome() {
      this.$router.push("/welcome");
    },
  },
  mounted() {
    // this.$request({
    //   method: "get",
    //   url: "/login",
    //   data: {
    //     name: "chris",
    //   },
    // }).then((res) => {
    //   console.log(res);
    // });
    // this.$request.get("/login", { name: "jason" }, { mock: true }).then((res) => {
    //   console.log(res);
    // });
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
