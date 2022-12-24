<template>
  <div class="shop">
    <div>
      <img :src="item.imgUrl" class="shop__img" />
    </div>
    <div
        :class="{'shop__content': true, 'shop__content--border': hideBorder ? false : true}"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tags__tag">月售: {{ item.sales }}</span>
        <span class="shop__content__tags__tag"
          >起送: {{ item.expressLimit }}</span
        >
        <span class="shop__content__tags__tag"
          >基础: {{ item.expressPrice }}</span
        >
      </div>
      <p class="shop__content__highlight">
        {{ item.slogan }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scoped>
.shop {
  color: #333333;
  display: flex;
  padding: 0.12rem 0 0;
  &__img {
    width: 0.56rem;
    margin-right: 0.16rem;
  }
  &__content {
    width: 100%;
    &--border{
      border-bottom: 0.01rem solid #f1f1f1;
    }
    &__title {
      font-size: 0.16rem;
    }
    &__tags {
      font-size: 0.13rem;
      padding: 0.08rem 0 0;
      &__tag {
        margin-right: 0.16rem;
      }
    }
    &__highlight {
      font-size: 0.13rem;
      margin-top: 0.08rem;
      color: #e93b3b;
    }
  }
}
</style>
