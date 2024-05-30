// import { defineStore } from 'pinia'
// import { LocalStorage } from 'quasar'

// export const useCounterStore = defineStore('counter', {
//   state: () => ({
//     counter: 0
//   }),
//   getters: {
//     doubleCount: (state) => state.counter * 2
//   },
//   actions: {
//     increment () {
//       this.counter++
//     }
//   },
//   persist: {
//     storage: {
//       getItem: (key) => {
//         return LocalStorage.getItem(key)
//       },
//       setItem: (key, value) => {
//         LocalStorage.set(key, value)
//       }
//     },
//     key: 'bing-quasar'
//   }
// })
