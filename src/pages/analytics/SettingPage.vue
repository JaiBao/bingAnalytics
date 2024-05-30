<template>
  <q-inner-loading :showing="visible">
    <q-spinner-gears size="200px" color="primary" />
  </q-inner-loading>
  <!-- -------------------------- -->
  <div class="row w-100 items-center  justify-around q-my-md-md">
    <div class="left row w-75 items-center q-my-md-md">
    <q-select
      outlined
      label="圖表類型"
      v-model="canvas"
      :options="status.canvas"
      class="col-3 q-mx-md-xs"
    />

    <q-option-group
      inline
      v-model="canvastype"
      :options="optionsCanvastype"
      class="col-5"
    /></div>

  </div>
  <div v-if="canvas === '會員' && canvastype === '圓餅'" class="row w-100">
    <MemberDoughnutChart />
  </div>

  <!-- ---------------------------------------------- -->
  <div
    v-if="canvas === '會員' && canvastype === '長條'"
    class="row w-100 q-mt-xl"
  >
    <MemberBarChart />
  </div>

  <div
    v-if="canvas === '餐點' && canvastype === '長條'"
    class="row w-100 q-mt-xl"
  >
    <MealBarChart />
  </div>
  <!-- ------------------------------ -->
  <!--  ------------------------------------ -->
  <div
    v-if="canvas === '餐點' && canvastype === '圓餅'"
    class="row w-100 q-my-xl"
  >
    <MealDoughnutChart />
  </div>
  <!-- ---- ------  - --- --  - - - -->
  <div v-if="canvas === '訂購次數'" class="row w-100 q-mt-xl">
    <ManyTimeCustomer />
  </div>
  <div
    v-if="canvas === '營收' && canvastype !== '長條'"
    class="row w-100 q-mt-xl"
  >
    <LineChartIncome />
  </div>
  <div
    v-if="canvas === '營收' && canvastype === '長條'"
    class="row w-100 q-mt-xl"
  >
    <BarChartIncome />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ResizeObserver } from '@juggle/resize-observer'
import { useStatusStore } from 'src/stores/status'
// import { UseSearchStore } from 'src/stores/search'
import LineChartIncome from 'src/components/LineChartIncome.vue'
import BarChartIncome from 'src/components/BarChartIncome.vue'
import MemberBarChart from 'src/components/MemberBarChart.vue'
import MemberDoughnutChart from 'src/components/MemberDoughnutChart.vue'
import ManyTimeCustomer from 'src/components/ManyTimeCustomer.vue'
import MealBarChart from 'src/components/MealBarChart.vue'
import MealDoughnutChart from 'src/components/MealDoughnutChart.vue'

//
const status = useStatusStore()
// const search = UseSearchStore()
// 註冊 ChartJS 的元件

const canvas = ref('營收')
const canvastype = ref('圓餅')

const visible = ref(true)

const ro = new ResizeObserver((entries, observer) => {
  console.log('Body has resized!')
  observer.disconnect() // Stop observing
})

ro.observe(document.body) // Watch dimension changes on body

const optionsCanvastype = computed(() => {
  if (canvas.value === '會員') {
    return status.canvastype.filter(
      (type) => type.value === '圓餅' || type.value === '長條'
    )
  } else if (canvas.value === '營收') {
    return status.canvastype.filter(
      (type) => type.value === '長條' || type.value === '折線'
    )
  } else if (canvas.value === '餐點') {
    return status.canvastype.filter(
      (type) => type.value === '長條' || type.value === '圓餅'
    )
  } else if (canvas.value === '訂購次數') {
    return []
  }
  return status.canvastype
})

onMounted(async () => {
  setInterval(() => {
    visible.value = false
  }, 700)
})
</script>

<style scoped>
.row {
  padding: 0;
  max-height: 90vh;
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

.areaNotice{
  font-size: 20px;

  animation: neonFlashing 1s infinite alternate;
}

@keyframes neonFlashing {
  0% { background-color: #ff00ff; }
  25% { background-color: #00ffff; }
  50% { background-color: #ffff00; }
  75% { background-color: #ff0000; }
  100% { background-color: #00ff00; }
}

</style>
