<template>
  <div class="q-pa-xs">
    <div class="row">
      <div class="col-3 q-mr-md">
        <div class="text-h6">預設數量設定</div>
        <div v-for="(value, key) in timeslot" :key="key">
          <q-input
            type="number"
            outlined
            v-model.number="timeslot[key]"
            :label="`${key}`"
            class="q-my-xs"
          >
            <template v-slot:after>
              <q-btn
                color="accent"
                icon="restart_alt"
                @click="timeslot[key] = 0"
                class="q-ml-sm"
              />
            </template>
          </q-input>
        </div>
        <q-btn @click="saveTimeslot" label="儲存預設" color="accent" />
      </div>
      <div class="col-5 column items-center">
        <div class="col-2 row items-center">
          <div class="col-4">
            <q-toggle v-model="schedulerActive" @update:model-value="toggleScheduler" color="green" checked-icon="alarm" unchecked-icon="clear" />
          </div>

          <div class="text-h6 col-3">
            定期新增狀態 : {{ schedulerActive === false ? " 關閉 " : " 開啟 " }}
          </div>
          <div class="col-4">
            <q-btn
              @click="autoAdd()"
              label="一鍵新增"
              color="grey"
              class="col-3"
            />
          </div>
        </div>
        <div class="col items-center column q-pa-md">
          <q-date v-model="today" mask="YYYY-MM-DD" class="" color="accent"
          :options="showDate" :events="eventDate">
          </q-date>
        </div>
      </div>

      <div class="col-3">
        <div class="text-h6">{{ title }}</div>
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

        <q-btn @click="submit()" label="儲存" color="accent" class="q-mr-md" />
        <q-btn @click="soldOut" label="本日停賣" color="dark" />
      </div>
    </div>
  </div>
  <!-- <button @click="createPdf">Create PDF</button>
  <a v-if="pdfUrl" :href="pdfUrl" download="example.pdf">Download PDF</a> -->
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { apiOrder } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import { DateTime } from 'luxon'

const today = ref(DateTime.now().toFormat('yyyy-MM-dd'))
const $q = useQuasar()
const title = ref(today.value + '的剩餘數量')
const month = ref(DateTime.now().toFormat('yyyy-MM'))
const dataget = ref('')
const findToday = ref('')
const schedulerActive = ref('')
const showDate = ref([])
const eventDate = ref([])
const timeslot = ref('')

const addDates = () => {
  const today = DateTime.now()
  for (let i = 0; i < 90; i++) {
    const futureDate = today.plus({ days: i }).toFormat('yyyy/MM/dd')
    showDate.value.push(futureDate)
  }
}
const get = async () => {
  try {
    const { data } = await apiOrder.get('/get-special')
    dataget.value = data
    eventDate.value = getAllDates(dataget.value)
    console.log(eventDate.value)
    const find = dataget.value[month.value]
    const todayData = find[today.value]
    findToday.value = todayData
    title.value = today.value + '的剩餘數量'
  } catch (error) {
    console.log(error)
  }
}
const autoAdd = async () => {
  try {
    const result = await apiOrder.post('/auto-add')
    console.log(result)
    await fetchSchedulerStatus()
    $q.notify({
      color: 'accent',
      textColor: 'white',
      position: 'bottom',
      message: ' 修改成功'
    })
  } catch (error) {
    console.log(error)
    $q.notify({
      color: 'red',
      textColor: 'white',
      position: 'bottom',
      message: ' 失敗'
    })
  }
}
// --status
async function fetchSchedulerStatus () {
  try {
    const response = await apiOrder.get('/scheduler-status')
    schedulerActive.value = response.data.schedulerActive
  } catch (error) {
    console.error('自動新增狀態獲取失敗:', error)
  }
}
async function toggleScheduler (newValue) {
  try {
    if (newValue) {
      await apiOrder.post('/start-scheduler')
    } else {
      await apiOrder.post('/stop-scheduler')
    }
    await fetchSchedulerStatus()
  } catch (error) {
    console.error('定期更新啟動發生錯誤:', error)
  }
}

function getAllDates (data) {
  const dates = []
  for (const year in data) {
    if (Object.prototype.hasOwnProperty.call(data, year)) {
      for (const date in data[year]) {
        if (Object.prototype.hasOwnProperty.call(data[year], date)) {
          // 檢查時段數量是否為0
          const timeSlots = data[year][date]
          let total = 0
          if (Array.isArray(timeSlots)) {
            // 如果是數組，計算所有元素的總和
            total = timeSlots.reduce((acc, val) => acc + val, 0)
          } else if (typeof timeSlots === 'object' && timeSlots !== null) {
            // 如果是對象，計算所有值的總和
            total = Object.values(timeSlots).reduce((acc, val) => acc + val, 0)
          }
          // 只有當總和不為0時，才將日期加入到數組中
          if (total > 0) {
            dates.push(date.replace(/-/g, '/'))
          }
        }
      }
    }
  }
  return dates
}

const submit = async () => {
  const sent = { [today.value]: findToday.value }
  console.log(sent)
  try {
    const result = await apiOrder.post('/add-special', sent)
    console.log(result)
    $q.notify({
      color: 'accent',
      textColor: 'white',
      position: 'bottom',
      message: ' 修改成功'
    })
  } catch (error) {
    $q.notify({
      color: 'red',
      textColor: 'white',
      position: 'bottom',
      message: ' 失敗'
    })
  }
}

const soldOut = async () => {
  try {
    console.log(findToday.value)
    const result = Object.keys(findToday.value).forEach(key => {
      findToday.value[key] = 0
    })
    console.log(result)
    await submit()
  } catch (error) {
    console.log(error)
  }

  // try {
  //   const result = await apiOrder.post('/add-special', sent)
  //   console.log(result)
  //   $q.notify({
  //     color: 'accent',
  //     textColor: 'white',
  //     position: 'bottom',
  //     message: ' 修改成功'
  //   })
  // } catch (error) {
  //   $q.notify({
  //     color: 'red',
  //     textColor: 'white',
  //     position: 'bottom',
  //     message: ' 失敗'
  //   })
  // }
}
// --------------------------------------------------------
const getTimeslot = async () => {
  try {
    const { data } = await apiOrder.get('/get-timeslot')
    timeslot.value = data
    console.log(timeslot.value)
  } catch (error) {
    console.log(error)
  }
}
const saveTimeslot = async () => {
  try {
    const { data } = await apiOrder.put('/update-timeslot', timeslot.value)
    console.log(data)
    $q.notify({
      color: 'accent',
      textColor: 'white',
      position: 'bottom',
      message: ' 修改成功'
    })
    await getTimeslot()
  } catch (error) {
    console.log(error)
    $q.notify({
      color: 'red',
      textColor: 'white',
      position: 'bottom',
      message: ' 失敗'
    })
  }
}
// -------------------------------------------------

// const createTwoMonthsOrders = async () => {
//   try {
//     await axios.post('https://www.dtstw.com/api/auto-add')
//     await order.fetchSpecificDateLimits () // 新增後刷新
//     console.log (' 成功新增兩個月的訂單限制 ')
//   } catch (error) {
//     console.error (' 新增訂單限制失敗:', error)
//   }
// }
onMounted(() => {
  get()
  // editPdf()
  fetchSchedulerStatus()
  getTimeslot()
  addDates()
})

// watch today.value to get data
watch(month, () => {
  get()
})
watch(today, async () => {
  const split = today.value.split('-')
  month.value = `${split[0] + '-' + split[1]}`
  await get()
})
//

// ---------------------------------------------------------------------
// async function editPdf () {
//   try {
//     // 從 public 目錄加載現有的 PDF 文件
//     const existingPdfBytes = await fetch('menu.pdf').then((res) =>
//       res.arrayBuffer()
//     )

//     // 加載 PDF 文件
//     const pdfDoc = await PDFDocument.load(existingPdfBytes)
//     pdfDoc.registerFontkit(fontkit)
//     // 從 public 目錄加載自定義字體
//     const fontBytes = await fetch('/NotoSansTC.ttf').then((res) =>
//       res.arrayBuffer()
//     )
//     const customFont = await pdfDoc.embedFont(fontBytes)
//     // 編輯 PDF 文件
//     const page = pdfDoc.getPage(1) // 獲取第一頁
//     page.drawText(' 訂單編號：12312312', {
//       x: 400,
//       y: 800,
//       size: 12,
//       font: customFont
//     })
//     page.drawText(`${name.value}`, {
//       x: 80,
//       y: 725,
//       size: 12,
//       font: customFont
//     })
//     page.drawText(`${phone.value}`, {
//       x: 450,
//       y: 725,
//       size: 12,
//       font: customFont
//     })
//     // 序列化 PDF 文件
//     const pdfBytes = await pdfDoc.save()
//     // 將編輯後的 PDF 轉換為 Blob，然後創建一個 URL
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' })
//     pdfUrl.value = URL.createObjectURL(blob)
//   } catch (error) {
//     console.error('Error editing PDF:', error)
//   }
// }
</script>

<style lang="scss" scoped></style>
