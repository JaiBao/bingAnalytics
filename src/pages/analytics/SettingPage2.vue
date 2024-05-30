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
    <div class="right">區域分布 <q-icon name="help"></q-icon>
      <q-tooltip  class=" text-white tooltip" self="center right" :offset="[10, 10]"  >
        <div class="tooltip">
        <strong class="areaNotice">
          第一區: 大同區、中山區、松山區<br>
  第二區: 中正區、大安區、信義區、萬華區<br>
  第三區: 中和區、永和區、文山區、新店區<br>
  第四區: 板橋區、土城區、樹林區、三峽區、鶯歌區<br>
  第五區: 三重區、新莊區、蘆洲區、五股區、泰山區、林口區<br>
  第六區: 淡水區、北投區、士林區<br>
  第七區: 內湖區、南港區、汐止區<br>
  其他區: 龜山區、坪林區、萬里區、中壢區、七堵區、平鎮區、八德區、龍潭區、蘆竹區、金山區、深坑區、石門區、楊梅區、大溪區、大園區</strong>
</div></q-tooltip></div>
  </div>
  <div v-if="canvas === '會員' && canvastype === '圓餅'" class="row w-100">
    <MemberDoughnutChart2 />
  </div>

  <!-- ---------------------------------------------- -->
  <div
    v-if="canvas === '會員' && canvastype === '長條'"
    class="row w-100 q-mt-xl"
  >
    <MemberBarChart2 />
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
    <LineChartIncome2 />
  </div>
  <div
    v-if="canvas === '營收' && canvastype === '長條'"
    class="row w-100 q-mt-xl"
  >
    <BarChartIncome2 />
  </div>
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

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ResizeObserver } from '@juggle/resize-observer'
import { useStatusStore } from 'src/stores/status'
// import { UseSearchStore } from 'src/stores/search'
import LineChartIncome2 from 'src/components/LineChartIncome2.vue'
import BarChartIncome2 from 'src/components/BarChartIncome2.vue'
import MemberBarChart2 from 'src/components/MemberBarChart2.vue'
import MemberDoughnutChart2 from 'src/components/MemberDoughnutChart2.vue'
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

<style lang="scss" scoped>
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
.notice{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .left{
    width: 48%;
  }
  .right{
    width: 48%;
  }
}

.areaNotice{
  font-size: 16px;

  animation: neonFlashing 1s infinite alternate;
}
/*
@keyframes neonFlashing {
  0% { background-color: #ff00ff; }
  25% { background-color: #00ffff; }
  50% { background-color: #ffff00; }
  75% { background-color: #ff0000; }
  100% { background-color: #00ff00; }
} */

</style>
