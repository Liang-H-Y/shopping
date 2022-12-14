<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe67f;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe7c4;</span>
  </div>
</template>

<script>
export default {
  name: 'Position'
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  color: $content-fontcolor;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  // 此处直接 &__icon 会导致优先级不确定，样式无法覆盖
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    top: 0.17rem;
    right: 0;
    font-size: 0.2rem;
  }
}
</style>
