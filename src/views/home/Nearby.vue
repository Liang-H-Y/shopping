<template>
  <div class="near">
    <h3 class="near__title">附近店铺</h3>
    <div
        v-for="item in nearList"
        :key="item.id"
        class="near__item"
    >
      <div>
        <img
          :src="item.imgUrl"
          class="near__item__img"
        />
      </div>
      <div class="near__item__content">
        <div class="near__item__content__title">{{item.title}}</div>
        <div class="near__item__content__tags">
          <span
            class="near__item__content__tags__tag"
            v-for="(innerItem, innerIndex) in item.tags"
            :key="innerIndex">
            {{innerItem}}
          </span>
        </div>
        <p class="near__item__content__highlight">
          {{item.desc}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nearby',
  setup () {
    const nearList = [
      {
        id: 1,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['月售1万+', '起送¥0', '基础运费¥5'],
        desc: 'VIP尊享满89元减4元运费券（每月3张）'
      },
      {
        id: 1,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['月售1万+', '起送¥0', '基础运费¥5'],
        desc: 'VIP尊享满89元减4元运费券（每月3张）'
      }
    ]
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
  &__item {
    display: flex;
    padding: 0.12rem 0;
    &__img {
      width: 0.56rem;
      margin-right: 0.16rem;
    }
    &__content {
      width: 100%;
      border-bottom: .01rem solid #F1F1F1;
      &__title {
        font-size: 0.16rem;
      }
      &__tags{
        font-size: .13rem;
        padding: .08rem 0 0;
        &__tag{
          margin-right: .16rem;
        }
      }
      &__highlight {
        font-size: .13rem;
        margin-top: .08rem;
        color: #E93B3B;
      }
    }
  }
}
</style>
