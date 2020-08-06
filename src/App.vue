<template>
  <div id="app">
    <QRCode></QRCode>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/style/helper.scss";
@import "@/assets/style/reset.scss";
body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gainsboro;
  color: #333;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
@media screen and (min-width: 500px) {
}
</style>
