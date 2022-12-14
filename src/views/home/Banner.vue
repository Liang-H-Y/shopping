<template>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style lang="scss" scoped>
.banner {
  // 注意：防止图片加载出来后，图片下面的样式抖动
  height: 0;
  overflow: hidden;
  padding-bottom: 24.9%;
  margin-top: .12rem;
  &__img {
    width: 100%;
  }
}
</style>
