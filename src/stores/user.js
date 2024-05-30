import { defineStore } from 'pinia'
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import { apiLogin } from 'src/boot/axios' // api,

export const useUserStore = defineStore(
  'user',
  () => {
    const tokens = ref('')
    const name = ref('')
    const role = ref(0)
    const limit = ref(100)
    const isLogin = computed(() => {
      return tokens.value.length > 0
    })
    const Permit = computed(() => {
      return role.value === 3
    })
    const $q = useQuasar()
    const login = async (form) => {
      try {
        const { data } = await apiLogin.post('users/login', form)
        console.log(data.result)
        role.value = data.result.role
        tokens.value = data.result.token
        name.value = data.result.name
        if (role.value === 3) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: '登入成功'
          })
        } else {
          $q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: '你沒有權限'
          })
        }
      } catch (error) {
        $q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'info',
          message: '登入失敗'
        })
      }
    }
    // router 要改成function
    const logout = async () => {
      try {
        await apiLogin.delete('/users/logout')
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: '登出成功'
        })
      } catch (error) {
        $q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'cloud_off',
          message: error.message
        })
      }
      tokens.value = ''
      role.value = 0
    }
    return {
      tokens,
      login,
      isLogin,
      Permit,
      role,
      logout,
      name,
      limit
    }
  },
  {
    persist: {
      key: 'bingAnalytics',
      paths: ['Permit', 'isLogin', 'tokens', 'role', 'name', 'limit']
    }
  }
)
