<template>
  <div class="docker">
    <div v-for="(item, index) in dockerList"
         class="docker__item"
         :class="{'docker__item--active': index === 0}"
         :key="item">
      <router-link :to='item.to'>
        <div class="iconfont" v-html="item.iconfont"></div>
        <div class="docker__title">{{item.text}}</div>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      { iconfont: '&#xe6af;', text: '首页', to: { name: 'Home' } },
      { iconfont: '&#xe611;', text: '购物车', to: { name: 'CartList' } },
      { iconfont: '&#xe7c5;', text: '订单', to: { name: 'Home' } },
      { iconfont: '&#xe635;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.docker {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.48rem;
  border: 0.01px solid #f1f1f1;
  // 注意
  &__item {
    flex: 1;
    text-align: center;
    a{
      color: $content-fontcolor;
      text-decoration: none;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.2rem;
    }

    &--active {
      a{
        color: #1fa4fc;
      }
    }
  }
  // 注意
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
