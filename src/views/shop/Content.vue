<template>
  <div class="content">
    <div class="content__menu">
      <div
        v-for="item in menu"
        :key="item.name"
        @click="() => handleMuneClick(item.tab)"
        :class="{
          content__menu__option: true,
          'content__menu__option--active': currentTab === item.tab
        }"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="content__details">
      <div
        v-for="item in contentList"
        :key="item._id"
        class="content__details__item"
      >
        <img :src="item.imgUrl" class="item__img" />
        <div class="item__detail">
          <h4 class="item__detail__title">{{ item.name }}</h4>
          <p class="item__detail__sale">月售 {{ item.sales }} 件</p>
          <div class="item__detail__price">
            <span class="item__detail__price__now">&yen;</span>{{ item.price }}
            <span class="item__detail__price__yuan"
              >&yen;{{ item.oldPrice }}</span
            >
          </div>
          <div class="item__detail__btn">
            <span
              class="item__detail__btn__minus"
              @click="
                () => {
                  changeCartItem(shopId, item._id, item, -1, shopName)
                }
              "
              >-</span
            >
            <span class="item__detail__btn__num">
              {{ getProductCartCount(shopId, item._id) }}
            </span>
            <span
              class="item__detail__btn__plus"
              @click="
                () => {
                  changeCartItem(shopId, item._id, item, 1, shopName)
                }
              "
              >+</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '../../utils/request'
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from './commonUseCartEffect'

const menu = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// tab切换相关的
const useTabEffect = () => {
  const currentTab = ref(menu[0].tab)
  const handleMuneClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleMuneClick }
}

// 列表内容相关逻辑
const contentDataEffect = (currentTab, shopId) => {
  const data = reactive({ contentList: {} })

  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.errno === 0 && result?.data?.length) {
      data.contentList = result.data
    }
  }

  watchEffect(() => {
    getContentData()
  })

  // 无语子：这里也一定要用{}！
  const { contentList } = toRefs(data)
  return { contentList }
}

// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore()
  const { changeCartItemInfo, cartList } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem, getProductCartCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleMuneClick } = useTabEffect()
    const { contentList } = contentDataEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect()

    return {
      shopId,
      currentTab,
      cartList,
      menu,
      handleMuneClick,
      contentList,
      changeCartItem,
      getProductCartCount
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.38rem;
  bottom: 0.5rem;
  &__menu {
    overflow-y: scroll;
    width: 0.76rem;
    background-color: orange;
    background: #f5f5f5;
    border-radius: 2px;
    &__option {
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.14rem;
      color: #333333;
    }
    .content__menu__option--active {
      background-color: #fff;
    }
  }
  &__details {
    overflow-y: scroll;
    flex: 1;
    &__item {
      display: flex;
      border-bottom: 0.01rem solid #f1f1f1;
      margin-top: 0.12rem;
      margin-right: 0.18rem;
      .item__img {
        margin: 0 0.16rem 0.12rem;
        width: 0.68rem;
        height: 0.68rem;
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
        &__sale {
          font-size: 0.12rem;
          color: #333333;
          margin: 0.08rem 0;
          line-height: 0.16rem;
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
          bottom: 0.12rem;
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
}
</style>
