<template>
  <div class="row w-100">
    <q-input outlined v-model="timeForm.date" label="日期"/>
    <q-select outlined v-model="timeForm.time" :options="options" label="時間" />
    <q-btn @click="get" label="取得" color="primary"/>
  </div>

  <div class="row w-100">
    <q-table
      class="w-75"
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="order_id"
    >

  <template v-slot:body-cell-edit="props">
    <q-btn @click="edit(props.row)" icon="edit" color="accent"/>
  </template></q-table>

  </div>
  <div class="row w-100 items-center">
    <div v-if="addForm._id===''" class="text-h6">新增一筆</div>
    <div v-if="addForm._id!==''" class="text-h6">修改一筆</div>
    <q-input outlined v-model="addForm.order_id" label="訂單編號"/>
    <q-input outlined v-model="addForm.amount" label="數量"/>
    <q-input outlined v-model="addForm.road" label="路"/>
    <q-input outlined v-model="addForm.remark" label="備註"/>
    <q-btn v-if="addForm._id===''" @click="add" label="新增" color="accent"/>
    <q-btn v-if="addForm._id!==''" @click="editSubmit" label="修改" color="dark"/>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { DateTime } from 'luxon'
import { apiShit } from 'src/boot/axios'

const today = ref(DateTime.now().toFormat('yyyy-MM-dd'))
const timeForm = ref({
  date: today,
  time: '09:00-10:00'
})
const total = ref(0)
const rows = ref([])
const title = computed(() => `總套數 ${total.value} 套`)
const columns = [{ name: 'order_id', label: '訂單號', field: 'order_id' }, { name: 'amount', label: '數量', field: 'amount' }, { name: 'road', label: '路', field: 'road' }, { name: 'remark', label: '備註', field: 'remark' }, { name: 'id', label: 'id', field: '_id' }, { name: 'edit', label: 'edit', field: 'edit' }]
const options = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00']

const get = async () => {
  const { data } = await apiShit.post('/time/find', timeForm.value)
  console.log(data.data)
  rows.value = data.data
  total.value = 0
  rows.value.forEach((item) => {
    total.value += item.amount
  })
}
const add = async () => {
  addForm.value.date = timeForm.value.date
  addForm.value.time = timeForm.value.time
  try {
    const { data } = await apiShit.post('/time/create', addForm.value)
    console.log(data)
    await get()
    clear()
  } catch (error) {

  }
}
const edit = (val) => {
  console.log(val)
  addForm.value._id = val._id
  addForm.value.order_id = val.order_id
  addForm.value.amount = val.amount
  addForm.value.road = val.road
  addForm.value.remark = val.remark
}

const clear = () => {
  addForm.value._id = ''
  addForm.value.order_id = ''
  addForm.value.amount = ''
  addForm.value.road = ''
  addForm.value.remark = ''
}
const editSubmit = async () => {
  addForm.value.date = timeForm.value.date
  addForm.value.time = timeForm.value.time
  try {
    const { data } = await apiShit.post(`/time/edit/${addForm.value._id}`, addForm.value)
    console.log(data)
    clear()
    await get()
  } catch (error) {

  }
}
const addForm = ref({
  _id: '',
  order_id: '',
  amount: 0,
  road: '',
  remark: ''
})

</script>
