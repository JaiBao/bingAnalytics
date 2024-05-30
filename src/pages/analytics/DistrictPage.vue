<template>
  <div class="row w-100">
    <div class="col-md-6 column col-xs-12">
      <q-select
        label="地區"
        outlined
        :options="address.city"
        v-model="form.shippingCity"
        emit-value
        map-options
        class="col-2"
      />
      <LineChartIncomeDistrict :form="form" class="col" />
    </div>
    <div class="col-md-6 column col-xs-12">
      <q-select
        label="地區"
        outlined
        :options="address.city"
        v-model="form2.shippingCity"
        emit-value
        map-options
        class="col-2"
      />
      <LineChartIncomeDistrict :form="form2" class="col" />
    </div>
  </div>
</template>

<script setup>
import LineChartIncomeDistrict from '../../components/LineChartIncomeDistrict.vue'
// import { apiShit } from 'src/boot/axios'
import { ref, onMounted } from 'vue'
import { UseAddressStore } from 'src/stores/address'
const address = UseAddressStore()
// const dataset1 = ref([])
// // 折線圖
const form = ref({ shippingCity: 30 })
const form2 = ref({ shippingCity: 30 })
onMounted(async () => {
  await address.getcity(2)
  await address.getcity(3)
})
// const get = async () => {
//   const { data } = await apiShit.post('/state/state', form.value)
//   dataset1.value = data
//   console.log(dataset1.value)
//   await updateLineData(dataset1.value, chartData)
// }

// const chartData = ref({
//   labels: [],
//   datasets: [],
//   options: {}
// })
// const updateLineData = (newData, chartDataRef) => {
//   const labels = Object.keys(newData)
//   const dataValues = Object.values(newData)
//   console.log(labels)
//   chartDataRef.value = {
//     labels,
//     datasets: [
//       {
//         label: '總營收',
//         hoverBorderColor: 'white',
//         backgroundColor,
//         borderColor,
//         borderWidth: 2,

//         data: dataValues,
//         datalabels: {
//           labels: {
//             // 注意這一行
//             name: {
//               color: 'black',
//               anchor: 'top',
//               align: '240',
//               backgroundColor: 'rgba(51, 170, 51,0)',
//               offset: 10,
//               padding: {},
//               font: {
//                 size: 16,
//                 weight: 'bold'
//               },
//               formatter: function (value, context) {
//                 return value
//               }
//             }
//             // value: {
//             //   align: 'start',
//             //   font: { size: 14, weight: 'bold' },
//             //   formatter: function (value, ctx) {
//             //     return ctx.chart.data.labels[ctx.dataIndex]
//             //   }
//             // }
//           }
//         }
//       }
//     ]
//   }
// }
// // -----------------------------------------------------

// const backgroundColor = [
//   'rgba(255, 99, 132, 0.4)'

// ]
// const borderColor = [
//   'rgb(255, 99, 132)'

// ]
</script>
