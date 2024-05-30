<template>
  <div class="col-xs-12 col-md-6 linecol">
    <div class="text-h6">會員縣市別長條圖</div>
    <Bar
      v-if="chartData && chartData.labels.length > 0"
      :data="chartData"
      :options="options"
      class="col-6"
    />
  </div>
  <div class="col-xs-12 col-md-6 linecol">
    <div class="text-h6">會員行政區別長條圖(前十)</div>

    <Bar
      v-if="chartData2 && chartData2.labels.length > 0"
      :data="chartData2"
      :options="options"
      class="col-6"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
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
import { Bar } from 'vue-chartjs' // Bar
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { apiShit } from 'src/boot/axios'
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
const dataset1 = ref([])
const dataset2 = ref([])
const get = async () => {
  const { data } = await apiShit.get('read98')
  dataset1.value = data[0]
  dataset2.value = data[1]
  await updateChartData(dataset1.value, chartData, '會員數')
  await updateChartData(dataset2.value, chartData2, '會員數')
}

const updateChartData = (newData, chartDataRef, val2) => {
  const labels = Object.keys(newData).slice(0, 10)
  const dataValues = Object.values(newData).slice(0, 10)

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
const chartData = ref({
  labels: [],
  datasets: [],
  options: {}
})
const chartData2 = ref({
  labels: [],
  datasets: [],
  options: {}
})
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

onMounted(async () => {
  await get()
})
</script>
