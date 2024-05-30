<template>
    <div class="col-xs-12 col-md-6 linecol">
      <div class="text-h6">訂購金額區域圖(全部)</div>
      <Bar
        v-if="chartData8 && chartData8.labels.length > 0"
        :data="chartData8"
        :options="options"
        class="col-6"
      />
    </div>
    <div class="col-xs-12 col-md-6 linecol"></div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
// import { useQuasar } from 'quasar'
import { apiShit } from 'src/boot/axios'
import { Bar } from 'vue-chartjs'
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

const dataset8 = ref([])
const get = async (val) => {
  try {
    const result6 = await apiShit.get('income')
    dataset8.value = result6.data
    await updateChartData(dataset8.value, chartData8, '金額')
  } catch (error) {

  }
}
const chartData8 = ref({
  labels: [],
  datasets: [],
  options: {}
})
// 長條圖
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
