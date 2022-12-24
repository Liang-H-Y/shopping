<template>
  <div class="warrper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe679;</div>
      <div class="search__icon iconfont">&#xe741;</div>
      <input class="search__input" placeholder="请输入商品名称搜索" />
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content :shopName="item.name"/>
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'
import { get } from '../../utils/request'

// 通过路由获取当前商铺信息
const useItemDataEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 点击回退逻辑
const useRouterBack = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useItemDataEffect()
    const { handleBackClick } = useRouterBack()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.warrper {
  padding: 0 0.18rem;
}
.search {
  width: 100%;
  height: 0.32rem;
  margin: 0.14rem 0 0.04rem;
  line-height: 0.32rem;
  display: flex;
  position: relative;
  &__back {
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__icon {
    position: absolute;
    left: 0.44rem;
    top: 50%;
    transform: translateY(-50%);
    color: #b7b7b7;
    font-size: 0.2rem;
  }
  &__input {
    width: 100%;
    border: none;
    background: $input-bgColor;
    border-radius: 0.16rem;
    font-size: 0.14rem;
    color: #333333;
    line-height: 0.16rem;
    padding-left: 0.44rem;
  }
}
</style>
