<template>
  <div class="mask" v-if="showCart" @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="content__details">
        <div class="content__details__title">
          <div class="content__details__title__all">
            <span
              class="content__details__title__all__icon iconfont"
              v-html="allChecked ? '&#xe652;' : '&#xe66c;'"
              @click="() => setCartItemsChecked(shopId)"
            >
            </span>
            全选
          </div>
          <div
            class="content__details__title__clear"
            @click="() => cleanCartProducts(shopId)"
          >
            清空购物车
          </div>
        </div>
        <template v-for="item in productList" :key="item._id">
          <div class="content__details__item" v-if="item.count > 0">
            <div
              class="item__check iconfont"
              v-html="item.check ? '&#xe652;' : '&#xe66c;'"
              @click="changeCartItemChecked(shopId, item._id)"
            ></div>
            <img :src="item.imgUrl" class="item__img" />
            <div class="item__detail">
              <h4 class="item__detail__title">{{ item.name }}</h4>
              <div class="item__detail__price">
                <span class="item__detail__price__now">&yen;</span
                >{{ item.price }}
                <span class="item__detail__price__yuan"
                  >&yen;{{ item.oldPrice }}</span
                >
              </div>
              <div class="item__detail__btn">
                <span
                  class="item__detail__btn__minus"
                  @click="
                    () => {
                      changeCartItemInfo(shopId, item._id, item, -1)
                    }
                  "
                  >-
                </span>
                <span class="item__detail__btn__num">
                  {{ item.count || 0 }}
                </span>
                <span
                  class="item__detail__btn__plus"
                  @click="
                    () => {
                      changeCartItemInfo(shopId, item._id, item, 1)
                    }
                  "
                  >+
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="cart__img">
      <img
        src="http://www.dell-lee.com/imgs/vue3/basket.png"
        @click="handleCartShowChange"
      />
      <div class="cart__img__num">{{ total }}</div>
    </div>
    <div class="cart__info">
      <span class="cart__info__title">总计：</span>
      <span class="cart__info__total">&yen;{{ price }}</span>
    </div>
    <button class="cart__btn">
      <router-link :to="{name: 'Submit'}">
      去结算
      </router-link>
    </button>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useCommonCartEffect } from './commonUseCartEffect'

// 获取购物车信息逻辑
const useCartEffect = (shopId, router) => {
  const { changeCartItemInfo } = useCommonCartEffect()
  const store = useStore()
  const cartList = store.state.cartList
  let total = computed(() => {
    const productList = cartList[shopId]?.productList
    let count = 0
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })

  let price = computed(() => {
    const productList = cartList[shopId]?.productList
    let count = 0
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        if (product.check) {
          count += product.count * product.price
        }
      }
    }
    return count.toFixed(2)
  })

  let allChecked = computed(() => {
    const productList = cartList[shopId]?.productList
    let result = true
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        if (product.count > 0 && !product.check) {
          result = false
        }
      }
    }
    return result
  })

  let productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })

  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }

  // const toSubmit = (router) => {
  //   if (productList.value === null) return
  //   console.log(productList.value.length)
  //   // router.push('SubmitOrder')
  // }

  return {
    total,
    price,
    productList,
    allChecked,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked
  }
}

// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const shopId = route.params.id

    const { showCart, handleCartShowChange } = toggleCartEffect()
    const {
      total,
      price,
      productList,
      allChecked,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked
    } = useCartEffect(shopId, router)
    return {
      total,
      price,
      productList,
      allChecked,
      changeCartItemChecked,
      changeCartItemInfo,
      shopId,
      showCart,
      cleanCartProducts,
      setCartItemsChecked,
      handleCartShowChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.cart {
  z-index: 9999;
  border-top: 0.01rem solid #f1f1f1;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.5rem;
  background: #ffffff;
  display: flex;
  .content__details {
    background-color: #ffffff;
    position: absolute;
    width: 100%;
    bottom: 0.5rem;
    left: 0;
    overflow-y: scroll;
    &__title {
      position: relative;
      border-bottom: 1px solid #f1f1f1;
      line-height: 0.52rem;
      &__all {
        font-size: 0.14rem;
        color: #333333;
        &__icon {
          position: relative;
          top: 0.02rem;
          color: #0091ff;
          font-size: 0.2rem;
          margin-left: 0.18rem;
          margin-right: 0.08rem;
        }
      }
      &__clear {
        position: absolute;
        right: 0.16rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.14rem;
        color: #333;
      }
    }
    &__item {
      display: flex;
      border-bottom: 0.01rem solid #f1f1f1;
      margin-top: 0.12rem;
      margin-right: 0.18rem;
      .item__check {
        color: #0091ff;
        font-size: 0.2rem;
        margin-left: 0.18rem;
        line-height: 0.46rem;
      }
      .item__img {
        margin: 0 0.16rem 0.12rem;
        width: 0.46rem;
        height: 0.46rem;
      }
      .item__detail {
        overflow: hidden;
        position: relative;
        width: 100%;
        &__title {
          @include ellipsis;
          font-size: 0.14rem;
          color: #333333;
          margin: 0;
        }
        &__price {
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: #e93b3b;
          &__now {
            font-size: 0.12rem;
          }
          &__yuan {
            font-size: 0.1rem;
            color: #999;
            text-decoration: line-through;
          }
        }
        &__btn {
          display: flex;
          position: absolute;
          right: 0;
          bottom: 0.24rem;
          text-align: center;
          line-height: 0.2rem;
          &__minus,
          &__plus {
            display: inline-block;
            width: 0.2rem;
            width: 0.2rem;
            font-size: 0.2rem;
            border-radius: 50%;
          }
          &__minus {
            border: 0.01rem solid #666;
          }
          &__num {
            font-size: 0.14rem;
            color: #333333;
            margin: 0 0.1rem;
          }
          &__plus {
            color: #fdfeff;
            border: 0.01rem solid #0091ff;
            background-color: #0091ff;
          }
        }
      }
    }
  }
  &__img {
    position: relative;
    width: 0.76rem;
    img {
      width: 0.28rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &__num {
      position: absolute;
      left: 0.42rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      font-size: 0.12rem;
      text-align: center;
      border-radius: 0.1rem;
      background-color: #e93b3b;
      color: #ffffff;
      line-height: 0.2rem;
      transform: scale(0.5);
    }
  }
  &__info {
    display: flex;
    margin-left: 0.08rem;
    line-height: 0.5rem;
    &__title {
      font-size: 0.12rem;
      color: #333333;
    }
    &__total {
      font-size: 0.18rem;
      color: #e93b3b;
      font-weight: bold;
    }
  }
  &__btn {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0.98rem;
    height: 100%;
    background: #4fb0f9;
    outline: none;
    border: none;
    font-size: 0.14rem;
    a{
      color: #ffffff;
      text-decoration: none;
    }
  }
}
</style>
