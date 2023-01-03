<template>
  <div class="cartlist">
    <div class="cartlist__title">我的全部购物车 (2)</div>
    <div v-for="item in cartList" :key="item.shopId" class="cartlist__cart">
      <p class="cartlist__cart__title">{{ item.shopName }}</p>
      <div
        class="cartlist__cart__content"
        v-for="product in item.productList"
        v-show="product._id <= 2 || showList"
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
      <div
        class="cart__cart__hidden"
        v-if="getLength(item.productList) > 2"
        @click="showProduct"
      >
        共计{{ getLength(item.productList) }}件/1.4kg
        <div class="cart__cart__hidden__icon"></div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="1" />
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Docker from '../home/Docker.vue'

// 计算 pruductList 是数量（为什么 .length 获取不到呀）
const getProductListNum = () => {
  let getLength = (productList) => {
    let num = 0
    for (let index in productList) {
      num = index
    }
    return num
  }
  return { getLength }
}

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
  components: { Docker },
  setup () {
    const store = useStore()
    const cartList = store.state.cartList || {}
    const { getLength } = getProductListNum()

    const { showProduct, showList } = showAllProduct()
    return { cartList, getLength, showProduct, showList }
  }
}
</script>

<style lang="scss" scoped>
.cartlist {
  background-color: #f8f8f8;
  height: 100%;
  overflow-y: scroll;
  &__title {
    padding: 0.11rem 0 0.11rem;
    font-size: 0.16rem;
    color: #333;
    text-align: center;
    background-color: #fff;
  }
  &__cart {
    padding: 0.16rem;
    margin: 0.16rem 0.18rem;
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
}
</style>
