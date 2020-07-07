<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">保存</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  @Prop(Number) value!: number;
  output = this.value.toString();
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const inputVal = button.textContent as string;
    if (this.output.length === 16) return;
    if (this.output === "0") {
      if (inputVal === ".") {
        this.output += inputVal;
      } else {
        this.output = inputVal;
      }
    } else if (this.output.indexOf(".") > -1 && inputVal === ".") {
      return;
    } else {
      this.output += inputVal;
    }
  }
  remove() {
    this.output = this.output.slice(0, this.output.length - 1);
  }
  clear() {
    this.output = "";
  }
  ok() {
    this.$emit("update:value", parseFloat(this.output));
    this.$emit("submit:value", this.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

$btn-height: 15vw;
.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 0 16px;
    text-align: right;
    min-height: 50px;
    overflow: auto;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: $btn-height;
      max-height: 10vh;
      float: left;
      background: transparent;
      border: none;

      &.ok {
        height: 2 * $btn-height;
        max-height: 20vh;
        float: right;
      }
      @media screen and (max-height: 600px) {
        height: 50px;
        &.ok {
          @media screen and (max-height: 600px) {
            height: 2 * 50px;
          }
        }
      }
      &.zero {
        width: 25 * 2%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>