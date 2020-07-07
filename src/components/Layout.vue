<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav class="nav" />
  </div>
</template>


<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: auto;
  }
}
</style>