import { createRouter, createWebHistory } from '@ionic/vue-router';
import { privateRoute,checkAuth}          from '@/services/auth.service';
import { RouteRecordRaw } from 'vue-router'
import Tabs               from '../views/Tabs.vue'
import Intro              from '../views/Intro.vue'
import Login              from '../views/Login.vue'
import Register           from '../views/Register.vue'
import Otp                from '../views/Otp.vue'
import Artikel            from '../views/Artikel.vue'
import CetakTransaksi     from '../views/CetakTransaksi.vue'
import Info               from '../views/Main/Info.vue'
import Dashboard          from '../views/Main/Dashboard.vue'
// import Saldo              from '@/components/dashboard.Saldo.vue'
// import Transaksi          from '@/components/dashboard.Transaksi.vue'
import Profile            from '../views/Main/Profile.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/intro',
    name: 'Intro',
    component: Intro,
    beforeEnter: privateRoute
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: privateRoute
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: privateRoute
  },
  {
    path: '/otp',
    name: 'Otp',
    component: Otp,
    beforeEnter: privateRoute
  },
  {
    name: 'artikel',
    path: '/artikel',
    component: Artikel,
    beforeEnter: checkAuth,
  },
  {
    name: 'cetakTransaksi',
    path: '/cetakTransaksi',
    component: CetakTransaksi,
    beforeEnter: checkAuth,
  },
  {
    path: '/',
    component  : Tabs,
    redirect   : "/dashboard",
    children   : [
      {
        path: 'dashboard',
        component: Dashboard,
        beforeEnter: checkAuth,
      },
      {
        path: 'profile',
        component: Profile,
        beforeEnter: checkAuth,
      },
      {
        path: 'info',
        component: Info,
        beforeEnter: checkAuth,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
