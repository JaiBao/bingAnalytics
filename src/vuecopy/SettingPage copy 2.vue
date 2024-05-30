<template>
  <div>
    <q-table
      :rows="orders"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :rows-per-page-options="[10]"
      style="font-size: 22px"
    >
    <template v-slot:top >
                <q-toolbar  style="margin:0;padding:0;" >
                  <q-toolbar-title class="row  flex-around" style="margin:0;padding:0;height:50px">
                    <h3 style="margin:0;padding:0;">訂單列表</h3>
                  </q-toolbar-title>
                  <q-space />

                </q-toolbar>
              </template>
              <template v-slot:header="props">
    <q-tr>
      <q-th v-for="col in props.cols" :key="col.name" :props="props" :style="{ 'font-size': '24px' }">
        {{ col.label }}
      </q-th>
    </q-tr>
  </template>
      <template v-slot:body-cell-edit="props">
        <q-td auto-width :props="props">
          <q-btn
          size="lg"
          color="primary"
          round dense @click="editOrder(props.row)" icon="edit" />
        </q-td>
      </template>
      <template v-slot:bottom>
        <q-pagination
          v-model="pagination.page"
          :max="pagination.pages"
        />
      </template>
    </q-table>
    <q-card>
      <q-card-section>
        <div class="q-gutter-md row items-start">
          <div class="row">
          <q-select outlined v-model="filters.filter_status_id"
          label="訂單狀態"
          :options="orderStatus"
          style="width: 200px"
          />
          <q-input outlined v-model="filters.filter_delivery_date" label="送達日期" />
          <q-input outlined v-model="filters.filter_code" label="訂單編號" />
          <q-input outlined v-model="filters.filter_keyname" label="姓名" />
          <q-input outlined v-model="filters.filter_phone" label="電話" />
          </div>
          <div class=" row  justify-end q-ma-md">
          <q-btn color="red" label="清除"
          @click="clearFilters"
          size="xl" />
          </div>
        </div>
      </q-card-section>
    </q-card>

  </div>
</template>

<script setup>
import { ref, reactive, watchEffect } from 'vue'
import axios from 'axios'

const filter = ref('')
const pagination = reactive({
  page: 1,
  rowsPerPage: 10, // change this to control how many rows you want to display per page
  pages: 0
})

const orderStatus = reactive([
  { label: '未確認', value: 101 },
  { label: '已確認', value: 103 },
  { label: '已確待配', value: 116 },
  { label: '未結清', value: 117 },
  { label: '已結案', value: 118 },
  { label: '作廢', value: 115 }

])// 訂單狀態

const columns = [
  { name: 'ID', required: true, label: 'ID', align: 'left', field: 'id', style: 'font-size: 18px;' },
  { name: 'code', required: true, label: '訂單編號', align: 'left', field: 'code', style: 'font-size: 18px;' },
  { name: 'personal_name', required: true, label: '姓名', align: 'left', field: 'personal_name', style: 'font-size: 18px;' },
  { name: 'mobile', required: true, label: '電話', align: 'left', field: 'mobile', style: 'font-size: 18px;' },
  { name: 'delivery_date_ymd', required: true, label: '送達日期', align: 'left', field: 'delivery_date_ymd', style: 'font-size: 18px;' },
  { name: 'status_txt', required: true, label: '訂單狀態', align: 'left', field: 'status_txt', style: 'font-size: 18px;' },
  { name: 'edit', required: true, label: '修改', align: 'left', field: 'id', sortable: false, style: 'font-size: 18px;' }
]

const orders = ref([])
const filters = reactive({
  filter_status_id: '',
  filter_delivery_date: '',
  filter_code: '',
  filter_keyname: '',
  filter_phone: ''
})

async function fetchOrders () {
  try {
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v != null && v !== '')
    )
    if (cleanedFilters.filter_status_id) {
      cleanedFilters.filter_status_id = cleanedFilters.filter_status_id.value
    }
    const response = await axios.get('http://ods.dtstw.com/backend/api/sale/order', {
      params: {
        page: pagination.page,
        ...cleanedFilters
      }
    })
    orders.value = response.data.data
    pagination.pages = response.data.last_page
  } catch (error) {
    console.error(error)
  }
}
function clearFilters () {
  filters.filter_status_id = ''
  filters.filter_delivery_date = ''
  filters.filter_code = ''
  filters.filter_keyname = ''
  filters.filter_phone = ''
}

function editOrder (order) {
  // Implement your edit order logic here
}

watchEffect(fetchOrders)
</script>
