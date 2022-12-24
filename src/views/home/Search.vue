<template>
  <div class="search">
    <div class="iconfont search__icon">&#xe741;</div>
    <input
      type="text"
      class="search__input"
      placeholder="山姆会员商店优惠商品"
    />
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.search {
  position: relative;
  line-height: 0.32rem;
  font-size: 0.14rem;
  color: #b7b7b7;
  &__icon {
    position: absolute;
    top: 50%;
    left: 0.16rem;
    margin-top: -0.16rem;
    font-size: 0.16rem;
  }
  &__input {
    width: 100%;
    height: 0.32rem;
    border: none;
    background-color: $input-bgColor;
    box-sizing: border-box;
    padding-left: 0.42rem;
    border-radius: 0.16rem;
  }
}
</style>
