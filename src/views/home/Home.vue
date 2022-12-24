<template>
  <div class="warpper">
    <Position />
    <Search />
    <Banner />
    <Icons />
    <Nearby />
  </div>
  <Docker />
</template>

<script>
import Position from './Position.vue'
import Search from './Search.vue'
import Banner from './Banner.vue'
import Icons from './Icons.vue'
import Nearby from './Nearby.vue'
import Docker from './Docker.vue'
export default {
  // name 这个属性，可以在 chrome 浏览器的 vue js devtools 插件中显示页面组件！
  name: 'Home',
  components: { Position, Search, Banner, Icons, Nearby, Docker }
}
</script>

<style lang="scss" scoped>
// 注意： scoped 可以保证样式在自己的作用域中生效
.warpper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem;
  // 上下滑动
  overflow-y: auto;
}

</style>
