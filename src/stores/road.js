import { defineStore } from 'pinia'
import { apiAuth } from 'src/boot/axios'
import { UseAddressStore } from 'src/stores/address.js'
const address = UseAddressStore()
export const UseRoadStore = defineStore('road', {
  state: () => ({
    roads: [],
    roadsFull: [],
    roadselect: []
  }),
  getters: {},
  actions: {
    async getRoad (val, val2) {
      if (val === undefined) {
        val = ''
      }
      if (val2 === undefined) {
        val2 = ''
      }
      let stateObject = address.state.find((item) => item.label === val)
      if (stateObject === undefined) {
        stateObject = address.state.find((item) => item.value === val)
      }
      val = stateObject?.value || ''
      // 導入舊資料區域
      let cities = address.city.find((item) => item.value === val2)
      if (cities === undefined) {
        cities = address.city.find((item) => item.label === val2)
      }
      val2 = cities?.value || ''
      const result = await apiAuth.get(
        `localization/road/fword?equal_state_id=${val}&equal_city_id=${val2}`
      )
      this.roads.splice(0, this.roads.length)
      this.roadsFull.splice(0, this.roadsFull.length)
      for (let i = 0; i < result.data.length; i++) {
        this.roads.push({ id: i + 1, value: result.data[i] })
      }
      this.roads.sort((a, b) => a.value.length - b.value.length)
    },

    async getRoadFull (val, val2, val3) {
      console.log(val, val2, val3)
      let stateObject = address.state.find((item) => item.label === val)
      if (stateObject === undefined) {
        stateObject = address.state.find((item) => item.value === val)
      }
      if (stateObject === undefined) {
        stateObject = address.state.find((item) => item.label === val)
      }
      val = stateObject.value
      // 導入舊資料區域
      let cities = address.city.find((item) => item.label === val2)
      if (cities === undefined) {
        cities = address.city.find((item) => item.value === val2)
      }
      if (cities === undefined) {
        cities = address.city.find((item) => item.value === val2)
      }
      val2 = cities?.value || ''
      if (val3 === null) { val3 = '' }
      const result = await apiAuth.get(
        `localization/road/?equal_state_id=${val}&equal_city_id=${val2}&filter_name=${val3}`
      )
      this.roads.splice(0, this.roads.length)
      this.roadsFull.splice(0, this.roadsFull.length)
      for (let i = 0; i < result.data.length; i++) {
        this.roadsFull.push({ id: i + 1, value: result.data[i].label })
      }
      this.roadsFull.sort((a, b) => a.value.length - b.value.length)
    },
    async getRoadSelect (val, val2) {
      console.log(val, val2)
      let stateObject = address.state.find((item) => item.label === val)
      if (stateObject === undefined) {
        stateObject = address.state.find((item) => item.value === val)
      }
      val = stateObject.value
      let cities = address.city.find((item) => item.label === val2)
      if (cities === undefined) {
        cities = address.city.find((item) => item.value === val2)
      }
      val2 = cities?.value || ''
      const { data } = await apiAuth.get(`localization/road/?filter_state_id=${val}&filter_city_id=${val2}`)
      this.roadselect.splice(0, this.roadselect.length)
      for (let i = 0; i < data.length; i++) {
        this.roadselect.push({ id: i, value: data[i].name, label: data[i].label })
      }
      console.log(this.roadselect)
      this.roadselect.sort((a, b) => a.label.length - b.label.length)
    },
    async getRoadSelectFilter (val, val2, val3) {
      let stateObject = address.state.find((item) => item.label === val)
      if (stateObject === undefined) {
        stateObject = address.state.find((item) => item.value === val)
      }
      val = stateObject.value
      let cities = address.city.find((item) => item.label === val2)
      if (cities === undefined) {
        cities = address.city.find((item) => item.value === val2)
      }
      val2 = cities?.value || ''
      if (val3 === null) {
        val3 = ''
      }
      const { data } = await apiAuth.get(`localization/road/?filter_state_id=${val}&filter_city_id=${val2}&filter_name=${val3}`)
      this.roadselect.splice(0, this.roadselect.length)
      for (let i = 0; i < data.length; i++) {
        this.roadselect.push({ id: i, value: data[i].name, label: data[i].label })
      }
      console.log(this.roadselect)
      this.roadselect.sort((a, b) => a.label.length - b.label.length)
    }
  }

})
