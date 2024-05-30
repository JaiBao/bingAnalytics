<template>
    <div class="col-xs-12 col-md-6 linecol">
      <div class="text-h6">餐點別環狀圖(前五)</div>
      <Doughnut
        v-if="chartData3Pie && chartData3Pie.labels.length > 0"
        :data="chartData3Pie"
        :options="options"
        class="col-6"
      />
    </div>
    <div class="col-xs-12 col-md-6 linecol">
      <div class="text-h6">潤餅環狀圖(前五)</div>
      <Doughnut
        v-if="chartData5Pie && chartData5Pie.labels.length > 0"
        :data="chartData5Pie"
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
import { Doughnut } from 'vue-chartjs' // Bar
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
const dataset3 = ref([])
const dataset5 = ref([])
const get = async () => {
  const result = await apiShit.get('read2')
  const result3 = await apiShit.get('read3')
  dataset3.value = result.data
  dataset5.value = result3.data
  await updatePieData(dataset3.value, chartData3Pie)
  await updatePieData(dataset5.value, chartData5Pie)
}

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
const chartData3Pie = ref({
  labels: [],
  datasets: [],
  options: {}
})
const chartData5Pie = ref({
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
