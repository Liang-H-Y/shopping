<template>
  <div class="warpper">
    <img class="warpper__img" src="http://www.dell-lee.com/imgs/vue3/user.png">
    <div class="warpper__input">
        <input type="text" class="warpper__input__content" placeholder="请输入手机号">
    </div>
    <div class="warpper__input">
        <input type="text" class="warpper__input__content" placeholder="请输入密码">
    </div>
    <button class="warpper__button">登录</button>
    <div class="warpper__text">
        <span class="warpper__text__register">立即注册</span>
        <span class="warpper__text__split">|</span>
        <span class="warpper__text__forget">忘记密码</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss" scoped>
.warpper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    &__img{
        display: block;
        width: .66rem;
        height: .66rem;
        margin: 0 auto .4rem auto;
    }
    &__input{
        width: 2.95rem;
        height: .48rem;
        margin-bottom: .16rem;
        &__content{
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border: none;
            background: #F9F9F9;
            border: 1px solid rgba(0,0,0,0.10);
            border-radius: 6px;
            padding-left: .16rem;
            font-size: .16rem;
        }
    }
    &__button{
        margin: .16rem 0;
        width: 2.95rem;
        height: .48rem;
        background: #0091FF;
        box-shadow: 0 4px 8px 0 rgba(0,145,255,0.32);
        border-radius: 4px;
        font-size: .16rem;
        color:#FFF;
        line-height: 24px;
    }
    &__text{
        text-align: center;
        font-size: 14px;
        color: rgba(0,0,0,0.50);
        &__split{
            margin: 0 .135rem;
        }
    }
}
</style>
