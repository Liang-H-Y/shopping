<template>
  <div class="warpper">
    <img class="warpper__img" src="http://www.dell-lee.com/imgs/vue3/user.png">
    <div class="warpper__input">
        <input type="text"
               v-model="username"
               class="warpper__input__content"
               placeholder="请输入用户名">
    </div>
    <div class="warpper__input">
        <input type="text"
               v-model="password"
               class="warpper__input__content"
               placeholder="请输入密码">
    </div>
    <div class="warpper__input">
        <input type="text"
               v-model="ensurement"
               class="warpper__input__content"
               placeholder="确认密码">
    </div>
    <button class="warpper__button" @click="handleRegister">注册</button>
    <div class="warpper__text">
        <span class="warpper__text__register" @click="handleLoginClick">已有账号去登录</span>
    </div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 处理注册相关逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '', ensurement: '' })
  const handleRegister = async () => {
    try {
      const reslut = await post('/api/user/register', {
        username: data.username,
        password: data.password,
        ensurement: data.ensurement
      })
      if (reslut?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}

// 注册已有账号去登录逻辑
const handleLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = handleLoginEffect()
    return { show, toastMessage, username, password, ensurement, handleRegister, handleLoginClick }
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
    }
}
</style>
