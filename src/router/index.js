import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'
import Register from '../views/register/Register'
import Login from '../views/login/Login'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // 每个路由项目中都可以有beforEnter;此处 to 指的就是 login (登录状态不允许回到login)
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 任何路由跳转之前都会执行这里，这个逻辑要注意一下
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  !isLogin && to.name !== 'Login' && to.name !== 'Register'
    ? next({ name: 'Login' })
    : next()
})

export default router
