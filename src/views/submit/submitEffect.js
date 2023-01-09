import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

// 与订单相关的
export const useSubmitEffect = () => {
  const route = useRoute()
  const store = useStore()

  const shopId = route.params.id
  const cartList = store.state.cartList || {
    shopName: '',
    productList: {}
  }

  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (let i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  const shopName = computed(() => {
    // 因为 '' 不具备响应式，所以无法显示，必须通过 computed
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  let price = computed(() => {
    let count = 0
    if (productList.value) {
      for (let i in productList.value) {
        const product = productList.value[i]
        if (product.check) {
          count += product.count * product.price
        }
      }
    }
    return count.toFixed(2)
  })

  // 计算 pruductList 是数量
  let total = computed(() => {
    let num = 0
    for (let index in productList.value) {
      num++
      console.log(index)
    }
    return num
  })

  return { shopId, shopName, cartList, productList, price, total }
}
