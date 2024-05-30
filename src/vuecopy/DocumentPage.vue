<template>
  <q-page>
    <q-btn color="primary" label="主餐" @click="showMainCourseDialog" />
    <q-btn color="primary" label="配菜" @click="showSideDishDialog" />
    <q-btn color="primary" label="加入訂單" @click="submitOrder" />

    <q-dialog v-model="mainCourseDialogVisible">
      <q-card>
        <q-card-section>
          <q-input label="牛排數量" v-model="mainCourseQuantity.beef" />
          <q-input label="豬排數量" v-model="mainCourseQuantity.pork" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="primary" label="送出" @click="submitMainCourse" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="sideDishDialogVisible">
      <q-card>
        <q-card-section>
          <q-input label="豆芽數量" v-model="sideDishQuantity.beansprouts" />
          <q-input label="海帶數量" v-model="sideDishQuantity.kelp" />
        </q-card-section>

        <q-dialog v-model="editDialogVisible">
      <q-card>
        <q-card-section>
          <q-input label="主餐" v-model="editRowData.mainCourse" />
          <q-input label="數量" v-model="editRowData.quantity" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="primary" label="儲存" @click="saveEditRow" />
        </q-card-actions>
      </q-card>
    </q-dialog>

        <q-card-actions align="right">
          <q-btn color="primary" label="送出" @click="submitSideDish" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-table
      :columns="cartTableColumns"
      :rows="cartTableRows"
      title="訂單內容"
      >
      <template v-slot:body-cell-actions="props">

<div class="text-center q-gutter-x-sm" :props="props">

  <q-btn
  icon="edit"
  color="info"
  fab-mini unelevated size="sm"
  @click="editRow(props.row.index)" />
  <q-btn
  icon="delete"
  color="red"
  fab-mini unelevated
  @click="deleteRow(props.row)" />
</div>

</template>
    </q-table>

    <q-table
      :columns="orderTableColumns"
      :rows="orderTableRows"
      title="訂單列表"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

// 定義 cartTable 和 orderTable 的初始值為空陣列
const cartTableRows = ref([])
const orderTableRows = ref([])

// 定義 cartTable 的欄位
const cartTableColumns = [
  {
    name: '主餐',
    field: 'mainCourse'
  },
  {
    name: '數量',
    field: 'quantity'
  },
  {
    name: 'actions',
    field: 'actions',
    align: 'center'
  }
]

// 定義 orderTable 的欄位
const orderTableColumns = [
  {
    name: '單號',
    field: 'orderNumber'
  },
  {
    name: '商品',
    field: 'product'
  },
  {
    name: '數量',
    field: 'quantity'
  }
]

// 定義 mainCourseDialogVisible 和 sideDishDialogVisible 的初始值為 false
const mainCourseDialogVisible = ref(false)
const sideDishDialogVisible = ref(false)
const editDialogVisible = ref(false)
// 定義 mainCourseQuantity 和 sideDishQuantity 的初始值為空物件
const mainCourseQuantity = ref({})
const sideDishQuantity = ref({})

// 定義 showMainCourseDialog 和 showSideDishDialog 方法，用來顯示主餐和配菜的對話框
function showMainCourseDialog () {
  mainCourseDialogVisible.value = true
}

function showSideDishDialog () {
  sideDishDialogVisible.value = true
}

// 定義 submitMainCourse 和 submitSideDish 方法，用來將主餐和配菜的數量加入 cartTable
function submitMainCourse () {
  const rows = []

  if (mainCourseQuantity.value.beef) {
    rows.push({
      mainCourse: '牛排',
      quantity: mainCourseQuantity.value.beef
    })
  }

  if (mainCourseQuantity.value.pork) {
    rows.push({
      mainCourse: '豬排',
      quantity: mainCourseQuantity.value.pork
    })
  }
  // cartTableRows.value = cartTableRows.value.concat(rows);
  // ...展開運算符
  cartTableRows.value = [...cartTableRows.value, ...rows]
  mainCourseDialogVisible.value = false
  mainCourseQuantity.value = { beef: 0, pork: 0 } // 清空數量
}

function submitSideDish () {
  const rows = []

  if (sideDishQuantity.value.beansprouts) {
    rows.push({
      mainCourse: '豆芽',
      quantity: sideDishQuantity.value.beansprouts
    })
  }

  if (sideDishQuantity.value.kelp) {
    rows.push({
      mainCourse: '海帶',
      quantity: sideDishQuantity.value.kelp
    })
  }

  cartTableRows.value = [...cartTableRows.value, ...rows]
  sideDishDialogVisible.value = false
  sideDishQuantity.value = { beansprouts: 0, kelp: 0 } // 清空數量
}

// 定義 submitOrder 方法，用來將 cartTable 內容整合後加入 orderTable
function submitOrder () {
  const orderNumber = new Date().getTime()

  // 統計每個主餐的總數量
  const mainCourses = cartTableRows.value.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.product === item.mainCourse)

    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      acc.push({ product: item.mainCourse, quantity: item.quantity })
    }

    return acc
  }, [])

  // 將統計後的信息整合成一個新的對象
  const orderItem = {
    orderNumber,
    product: mainCourses.map((item) => item.product + ' ' + item.quantity).join(', ')
  }

  // 將新的對象添加到 orderTableRows 數組中
  // orderTableRows.value = [...orderTableRows.value, orderItem]
  orderTableRows.value = orderTableRows.value.concat(orderItem)
  // 清空 cartTableRows 數組
  cartTableRows.value = []
}
const deleteRow = (row) => {
  // 在這裡處理刪除 row 的操作
  // 可以使用 row 參數來取得要刪除的資料

  // 假設 tableData 是您的資料表格的資料陣列
  // 使用 Array.findIndex 找到要刪除的資料的索引
  const index = cartTableRows.value.findIndex(item => item === row)

  if (index !== -1) {
    // 使用 Array.splice 刪除該資料
    cartTableRows.value.splice(index, 1)
  }
}

const editRow = (data) => {
  // 找到需要编辑的数据索引
  const index = cartTableRows.value.findIndex(item => item === data)

  // 如果索引存在，则更新数据
  if (index !== -1) {
    // 使用 Object.assign() 方法将新数据合并到原有数据中
    cartTableRows.value[index] = Object.assign({}, cartTableRows.value[index], data)
  }
}
</script>
