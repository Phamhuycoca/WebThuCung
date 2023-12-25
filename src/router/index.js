import { createRouter, createWebHistory } from 'vue-router'

const routes = [ 
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/layout/Client/Login.vue')
      },
      {
        path: 'register',
        component: () => import('@/layout/Client/Register.vue')
      },
      {
        path:'forgot',
        component:()=>import('@/layout/Client/Forgot.vue')
      },
      {
        path:'sanpham',
        component:()=>import('@/components/Client/SanPham.vue')
      },
      {
        path:'thunuoi',
        component:()=>import('@/components/Client/ThuNuoi.vue')
      },
      {
        path:'chitiet/:id',
        component:()=>import('@/layout/Client/Detail.vue')
      },
      {
        path:'profile',
        component:()=>import('@/layout/Client/Profile.vue')
      },
      {
        path:'chitietthucung/:id',
        component:()=>import('@/layout/Client/DetailThuCung.vue')
      }
    ]
  },  
  {
    path:'/trangchu',
    component:()=>import('@/components/Client/TrangChu.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/AdminView.vue'),
    children: [
      {
        path: '/admin',
        component: () => import('@/layout/Admin/Dashboard/Dashboard.vue')
      },
      {
        path: 'donhang',
        component: () => import('@/layout/Admin/DonHang/DonhangView.vue')
      },
      {
        path: 'danhmuc',
        component: () => import('@/layout/Admin/Danhmuc/DanhmucView.vue')
      },
      {
        path: 'sanpham',
        component: () => import('@/layout/Admin/Sanpham/SanphamView.vue')
      },
      {
        path: 'thunuoi',
        component: () => import('@/layout/Admin/Thunuoi/ThunuoiView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
