<template>
  <div class="submit__info">
    <p class="submit__info__title">收货地址</p>
    <p class="submit__info__address">广东省广州市科技园2号楼10层</p>
    <span class="submit__info__name">美少女(先生)</span>
    <span class="submit__info__tel">189540225832</span>
    <div class="submit__info__other"></div>
  </div>
</template>

<script>
export default {
  name: 'Info'
}
</script>

<style lang="scss" scoped>
.submit__info {
  position: absolute;
  box-sizing: border-box;
  color: #333;
  font-size: 0.12rem;
  width: 3.39rem;
  height: 1.11rem;
  top: 0.685rem;
  left: 0.18rem;
  right: 0.18rem;
  border-radius: 0.04rem;
  background-color: #fff;
  padding: 0.16rem;
  &__title {
    font-size: 0.16rem;
    margin: 0;
  }
  &__address {
    font-size: 0.14rem;
    margin: 0.14rem 0 0.1rem;
  }
  &__name,
  &__tel {
    color: #666666;
  }
  &__other {
    position: absolute;
    right: 0.16rem;
    top: 50%;
    transform: translateY(-50%) rotate(225deg) scale(0.5);
    width: 0.2rem;
    height: 0.2rem;
    border-bottom: 2px solid #666;
    border-left: 2px solid #666;
  }
}
</style>
