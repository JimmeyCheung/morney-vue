<template>
  <nav>
    <router-link to="/label" class="item" active-class="select">
      <Icon name="label" />标签
    </router-link>
    <router-link to="/money" class="item" active-class="select">
      <Icon name="money" />记一笔
    </router-link>
    <router-link to="/statistics" class="item" active-class="select">
      <Icon name="statistics" />统计
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  font-size: 14px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);

  > .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33.3333%;
    color: #000;
  }
  > .item.select {
    color: $color-highlight;
  }
}
</style>
