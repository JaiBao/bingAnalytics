<template>
  <div class="row w-100">
    <div class="col-6 q-pa-md">
      <div class="row w-100 items-center q-mb-lg">
        <q-input
          outlined
          v-model="timeForm.date"
          label="日期選擇"
          class="col-6 q-mr-xs"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer q-pa-md">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="timeForm.date"
                  color="accent"
                  mask="YYYY-MM-DD"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="col-5 q-pa-md">
          <div class="text-h5">當日總套數 : {{ daytotal }}</div>
        </div>
      </div>

      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          v-for="(total, time) in timeSlotTotals"
          :key="time"
          @click="timeForm.time = time"
        >
          <q-item-section avatar>
            <q-icon
              v-if="rowsLimit.some((limitRow) => limitRow.time === time)"
              name="close"
              size="2.5rem"
              color="accent"
            />
          </q-item-section>
          <q-item-section>
            <div class="text-h5 q-py-xs">
              {{ time }} - 總套數: {{ total }} 剩餘套數 :
              {{ user.limit - total }}
            </div>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              v-if="!rowsLimit.some((limitRow) => limitRow.time === time)"
              icon="lock"
              @click="lock(time)"
              color="dark"
            />
            <q-btn
              v-if="rowsLimit.some((limitRow) => limitRow.time === time)"
              icon="lock_open"
              @click="unlock(time)"
              color="accent"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-input
        outlined
        label="每時段套數"
        v-model="user.limit"
        :readonly="readonly"
        class="w-50"
      >
        <template v-slot:append>
          <q-toggle v-model="readonly" label="鎖定" color="accent" />
        </template>
      </q-input>
    </div>
    <div class="col-6 q-pa-md">
      <q-table
        class="w-100"
        :title="title"
        :rows="rows"
        :columns="columns"
        row-key="order_id"
      >
        <template v-slot:body-cell-edit="props">
          <q-td auto-width>
            <q-btn @click="edit(props.row)" icon="edit" color="accent" />
          </q-td>
        </template>
        <template v-slot:body-cell-delete="props">
          <q-td auto-width>
            <q-btn
              @click="deleteTime(props.row._id)"
              icon="delete"
              color="dark"
            />
          </q-td>
        </template>
      </q-table>
      <div class="row w-100 items-center">
        <div v-if="addForm._id === ''" class="text-h6 col-12">新增一筆</div>
        <div v-if="addForm._id !== ''" class="text-h6 col-12">修改一筆</div>
        <div class="col-6">
          <q-input outlined v-model="addForm.order_id" label="訂單編號" />
          <q-input outlined v-model="addForm.amount" label="數量" />
          <q-input outlined v-model="addForm.road" label="路/區">
            <template v-slot:append>
              <q-btn-dropdown color="accent">
                <q-list>
                  <q-item
                    v-for="address in address.city"
                    :key="address.value"
                    clickable
                    v-close-popup
                    @click="onItemClick(address.label)"
                  >
                    <q-item-section>
                      {{ address.label }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </template>
          </q-input>
          <q-input outlined v-model="addForm.remark" label="備註" />
          <q-btn
            v-if="addForm._id === ''"
            @click="add"
            label="新增"
            color="accent"
          />
          <q-btn
            v-if="addForm._id !== ''"
            @click="editSubmit"
            label="修改"
            color="dark"
          /><q-btn @click="clear" label="重來" color="secondary" />
        </div>
        <!-- <div class="col-6">
          <div class="col-3">
            <div class="text-h6">{{ title2 }}</div>
            <div v-for="(value, key) in findToday" :key="key">
              <q-input
                type="number"
                outlined
                v-model.number="findToday[key]"
                :label="`${key}`"
                class="q-my-xs"
              >
                <template v-slot:after>
                  <q-btn
                    color="accent"
                    icon="restart_alt"
                    @click="findToday[key] = 0"
                    class="q-ml-sm"
                  />
                </template>
              </q-input>
            </div>

            <q-btn
              @click="submit()"
              label="儲存"
              color="accent"
              class="q-mr-md"
            />
            <q-btn @click="soldOut" label="本日停賣" color="dark" />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { DateTime } from 'luxon'
import { apiShit, apiOrder } from 'src/boot/axios'
import { useUserStore } from 'src/stores/user'
import { UseAddressStore } from 'src/stores/address'

const user = useUserStore()
const address = UseAddressStore()
const today = ref(DateTime.now().toFormat('yyyy-MM-dd'))
const month = ref(DateTime.now().toFormat('yyyy-MM'))
const findToday = ref('')
const timeForm = ref({
  date: today,
  time: '09:00-10:00'
})
const total = ref(0)
const daytotal = ref(0)
const title = computed(() => `${timeForm.value.time} 總套數 ${total.value} 套`)
// const title2 = ref(today.value + '的剩餘數量')
const dataget = ref([])
const columns = [
  { name: 'order_id', label: '訂單號', field: 'order_id' },
  { name: 'amount', label: '數量', field: 'amount' },
  { name: 'road', label: '路', field: 'road' },
  { name: 'remark', label: '備註', field: 'remark' },
  // { name: 'id', label: 'id', field: '_id' },
  { name: 'edit', label: '編輯', field: 'edit' },
  { name: 'delete', label: '刪除', field: 'delete' }
]
const options = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00'
]

const rows = ref([])
const rowsallday = ref([])
const rowsLimit = ref([])
const timeSlotTotals = computed(() => {
  const totals = {}
  for (const [time, orders] of Object.entries(rowsallday.value)) {
    totals[time] = orders.reduce((sum, order) => sum + order.amount, 0)
  }
  return totals
})

watchEffect(() => {
  daytotal.value = Object.values(timeSlotTotals.value).reduce(
    (sum, amount) => sum + amount,
    0
  )
})
const readonly = ref(true)

// ----------------------------------------------------------------
function categorizeDataByTime (data, timeSlots) {
  const categorizedData = {}

  // Initialize categories for each time slot
  timeSlots.forEach((slot) => {
    categorizedData[slot] = []
  })

  // Categorize each data item into the corresponding time slot
  data.forEach((item) => {
    if (Object.prototype.hasOwnProperty.call(categorizedData, item.time)) {
      categorizedData[item.time].push(item)
    }
  })

  return categorizedData
}

const get = async () => {
  const { data } = await apiShit.post('/time/find', timeForm.value)
  console.log(data.data)
  rows.value = data.data
  total.value = 0
  rows.value.forEach((item) => {
    total.value += item.amount
  })
}
const get2officalsite = async () => {
  try {
    const { data } = await apiOrder.get('/get-special')
    dataget.value = data
    const find = dataget.value[month.value]
    const todayData = find[today.value]
    findToday.value = todayData
    title.value = today.value + '的剩餘數量'
  } catch (error) {
    console.log(error)
  }
}
// allday
const getFor = async () => {
  try {
    const { data } = await apiShit.post('/time/findday', timeForm.value)
    rowsallday.value = categorizeDataByTime(data.data, options)
    console.log(rowsallday.value)
    // console.log(data)
  } catch (error) {
    console.log(error)
  }
}
// getlimit
const getLimit = async () => {
  try {
    const { data } = await apiShit.post('/timelimit/get', {
      date: timeForm.value.date
    })
    rowsLimit.value = data.data
    console.log(data.data)
  } catch (error) {
    console.log(error)
  }
}
const lock = async (val) => {
  console.log(timeForm.value.date, val)
  try {
    const { data } = await apiShit.post('/timelimit/create', {
      date: timeForm.value.date,
      time: val
    })
    console.log(data)
    await getLimit()
  } catch (error) {
    console.log(error)
  }
}
const unlock = async (val) => {
  console.log(timeForm.value.date, val)
  try {
    const { data } = await apiShit.post('/timelimit/delete', {
      date: timeForm.value.date,
      time: val
    })
    console.log(data)
    await getLimit()
  } catch (error) {
    console.log(error)
  }
}
const onItemClick = (val) => {
  addForm.value.road = val
}
const add = async () => {
  addForm.value.date = timeForm.value.date
  addForm.value.time = timeForm.value.time
  try {
    const { data } = await apiShit.post('/time/create', addForm.value)
    console.log(data)
    await get()
    await getFor()
    clear()
  } catch (error) {}
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
    const { data } = await apiShit.post(
      `/time/edit/${addForm.value._id}`,
      addForm.value
    )
    console.log(data)
    await get()
    await getFor()
    clear()
  } catch (error) {}
}
const deleteTime = async (val) => {
  try {
    const { data } = await apiShit.delete(`/time/delete/${val}`)
    console.log(data)
    await get()
    await getFor()
  } catch (error) {
    console.log(error)
  }
}
const addForm = ref({
  _id: '',
  order_id: '',
  amount: 0,
  road: '',
  remark: ''
})
watch(timeForm.value, () => {
  getFor()
  get()
  getLimit()
})

onMounted(async () => {
  getFor()
  getLimit()
  await address.getcity(2)
  await address.getcity(3)
  get2officalsite()
})
</script>
