import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', {
  persist: true,
  key: 'status',
  state: () => ({
    canvas: ['會員', '餐點', '訂購次數', '營收'],
    canvastype: [{
      label: '圓餅',
      value: '圓餅'
    },
    {
      label: '長條',
      value: '長條'
    },
    {
      label: '折線',
      value: '折線'
    }]
  }),

  actions: {
    increment (index, statusKey) {
      if (this[statusKey][index] < 2) {
        this[statusKey][index]++
      } else {
        this[statusKey][index] = 0
      }
    },
    startFetchingPersistedState () {
      setInterval(() => {
        const persistedData = localStorage.getItem('status') // 使用你為 Pinia persist 插件設定的 key
        if (persistedData) {
          const parsedData = JSON.parse(persistedData)
          this.$patch(parsedData)
        }
      }, 2000)
    }
  }
})
