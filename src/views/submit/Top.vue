<template>
  <div class="submit__top">
    <div class="submit__top__back" @click="back"></div>
    <p class="submit__top__title">确认订单</p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

// 返回
const goback = () => {
  const router = useRouter()
  const back = () => {
    router.back()
  }
  return { back }
}

export default {
  name: 'Top',
  setup () {
    const { back } = goback()
    return { back }
  }
}
</script>

<style lang="scss" scoped>
.submit__top {
  position: relative;
  height: 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  color: #fff;
  text-align: center;
  &__title {
    margin: 0;
    font-size: 0.16rem;
    padding: 0.245rem 0 0.22rem;
  }
  &__back {
    position: absolute;
    left: 0.18rem;
    top: 0.26rem;
    margin-left: 0.1rem;
    transform: rotate(135deg);
    width: 0.12rem;
    height: 0.12rem;
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
  }
}
</style>
