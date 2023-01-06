<template>
  <div class="submit__bottom">
    <span class="submit__bottom__name">实付金额</span>
    <span class="submit__bottom__total">￥{{ price }}</span>
    <button class="submit__bottom__btn" @click="handleClick">提交订单</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useSubmitEffect } from './submitEffect'

const click = () => {
  const showDialog = ref(false)
  const handleClick = () => {
    showDialog.value = !showDialog.value
  }
  return { showDialog, handleClick }
}

export default {
  name: 'Bottom',
  setup () {
    const { price } = useSubmitEffect()
    const { showDialog, handleClick } = click()
    return { price, handleClick, showDialog }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
