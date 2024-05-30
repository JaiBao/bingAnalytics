<template>
  <q-inner-loading :showing="visible">
    <q-spinner-gears size="200px" color="primary" />
  </q-inner-loading>
  <!-- -------------------------- -->
  <div class="row w-100 items-center justify-center">
    <q-select
      outlined
      class="col-md-1"
      :options="optionscanvas"
      label="圖表主題"
      v-model="canvas"
    />
    <q-toggle
      left-label
      size="lg"
      v-model="select.onemonth"
      label="只看一個月"
      class="col-md-1 q-ml-md"
    />
    <div class="w-100 col-md-4 row items-center">
      <div class="text-h6">開始</div>
      <q-select
        outlined
        v-model="select.year"
        :options="search.yearoption"
        label="年"
        class="col-5 q-mx-xs"
      />
      <q-select
        outlined
        :options="search.monthoption"
        v-model="select.month"
        label="月"
        class="col-5 q-mx-xs"
      />
    </div>
    <div class="w-100 col-md-4 row items-center">
      <div v-show="!select.onemonth" class="text-h6">結束</div>
      <q-select
        v-show="!select.onemonth"
        outlined
        :options="search.yearoption"
        v-model="selectEnd.year"
        label="年"
        class="col-5 q-mx-xs"
      />
      <q-select
        v-show="!select.onemonth"
        outlined
        :options="search.monthoption"
        v-model="selectEnd.month"
        label="月"
        class="col-5 q-mx-xs"
      />
    </div>
    <div class="right">區域分布 <q-icon name="help"></q-icon>
      <q-tooltip  class=" text-white tooltip" self="center right" :offset="[10, 10]"  style="max-width:200px">
        <div class="tooltip">
        <strong class="areaNotice">
          第一區: 大同區、中山區、松山區<br>
  第二區: 中正區、大安區、信義區、萬華區<br>
  第三區: 中和區、永和區、文山區、新店區<br>
  第四區: 板橋區、土城區、樹林區、三峽區、鶯歌區<br>
  第五區: 三重區、新莊區、蘆洲區、五股區、泰山區、林口區<br>
  第六區: 淡水區、北投區、士林區<br>
  第七區: 內湖區、南港區、汐止區<br>
  其他區: 龜山區、坪林區、萬里區、中壢區、七堵區、平鎮區、八德區、龍潭區、蘆竹區、金山區、深坑區、石門區、楊梅區、大溪區、大園區</strong></div>
          </q-tooltip></div>

    <!-- <q-btn outlined label="go" class="q-ma-md" @click="get"/> -->
  </div>
  <!-- ------------------------------------------- -->
  <div v-if="canvas === '會員'" class="row w-100 q-mt-xl">
    <div class="col-md-6 col-12 linecol">
      <div class="text-h6">縣市別排名</div>
      <Bar
        v-if="chartData && chartData.labels.length > 0"
        :data="chartData"
        :options="options"
        class="col-6"
      />
    </div>
    <div class="col-md-6 col-12 linecol">
      <div class="text-h6">行政區排名(前十)</div>
      <Bar
        v-if="chartData2 && chartData2.labels.length > 0"
        :data="chartData2"
        :options="options"
        class="col-6"
      />
    </div>
  </div>
  <div v-if="canvas === '餐點'" class="row w-100 q-mt-xl">
    <div class="col-md-6 col-12 linecol">
      <div class="text-h6">餐點排名(前十)</div>
      <Bar
        v-if="chartData3 && chartData3.labels.length > 0"
        :data="chartData3"
        :options="options"
        class="col-6"
      />
    </div>
    <div class="col-md-6 col-12 linecol">
      <div class="text-h6">潤餅排名(前十)</div>
      <Bar
        v-if="chartData5 && chartData5.labels.length > 0"
        :data="chartData5"
        :options="options"
        class="col-6"
      />
    </div>
  </div>
  <div v-if="canvas === '訂購次數'" class="row w-100 q-mt-xl">
    <div class="col-md-6 col-12 linecol">
      <div class="text-h6">訂購次數</div>
      <Bar
        v-if="chartData6 && chartData6.labels.length > 0"
        :data="chartData6"
        :options="options"
        class="col-6"
      />
    </div>
    <div class="col-md-6 col-12 linecol">
      <div class="text-h6">訂購>1次客人</div>
      <span
        class="text-h6"
        v-for="(data, index) in chartData6.labels"
        :key="index"
        >{{ data }},次數:{{ chartData6.datasets[0].data[index] }}&nbsp;
      </span>
    </div>
  </div>
  <div v-if="canvas === '營收'" class="row w-100 q-mt-xl">
    <div class="col-md-6 col-12 linecol">
    <div class="row w-100">
      <div class="text-h6 col">地區營收排名</div>

    </div>

      <Bar
        v-if="chartData7 && chartData7.labels.length > 0"
        :data="chartData7"
        :options="options"
        class="col-6"
      />
    </div>
    <div class="col-md-6 col-12 linecol">
      <div class="row w-100">
      <div class="text-h6 col">訂單平均單價排名</div>

    </div>
      <Bar
        v-if="chartData8 && chartData8.labels.length > 0"
        :data="chartData8"
        :options="options"
        class="col-6"
      />
    </div>

  </div>
  <!-- <div class="marquee"> -->
  <!-- <div class="notice">
  <div class="left"><strong class="areaNotice">
          第一區: 大同區、中山區、松山區<br>
  第二區: 中正區、大安區、信義區、萬華區<br>
  第三區: 中和區、永和區、文山區、新店區<br>
  第四區: 板橋區、土城區、樹林區、三峽區、鶯歌區<br>
  第五區: 三重區、新莊區、蘆洲區、五股區、泰山區、林口區</strong></div>
  <div class="right"><strong class="areaNotice">

  第六區: 淡水區、北投區、士林區<br>
  第七區: 內湖區、南港區、汐止區<br>
  其他區: 龜山區、坪林區、萬里區、中壢區、七堵區、平鎮區、八德區、龍潭區、蘆竹區、金山區、深坑區、石門區、楊梅區、大溪區、大園區</strong></div></div> -->
<!-- </div> -->
</template>

<script setup>
import { ref, watch } from 'vue'
import { DateTime } from 'luxon'
import { useQuasar } from 'quasar'
import { UseAddressStore } from 'src/stores/address.js'
import { UseSearchStore } from 'src/stores/search.js'
import { useStatusStore } from 'src/stores/status'
import { apiShit } from 'src/boot/axios'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js'
// import { Pie, Bar, Doughnut, Line } from 'vue-chartjs' // Bar
import ChartDataLabels from 'chartjs-plugin-datalabels'
//
const address = UseAddressStore()
const search = UseSearchStore()
const status = useStatusStore()
const today = DateTime.now()
const optionscanvas = status.canvas
const canvas = ref('會員')
// 註冊 ChartJS 的元件
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels,
  PointElement,
  LineElement
)

const options = ref({
  // 这里定义你的图表选项
})
import { Bar } from 'vue-chartjs'
const select = ref({
  year: today.year,
  month: today.month.toString().padStart(2, '0'),
  onemonth: true
})
const selectEnd = ref({
  year: today.year,
  month: today.month.toString().padStart(2, '0')
})
const dataset1 = ref([]) // 用於存儲從axios獲取的數據
const dataset2 = ref([]) // 用於存儲從axios獲取的數據
const dataset3 = ref([])
const dataset4 = ref([])
const dataset5 = ref([])
const dataset6 = ref([])
const dataset7 = ref([])
const dataset8 = ref([])

const $q = useQuasar()
const visible = ref(false)
const get = async (val) => {
  try {
    visible.value = true
    await address.getstate()
    const endDate = select.value.onemonth
      ? `${select.value.year}-${select.value.month}`
      : `${selectEnd.value.year}-${selectEnd.value.month}`
    const { data } = await apiShit.post('usermonth2', {
      startDate: select.value.year + '-' + select.value.month,
      endDate
    })
    const result = await apiShit.post('read2', {
      startDate: select.value.year + '-' + select.value.month,
      endDate
    })
    // const result2 = await axios.get(process.env.Fetch_api + 'read4')
    const result3 = await apiShit.post('read3', {
      startDate: select.value.year + '-' + select.value.month,
      endDate
    })
    const result4 = await apiShit.post('often', {
      startDate: select.value.year + '-' + select.value.month,
      endDate
    })
    const result5 = await apiShit.post('state/month2', {
      startDate: select.value.year + '-' + select.value.month,
      endDate
    })
    // const result5 = await axios.get(process.env.Fetch_api + 'price')
    const result6 = await apiShit.post('income2', {
      startDate: select.value.year + '-' + select.value.month,
      endDate
    })

    dataset1.value = data[0]
    dataset2.value = data[1]
    dataset3.value = result.data
    // dataset4.value = result2.data
    dataset5.value = result3.data
    dataset6.value = result4.data
    dataset7.value = result5.data
    dataset8.value = result6.data

    // 篩選潤餅
    const filteredData = Object.fromEntries(
      Object.entries(dataset5.value).filter(([key]) => key.includes('潤餅'))
    )
    // 收入倒排
    const sortedKeys = Object.keys(dataset7.value).sort()
    // 取得最後10個鍵
    const lastTenKeys = sortedKeys.slice(-val || -7)
    const lastTenRecords = {}
    lastTenKeys.forEach((key) => {
      lastTenRecords[key] = parseInt(dataset7.value[key])
    })
    // -------

    await filterbigthan1(dataset6.value)
    await updateChartData(dataset1.value, chartData, 10, '新增會員數')
    await updatePieData(dataset1.value, chartDataPie)
    await updateChartData(dataset2.value, chartData2, 10, '新增會員數')
    await updatePieData(dataset2.value, chartData2Pie)
    await updateChartData(dataset3.value, chartData3, 10, '被點次數')
    await updatePieData(dataset3.value, chartData3Pie)
    await updateLineData(dataset4.value, chartData4)
    await updateChartData(filteredData, chartData5, 10, '被點次數')
    await updatePieData(filteredData, chartData5Pie)
    await updateChartData(
      dataset6.value,
      chartData6,
      dataset6.value.length,
      '訂購次數'
    )
    await updateChartData(dataset7.value, chartData7, 10, '總價')
    await updateChartData(dataset8.value, chartData8, 10, '單價')

    visible.value = false
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'error',
      position: 'center',
      message: '取得成功'
    })
  } catch (error) {
    console.log(error)
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      position: 'center',
      message: '取得失敗'
    })
  }
}
// 長條圖
const updateChartData = (newData, chartDataRef, slice, val2) => {
  const labels = Object.keys(newData).slice(0, slice)
  const dataValues = Object.values(newData).slice(0, slice)

  chartDataRef.value = {
    labels,
    datasets: [
      {
        label: val2,
        backgroundColor,
        borderColor,
        borderWidth: 1,
        data: dataValues,
        datalabels: {
          // 注意這一行
          color: 'black',
          anchor: 'end',
          align: 'end',
          backgroundColor: 'white',
          font: {
            weight: 'bold'
          },
          formatter: function (value, context) {
            return value
          }
        }
      }
    ]
  }
}

// 圓餅圖
const updatePieData = (newData, chartDataRef) => {
  const labels = Object.keys(newData).slice(0, 5) // 只取前五個 label
  const dataValues = Object.values(newData).slice(0, 5) // 只取前五個 data value
  console.log(labels, dataValues)
  chartDataRef.value = {
    labels,
    datasets: [
      {
        label: '訂購次數',
        backgroundColor,
        borderColor,
        borderWidth: 1,
        data: dataValues,
        datalabels: {
          labels: {
            name: {
              color: 'black',
              anchor: 'end',
              align: 'end',
              backgroundColor: 'white',
              font: {
                weight: 'bold'
              },
              formatter: function (value, context) {
                return value
              }
            },
            value: {
              align: 'center',
              font: { size: 14, weight: 'bold' },
              formatter: function (value, ctx) {
                return ctx.chart.data.labels[ctx.dataIndex]
              }
            }
          }
        }
      }
    ]
  }
}
// 折線圖
const updateLineData = (newData, chartDataRef) => {
  const labels = Object.keys(newData)
  const dataValues = Object.values(newData)

  chartDataRef.value = {
    labels,
    datasets: [
      {
        label: '總營收',
        hoverBorderColor: 'white',
        backgroundColor,
        borderColor,
        borderWidth: 1,
        data: dataValues,
        datalabels: {
          labels: {
            // 注意這一行
            name: {
              color: 'black',
              anchor: 'start',
              align: 'center',
              backgroundColor: 'white',
              font: {
                weight: 'bold'
              },
              formatter: function (value, context) {
                return value
              }
            },
            value: {
              align: 'start',
              font: { size: 14, weight: 'bold' },
              formatter: function (value, ctx) {
                return ctx.chart.data.labels[ctx.dataIndex]
              }
            }
          }
        }
      }
    ]
  }
}
// 初始化chartData為空，稍後會更新
// 縣市別
const chartData = ref({
  labels: [],
  datasets: [],
  options: {}
})
const chartDataPie = ref({
  labels: [],
  datasets: [],
  options: {}
})
// 行政區別
const chartData2 = ref({
  labels: [],
  datasets: [],
  options: {}
})
const chartData2Pie = ref({
  labels: [],
  datasets: [],
  options: {}
})
// 餐點別
const chartData3 = ref({
  labels: [],
  datasets: [],
  options: {}
})
const chartData3Pie = ref({
  labels: [],
  datasets: [],
  options: {}
})
// 收入
const chartData4 = ref({
  labels: [],
  datasets: [],
  options: {}
})
// 潤餅
const chartData5 = ref({
  labels: [],
  datasets: [],
  options: {}
})
const chartData5Pie = ref({
  labels: [],
  datasets: [],
  options: {}
})
// 訂購次數
const chartData6 = ref({
  labels: [],
  datasets: [],
  options: {}
})
const chartData7 = ref({
  labels: [],
  datasets: [],
  options: {}
})
console.log(chartData7.value)
const chartData8 = ref({
  labels: [],
  datasets: [],
  options: {}
})
console.log(chartData8.value)
const backgroundColor = [
  'rgba(255, 99, 132, 0.4)',
  'rgba(255, 159, 64, 0.4)',
  'rgba(255, 205, 86, 0.4)',
  'rgba(75, 192, 192, 0.4)',
  'rgba(54, 162, 235, 0.4)',
  'rgba(153, 102, 255, 0.4)',
  'rgba(201, 203, 207, 0.4)'
]
const borderColor = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
]
// 調用get函數以獲取數據並更新chartData
get()
search.generateYearOption()
watch([select.value, selectEnd.value], async (val) => {
  if (val.onemonth) {
    console.log(val.onemonth)
    selectEnd.value.year = select.value.year
    selectEnd.value.month = select.value.month
    console.log(select.value, selectEnd.value)
  }
  await get()
})

const filterbigthan1 = async (val) => {
  const entries = Object.entries(val)
  // 过滤出值大于1的条目
  const filteredEntries = entries.filter(([key, value]) => value > 1)
  // 清空原始对象
  Object.keys(val).forEach((key) => delete val[key])
  // 将过滤后的条目填充回原始对象
  const filteredObject = Object.fromEntries(filteredEntries)
  Object.assign(val, filteredObject)
}
</script>

<style lang="scss" scoped>
.row {
  padding: 0;
  max-height: 80vh;
}
canvas {
  max-height: 80vh;
}

.right{font-size: 20px;
display: flex;
flex-direction: row;
align-items: center;}

.tooltip{
  max-width:700px
}
.notice{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /*display: inline-block;*/
  /* animation: scrollLeft 20s linear infinite;*/
  .left{
    width: 48%;
  }
  .right{
    width: 48%;
  }
}

.areaNotice{
  font-size:16px;

  animation: neonFlashing 1s infinite alternate;
}
/*
.marquee {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
 @keyframes neonFlashing {
  0% { background-color: #ff00ff; }
  25% { background-color: #00ffff; }
  50% { background-color: #ffff00; }
  75% { background-color: #ff0000; }
  100% { background-color: #00ff00; }
}*/
</style>
