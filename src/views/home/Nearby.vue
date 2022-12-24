<template>
  <div class="near">
    <h3 class="near__title">附近店铺</h3>
    <router-link
      v-for="item in nearList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopInfo :item="item"/>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearbyListEffect = () => {
  const nearList = ref([])
  const getNearbyList = async () => {
    const reslut = await get('/api/shop/hot-list')
    if (reslut?.errno === 0 && reslut?.data?.length) {
      nearList.value = reslut.data
    }
    console.log(nearList.value)
  }
  return { nearList, getNearbyList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearList }
  }
}
</script>

<style lang="scss" scoped>
.near {
  color: #333333;
  &__title {
    font-size: 0.18rem;
    font-weight: normal;
    margin: 0.16rem 0 0.02rem;
  }
  a{
    text-decoration: none;
  }
}
</style>
