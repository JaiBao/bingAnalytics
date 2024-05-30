<template>
  <div class="row w-100">
    <!-- <div class="col-xs-12 col-md-6 linecol">
      <div class="row w-100 q-mb-xs-xs q-mb-md-md">
        <span class="text-h6 text-black col-3">營收折線圖(近期)</span>
        <div class="col-md-4 col-xs-8">
          <q-btn label="7" @click="get(7)" color="primary" class="q-mx-xs" />
          <q-btn label="14" @click="get(14)" color="primary" class="q-mx-xs" />
          <q-btn label="21" @click="get(21)" color="primary" class="q-mx-xs" />
          <q-btn label="28" @click="get(28)" color="primary" class="q-mx-xs" />
        </div>

        <span class="text-h6 text-black col-3">&lt;&lt; 請選擇顯示天數</span>
      </div>

      <Line
        v-if="chartData7"
        :data="chartData7"
        :options="options"
        class="col-6"
      />
    </div> -->
    <div class="col-xs-12 linecol">
      <div class="text-h6">營收折線圖(月)</div>
      <Line
        v-if="chartData7"
        :data="chartData7"
        :options="options"
        class="col-6"
      />
    </div>
  </div>
</template>

<script setup>
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
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { onMounted, ref, watch } from 'vue'
import { Line } from 'vue-chartjs'
import { apiShit } from 'src/boot/axios'
import { useQuasar } from 'quasar'

// ------------------------------------------------
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
const props = defineProps(['form'])
const $q = useQuasar()
// const dataset4 = ref([])
const dataset7 = ref([])
const submit = ref({ shippingCity: props.form.shippingCity })
const get = async (val) => {
  try {
    // const result4 = await apiShit.get('read4')
    const result7 = await apiShit.post('state/state', submit.value)
    // dataset4.value = result4.data
    dataset7.value = result7.data
    console.log(dataset7.value)
    const sortedKeys = Object.keys(dataset7.value).sort()
    // 取得最後10個鍵
    const lastTenKeys = sortedKeys.slice(-val || -7)
    const lastTenRecords = {}
    lastTenKeys.forEach((key) => {
      lastTenRecords[key] = parseInt(dataset7.value[key])
    })
    // await updateLineData(dataset4.value, chartData4)
    await updateLineData(lastTenRecords, chartData7)
  } catch (error) {
    console.log(error)
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      position: 'bottom',
      message: error
    })
  }
}

const updateLineData = (newData, chartDataRef) => {
  const labels = Object.keys(newData)
  const dataValues = Object.values(newData)
  console.log(dataValues)
  chartDataRef.value = {
    labels,
    datasets: [
      {
        label: '總營收',
        hoverBorderColor: 'white',
        backgroundColor,
        borderColor,
        borderWidth: 2,

        data: dataValues,
        datalabels: {
          labels: {
            // 注意這一行
            name: {
              color: 'black',
              anchor: 'top',
              align: '240',
              backgroundColor: 'rgba(51, 170, 51,0)',
              offset: 10,
              padding: {},
              font: {
                size: 16,
                weight: 'bold'
              },
              formatter: function (value, context) {
                return value
              }
            }
            // value: {
            //   align: 'start',
            //   font: { size: 14, weight: 'bold' },
            //   formatter: function (value, ctx) {
            //     return ctx.chart.data.labels[ctx.dataIndex]
            //   }
            // }
          }
        }
      }
    ]
  }
}
// 收入
// const chartData4 = ref({
//   labels: [],
//   datasets: [],
//   options: {}
// })
const chartData7 = ref({
  labels: [],
  datasets: [],
  options: {}
})
const backgroundColor = ['rgba(255, 205, 86, 0.4)']
const borderColor = ['rgb(255, 205, 86)']

watch(
  () => props.form.shippingCity,
  async (val) => {
    submit.value = { shippingCity: val }
    await get()
  }
)
onMounted(async () => {
  setTimeout(async () => {
    await get()
  }, 1000)
})
</script>
