import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'

const routes = [
  // 同步组件：并不提倡使用这种引入方法，因为会在加载根页面的时候，也加载其他页面，会导致不必要加载的也加载了
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // 异步组件：在需要的时候才加载
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName:"shop" */ '../views/shop/Shop')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () =>
      import(/* webpackChunkName:"shop" */ '../views/cartList/CartList')
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName:"register" */ '../views/register/Register'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName:"register" */ '../views/login/Login'),
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
