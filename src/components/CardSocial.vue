<template>
  <div class="row w-100 q-col-gutter-sm">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="col-md col-sm-6 col-xs-12"
    >
      <q-item :style="`background-color: ${item.color1}`" class="q-pa-none">
        <q-item-section
          v-if="iconPosition === 'left'"
          side
          :style="`background-color: ${item.color2}`"
          class="q-pa-md q-mr-none text-white"
        >
          <q-icon :name="item.icon" color="white" size="24px"></q-icon>
        </q-item-section>
        <q-item-section class="q-pa-md q-ml-none text-white">
          <q-item-label class="text-white text-h6 text-weight-bolder">{{
            item.value
          }}</q-item-label>
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item-section>
        <q-item-section
          v-if="iconPosition === 'right'"
          side
          class="q-mr-md text-white"
        >
          <q-icon :name="item.icon" color="white" size="44px"></q-icon>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { DateTime } from 'luxon'
import { UseSearchStore } from 'src/stores/search'
import { UseMemberStore } from 'src/stores/member'
const search = UseSearchStore()
const member = UseMemberStore()
// search.get()
const today = DateTime.now().toFormat('yyyy-MM-dd')
const length = ref(0)
const bentovalue = ref(0)
const todayIncome = ref(0)
const Monthincome = ref(0)
const newcustomer = ref(0)
const month = DateTime.now().toFormat('yyyy-MM')

const iconPosition = ref('left')
const items = computed(() => {
  return iconPosition.value === 'left'
    ? [{
        title: '今日訂單數',
        icon: 'bar_chart',
        value: length,
        color1: '#a270b1',
        color2: '#9f52b1'
      },
      {
        title: '今日餐點套數',
        icon: 'bar_chart',
        value: bentovalue,
        color1: '#F5507B',
        color2: '#D14469'
      },
      {
        title: '今日訂單金額',
        icon: 'bar_chart',
        value: todayIncome,
        color1: '#ea6a7f',
        color2: '#ea4b64'
      },
      {
        title: '本月新客',
        icon: 'bar_chart',
        value: newcustomer,
        color1: '#F5507B',
        color2: '#D14469'
      },
      {
        title: '本月訂單金額',
        icon: 'bar_chart',
        value: Monthincome,
        color1: '#a270b1',
        color2: '#9f52b1'
      }

      ]
    : []
})
onMounted(() => {
  setTimeout(async () => {
    const todayRecord = search.income.find((record) => record[0] === today)
    todayIncome.value = todayRecord ? parseInt(todayRecord[1]) : 0
    const monthRecords = search.Monthincome.find((record) => record[0] === month)
    Monthincome.value = monthRecords ? parseInt(monthRecords[1]) : 0
    const dayrecords = search.products.find((record) => record.date === today)
    bentovalue.value = dayrecords.value
    const daylength = search.length.find((record) => record.deliveryDate === today)
    length.value = daylength.orderCount
    await member.getcustomer()
    newcustomer.value = member.memberlength
  }, 500)
})
</script>
