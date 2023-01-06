<template>
  <div class="submit">
    <Top />
    <Info />
    <SubmitList />
    <div class="submit__bottom">
      <span class="submit__bottom__name">实付金额</span>
      <span class="submit__bottom__total">￥{{ price }}</span>
      <button class="submit__bottom__btn" @click="handleClick(true)">提交订单</button>
    </div>
    <div class="submit__click" v-show="showDialog">
      <div class="submit__mask"></div>
      <div class="submit__dialog">
        <div class="submit__dialog__first" v-show="hiddenComplate">
          <p class="submit__dialog__first__title">确认要离开收银台？</p>
          <p class="submit__dialog__first__tips">
            请尽快完成支付，否则将被取消
          </p>
          <button class="submit__dialog__first__cancel" @click="() => handleConfirmOrder(true)">
            取消订单
          </button>
          <button class="submit__dialog__first__sure" @click="handleSureClick">
            确认支付
          </button>
        </div>
        <div class="submit__dialog__last" v-show="!hiddenComplate">
          <div
            class="submit__dialog__last__close iconfont"
            @click="handleClick(false)"
          >
            &#xe6dd;
          </div>
          <div class="submit__dialog__last__ok iconfont">&#xe651;</div>
          <div class="submit__dialog__last__tips">支付成功，等待配送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from './Top.vue'
import Info from './Info.vue'
import SubmitList from './SubmitList.vue'
import { post } from '../../utils/request'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useSubmitEffect } from './submitEffect'

// 提交订单
const submitOrderClick = () => {
  const showDialog = ref(false)
  const router = useRouter()
  const handleClick = (element) => {
    showDialog.value = !showDialog.value
    // 或者不需要这个参数，直接 submitSureClick 后自动返回，这里是为了关闭按钮的功能
    if (!element) {
      router.push({ name: 'Home' })
    }
  }
  return { showDialog, handleClick }
}

// 确认支付
const submitSureClick = () => {
  const hiddenComplate = ref(true)
  const { handleConfirmOrder } = handleOrder()
  const handleSureClick = () => {
    hiddenComplate.value = !hiddenComplate.value
    handleConfirmOrder()
  }
  return { hiddenComplate, handleSureClick }
}

// 订单请求
const handleOrder = () => {
  const store = useStore()
  const router = useRouter()
  const { shopName, shopId, productList } = useSubmitEffect()
  const handleConfirmOrder = async (isCanceled = false) => {
    const products = []
    for (let i in productList.value) {
      const product = productList.value[i]
      products.push({ id: product._id, num: product.count })
    }
    try {
      const reslut = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (reslut?.errno === 0) {
        store.commit('ClearCartData', { shopId })
        if (isCanceled) {
          router.push({ name: 'Home' })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  return { handleConfirmOrder }
}

export default {
  name: 'Submit',
  components: { Top, Info, SubmitList },
  setup () {
    const { price, shopName } = useSubmitEffect()
    const { showDialog, handleClick } = submitOrderClick()
    const { hiddenComplate, handleSureClick } = submitSureClick()
    const { handleConfirmOrder } = handleOrder()

    return {
      price,
      shopName,
      handleClick,
      showDialog,
      hiddenComplate,
      handleSureClick,
      handleConfirmOrder
    }
  }
}
</script>

<style lang="scss" scoped>
.submit {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f8f8f8;
  overflow-y: scroll;
}
.submit__bottom {
  position: fixed;
  background: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  line-height: 0.5rem;
  font-size: 0.14rem;
  color: #333;
  padding-left: 0.24rem;
  &__total {
    font-weight: 550;
    font-size: 0.16rem;
    margin-left: 0.053rem;
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
    color: #fff;
  }
}
.submit__mask {
  z-index: 99;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.submit__dialog {
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 0.04rem;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  width: 3.01rem;
  height: 1.57rem;
  background: #fff;
  padding: 0.24rem;
  text-align: center;
  font-size: 0.14rem;
  &__first {
    &__title {
      font-size: 0.18rem;
      color: #333;
      margin: 0 0 0.08rem;
    }
    &__tips {
      color: #666;
      margin: 0 0 0.3rem;
    }
    &__cancel,
    &__sure {
      padding: 0.06rem 0.12rem;
      border: 1px solid #4fb0f9;
      border-radius: 0.16rem;
      color: #0091ff;
    }
    &__sure {
      margin-left: 0.24rem;
      color: #fff;
      background-color: #4fb0f9;
    }
  }
  &__last {
    &__close {
      position: absolute;
      right: 0.12rem;
      top: 0.12rem;
      font-size: 0.18rem;
    }
    &__ok {
      font-size: 0.5rem;
      margin: 0.12rem 0 0.2rem;
    }
    &__tips {
      font-size: 0.18rem;
      color: #333333;
    }
  }
}
</style>
