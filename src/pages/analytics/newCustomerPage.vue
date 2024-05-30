<template>
  <div class="row w-100 justify-center q-my-md items-center">
    <q-btn color="secondary" label="back" to="/" class="q-mx-xs"/>
    <q-input outlined v-model="select.year" label="年" class="q-mx-xs"/>
    <q-select outlined v-model="select.month" label="月" class="q-mx-xs" :options="searchstore.monthoption"/>
    <div class="text-h4 q-mx-md">新客: {{ length }} 位</div>
  </div>
  <div class="row w-100 justify-center items-center q-pa-xs q-ml-xl">
    <div v-if="search.name === ''" class="text-h6">請選擇名字</div>
    <div v-if="search.name !== ''" class="row w-100">
      <div class="text-h6 col-12">資料預覽 :</div>
      <div class="text-h6 col-xs-12 col-md-5">姓名 : {{ search.name }}</div>
      <div class="text-h6 col-xs-12 col-md-3">手機 : {{ search.mobile }}</div>
      <div class="text-h6 col-xs-12 col-md-3">建立時間 : {{ search.created_at }}</div>
      <div class="text-h6 col-xs-12 col-md-5">
        公司 : {{ search.shipping_company }}
      </div>
      <div class="text-h6 col-xs-12 col-md-3">
        縣市 : {{ search.shipping_state_id }}
      </div>
      <div class="text-h6 col-xs-12 col-md-3">
        區 : {{ search.shipping_city_id }}
      </div>
    </div>
  </div>
  <div class="row w-100 clickzone q-pa-xs justify-center">
    <q-btn
      class="col-xs-2 col-md-1 btn q-mr-xs q-mb-xs bg-secondary text-white"
      v-for="(value, name) in data"
      :key="name"
      @click="handleClick(value)"
      :label="name"
    />
  </div>

</template>

<script setup>
import { apiAuth, apiShit } from 'src/boot/axios'
import { UseAddressStore } from 'src/stores/address'
import { UseSearchStore } from 'src/stores/search'
import { DateTime } from 'luxon'
import { ref, onMounted, watch } from 'vue'

const address = UseAddressStore()
const searchstore = UseSearchStore()
const today = DateTime.now()

const select = ref({
  year: today.year,
  month: today.month.toString().padStart(2, '0')
})
const data = ref({})
const length = ref(0)

const search = ref({
  name: '',
  mobile: '',
  shipping_company: '',
  shipping_state_id: 0,
  shipping_city_id: 0
})
const clear = async () => {
  search.value = {}
}
const get = async () => {
  try {
    data.value = {}
    const res = await apiShit.post('newcus', {
      startDate: select.value.year + '-' + select.value.month,
      endDate: select.value.year + '-' + select.value.month
    })
    data.value = await res.data
    length.value = Object.keys(data.value).length
  } catch (error) {
    console.log(error)
  }
}
const handleClick = async (val) => {
  await clear()
  const { data } = await apiAuth.get(`/member/member?filter_phone=${val}`)
  search.value = data.data[0]
  await address.getcity(search.value.shipping_state_id)
  search.value.shipping_city_id = address.city.find(
    (item) => item.value === search.value.shipping_city_id
  ).label
  search.value.shipping_state_id = address.state.find(
    (item) => item.value === search.value.shipping_state_id
  ).label
}
// watch search.value.month to do get function
watch(select.value, async () => {
  await get()

  await clear()
})

onMounted(async () => {
  await get()
  length.value = Object.keys(data.value).length
  await address.getstate()
})
</script>

<style lang="scss" scoped>
.q-input{
  max-width: 100px;
}
.btn {
  max-width: 170px;
}
li {
  list-style-type: none;
}
.clickzone{
  max-height: 600px;
  overflow-y: scroll;
}
</style>
