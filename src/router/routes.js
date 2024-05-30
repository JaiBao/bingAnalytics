import MainLayout from 'layouts/MainLayout.vue'
import AdminLayout from 'layouts/AdminLayout.vue'
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: () => import('src/pages/LoginPage.vue'),
        meta: {
          title: 'BINGA | INDEX',
          login: false
        }
      }
    ]
  },
  {
    path: '/analytics',
    component: AdminLayout,
    children: [
      {
        path: '/analytics/1',
        component: () => import('src/pages/analytics/SettingPage.vue'),
        meta: {
          title: 'BINGA | INDEX',
          login: true
        }
      },
      {
        path: '/analytics/2',
        component: () => import('src/pages/analytics/MonthPage.vue'),
        meta: {
          title: 'BINGA  | 月',
          login: true
        }
      },
      {
        path: '/analytics/day',
        component: () => import('src/pages/analytics/OnedayPage.vue'),
        meta: {
          title: 'BINGA  | WELCOME',
          login: true
        }
      },
      {
        path: '/analytics/new',
        component: () => import('src/pages/analytics/newCustomerPage.vue'),
        meta: {
          title: 'BINGA  | 新客',
          login: false,
          admin: false
        }
      },
      {
        path: '/analytics/district',
        component: () => import('src/pages/analytics/DistrictPage.vue'),
        meta: {
          title: 'BINGA  | 地區',
          login: false,
          admin: false
        }
      },
      {
        path: '/analytics/worker',
        component: () => import('src/pages/hr/OrderWorker.vue'),
        meta: {
          title: 'BINGA  | 員工',
          login: false,
          admin: false
        }
      }, {
        path: '/analytics/3',
        component: () => import('src/pages/analytics/SettingPage2.vue'),
        meta: {
          title: 'BINGA | INDEX',
          login: true
        }
      },
      {
        path: '/analytics/4',
        component: () => import('src/pages/analytics/MonthPage2.vue'),
        meta: {
          title: 'BINGA  | 月',
          login: true
        }
      },
      {
        path: '/analytics/bom',
        component: () => import('src/pages/analytics/bomTable.vue'),
        meta: {
          title: 'BINGA  | BOM',
          login: true
        }
      }
      // {
      //   path: '/analytics/order',
      //   component: () => import('src/pages/SetOrderPage.vue'),
      //   meta: {
      //     title: 'BINGA  | 控量',
      //     login: false,
      //     admin: false
      //   }
      // }
      // {
      //   path: '/analytics/tabletable2',
      //   component: () => import('src/pages/BullShit.vue'),
      //   meta: {
      //     title: 'BINGA  | 控單',
      //     login: false,
      //     admin: false
      //   }
      // },
      // {
      //   path: '/analytics/tabletable',
      //   component: () => import('src/pages/BullShit2.vue'),
      //   meta: {
      //     title: 'BINGA  | 控單',
      //     login: false,
      //     admin: false
      //   }
      // }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
