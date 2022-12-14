<template>
  <div class="icons">
    <div class="icons__item" v-for="item in iconsList" :key="item.text">
      <img
        class="icons__item__icon"
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgUrl}.png`"
      />
      <span class="icons__item_span">{{item.text}}</span>
    </div>
  </div>
  <div class="split"></div>
</template>

<script>
export default {
  name: 'Icons',
  setup () {
    const iconsList = [
      { imgUrl: '超市', text: '超市便利' },
      { imgUrl: '菜市场', text: '菜市场' },
      { imgUrl: '水果店', text: '水果店' },
      { imgUrl: '鲜花', text: '鲜花绿植' },
      { imgUrl: '家居', text: '家居时尚' },
      { imgUrl: '医药健康', text: '医药健康' },
      { imgUrl: '蛋糕', text: '烘焙蛋糕' },
      { imgUrl: '签到', text: '签到' },
      { imgUrl: '大牌免运', text: '大牌免运' },
      { imgUrl: '红包', text: '红包套餐' }
    ]
    // 啊啊啊！一点要记得有括号啊！！！
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-between;
  &__item {
    font-size: 0.12rem;
    width: 20%;
    &__icon {
      display: block;
      margin: 0 auto;
      width: 0.4rem;
      height: 0.4rem;
      padding: 0.16rem 0 0.06rem;
    }
  }
}
.split {
  height: 0.1rem;
  margin: 0.16rem -0.18rem 0 -0.18rem;
  background-color: #f1f1f1;
}
</style>
