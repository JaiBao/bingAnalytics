import { defineStore } from 'pinia'
// import { LocalStorage } from 'quasar'
import { apiAuth } from 'src/boot/axios'

export const UseAddressStore = defineStore('address', {
  state: () => ({
    state: [],
    city: [{ label: '其他', value: 87 }],
    geted: false
  }),
  actions: {
    async getstate () {
      if (this.geted) {
        console.log('state geted')
      } else {
        try {
          this.state.splice(0, this.state.length)
          const result = await apiAuth.get('localization/division/state')
          for (let i = 0; i < result.data.length; i++) {
            this.state.push({ label: result.data[i].name, value: result.data[i].id })
          }
          this.geted = true
        } catch (error) {
          console.error('Failed to get state:', error)
        // 在這裡處理錯誤，例如通過顯示一個錯誤消息給用戶
        }
      }
    },
    async getcity (id) {
      // this.city.splice(0, this.city.length)
      if (this.city.length > 13) {
        console.log('city geted')
      } else {
        const result = await apiAuth.get(
          `localization/division/city?equal_parent_id=${id}`
        )
        for (let i = 0; i < result.data.length; i++) {
          const state = this.state.find(item => item.value === id)
          this.city.push({ label: result.data[i].name, value: result.data[i].city_id, state: state.label })
        }
      }
    },
    async getcitysplice (id) {
      this.city.splice(0, this.city.length)

      if (this.city.length > 13) {
        console.log('city geted')
      } else {
        await this.getstate()
        const result = await apiAuth.get(`localization/division/city?equal_parent_id=${id}`)
        for (let i = 0; i < result.data.length; i++) {
          const state = this.state.find(item => item.value === id)
          if (state) {
            this.city.push({ label: result.data[i].name, value: result.data[i].city_id, state: state.label })
          } else {
            // 處理未找到匹配 state 的情況
            console.log(`No matching state found for id: ${id}`)
          }
        }
      }
    }
  }
})
