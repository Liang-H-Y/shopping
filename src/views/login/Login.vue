<template>
  <div class="warpper">
    <img class="warpper__img" src="http://www.dell-lee.com/imgs/vue3/user.png">
    <div class="warpper__input">
        <input type="text"
               v-model="username"
               class="warpper__input__content"
               placeholder="请输入手机号">
    </div>
    <div class="warpper__input">
        <input type="password"
               v-model="password"
               class="warpper__input__content"
               placeholder="请输入密码">
    </div>
    <button class="warpper__button" @click="handleLogin">登录</button>
    <div class="warpper__text">
        <span class="warpper__text__register" @click="handleRegisterClick">立即注册</span>
        <span class="warpper__text__split">|</span>
        <span class="warpper__text__forget">忘记密码</span>
    </div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 处理登录账号逻辑
const useLoginEffect = (showToast) => {
  // 获取路由的实例
  const router = useRouter()
  const data = reactive({ username: '', password: '' })
  const handleLogin = async () => {
    try {
      const reslut = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (reslut?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登陆失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

// 处理跳转注册逻辑
const handleRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    // 路由的跳转
    router.push({ name: 'Register' })
  }
  return { handleRegisterClick }
}

export default {
  name: 'Login',
  components: { Toast },
  // 职责就是告诉你，代码执行的一个流程
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = handleRegisterEffect()

    return { username, password, handleLogin, handleRegisterClick, show, toastMessage }
  }
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
            &::placeholder{
              color: rgba(0,0,0,0.50);
            }
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
