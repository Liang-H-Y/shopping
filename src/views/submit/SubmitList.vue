<template>
  <!-- 有空可以封装一下这个组件 -->
  <div class="cartlist__cart">
    <p class="cartlist__cart__title">{{ shopName }}</p>
    <div
      class="cartlist__cart__content"
      v-for="(product, index) in productList"
      v-show="index <= 2 || showList"
      :key="product._id"
    >
      <img :src="product.imgUrl" class="cartlist__cart__img" />
      <div class="cartlist__cart__info">
        <p class="cartlist__cart__name">{{ product.name }}</p>
        <span class="cartlist__cart__price"
          >￥{{ product.price }} × {{ product.count }}</span
        >
        <span class="cartlist__cart__total"
          >￥{{ (product.price * product.count).toFixed(2) }}</span
        >
      </div>
    </div>
    <div class="cart__cart__hidden" v-if="total > 2" @click="showProduct">
      共计{{ total }}件/1.4kg
      <div class="cart__cart__hidden__icon"></div>
    </div>
  </div>
</template>

<script>
import { useSubmitEffect } from './submitEffect'
import { ref } from 'vue'

// 展示隐藏 product
const showAllProduct = () => {
  const showList = ref(false)
  const showProduct = () => {
    showList.value = !showList.value
  }
  return { showList, showProduct }
}

export default {
  name: 'CartList',
  setup () {
    const { showList, showProduct } = showAllProduct()
    const { shopName, cartList, productList, price, total } = useSubmitEffect()

    return { shopName, cartList, productList, price, total, showList, showProduct }
  }
}
</script>

<style lang="scss" scoped>
.cartlist__cart {
  padding: 0.16rem;
  margin: 0.32rem 0.18rem;
  background-color: #fff;
  &__title {
    font-size: 0.16rem;
    color: #333333;
    margin: 0;
  }
  &__content {
    display: flex;
    .cartlist__cart__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-top: 0.16rem;
    }
    .cartlist__cart__info {
      position: relative;
      padding-left: 0.16rem;
      line-height: 0.2rem;
      width: 100%;
      font-size: 0.14rem;
      .cartlist__cart__name {
        margin: 0.18rem 0 0.06rem;
        color: #333;
      }
      .cartlist__cart__price {
        color: #e93b3b;
        font-size: 0.12rem;
      }
      .cartlist__cart__total {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 0.14rem;
        color: #000;
        text-align: right;
      }
    }
  }
  .cart__cart__hidden {
    text-align: center;
    line-height: 0.28rem;
    margin-top: 0.16rem;
    background: #f5f5f5;
    font-size: 14px;
    color: #999;
    &__icon {
      margin-left: 0.1rem;
      transform: rotate(45deg);
      display: inline-block;
      width: 0.12rem;
      height: 0.12rem;
      border-bottom: 1px solid #999;
      border-right: 1px solid #999;
    }
  }
}
</style>
