<template>
  <div class="order">
    <div class="order__title">我的订单</div>
    <div class="order__content">
      <div
        class="order__content__cart warrper"
        v-for="(item, index) in list"
        :key="index"
      >
        <span class="order__cart__name">{{ item.shopName }}</span>
        <span class="order__cart__state">{{item.isCanceld ? '已取消' : '已下单'}}</span>
        <div class="order__cart__shop">
          <template
            v-for="(indexItem, innerIndex) in item.products"
            :key="innerIndex"
          >
            <img
              :src="indexItem.product.img"
              class="order__cart__shop__img"
              v-if="innerIndex <= 3"
            />
          </template>
        </div>
        <span class="order__cart__price">￥{{item.totalPrice}}</span>
        <span class="order__cart__total">共{{item.totalNumber}}件</span>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import Docker from '../home/Docker.vue'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach((productItem) => {
          totalNumber += (productItem?.orderSales || 0)
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
        })
        order.totalPrice = totalPrice
        order.totalNumber = totalNumber
      })
      data.list = result.data
    }
  }
  getNearbyList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
.order {
  overflow-y: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &__title {
    padding: 0.11rem 0 0.11rem;
    font-size: 0.16rem;
    color: #333;
    text-align: center;
    background-color: #fff;
  }
  .warrper {
    margin: 0.16rem 0.18rem;
  }
  &__content {
    position: absolute;
    top: 0.44rem;
    left: 0;
    right: 0;
    bottom: 0.49rem;
    background-color: #f8f8f8;
    &__cart {
      background-color: #fff;
      width: 3.39rem;
      height: 1.1rem;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 0.16rem;
      font-size: 0.14rem;
      color: #333;
      position: relative;
      .order__cart__name {
        font-size: 0.16rem;
      }
      .order__cart__state {
        position: absolute;
        right: 0.16rem;
        color: #999;
      }
      .order__cart__shop {
        display: flex;
        margin-top: 0.16rem;
        &__img {
          width: 0.4rem;
          height: 0.4rem;
          margin-right: 0.12rem;
        }
      }
      .order__cart__price {
        color: #e93b3b;
        position: absolute;
        right: 0.16rem;
        bottom: 0.36rem;
      }
      .order__cart__total {
        font-size: 0.12rem;
        line-height: 0.14rem;
        position: absolute;
        right: 0.16rem;
        bottom: 0.18rem;
      }
    }
  }
}
</style>
