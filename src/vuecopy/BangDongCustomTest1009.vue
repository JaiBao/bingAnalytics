<template>
  <!-- 主餐 -->
    <div>
  <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1MainName }}</h5>
  <div class="row items-center"
  >
  <q-item  v-for="(bangdongCustom1Main, index) in bangdongCustom1Mains" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
  <q-input
  min="0"

  v-model="bangdongCustom1Main.quantity"
  :label="bangdongCustom1Main.name"
  outlined
  type="number"
    :input-style="{ fontSize: '20px', margin: '0' }"
    :label-style="{ fontSize: '20px' }"
    style="width: 130px;"
    />
  </q-item>
  </div>
  </div>
  <!-- 飲料 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1DrinkName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdongCustom1Drink, index) in bangdongCustom1Drinks" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdongCustom1Drink.quantity" :label="bangdongCustom1Drink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 副主餐 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1BentoMainName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdongCustom1BentoMain, index) in bangdongCustom1BentoMains" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdongCustom1BentoMain.quantity" :label="bangdongCustom1BentoMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
      </div>
    </div>
  <!-- 配菜 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1SideDishName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdongCustom1SideDish, index) in bangdongCustom1SideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdongCustom1SideDish.quantity" :label="bangdongCustom1SideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 總計 -->
  <div style="width:100%;padding: 0;margin: 0;height: 30px;">
      <h5  style="line-height: 0;">{{bangdongCustom1Name}}</h5>
      </div>
      <div class="row">
  <q-input
  min="0"

  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdongCustom1TotalQuantity"
  label="數量總計"
  readonly
  />
  <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdongCustom1Price"
  label="價格"
  />
  <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdongCustom1TotalQuantityPrice"
  label="金額總計"
  readonly
  />
  </div>
  <!-- 按鈕 -->
  <div class="row justify-end" style="width: 100%;">
  <q-btn
  color="primary"
  label="送出"
  type="submit"
  class="q-mt-md"
  @click="submitBangdongCustom1"
  />
  <q-btn
  color="red"
  label="取消"
  @click="showbangdongCustom1 = false"
  class="q-mt-md"
  />

  </div >
  <!-- 訂單區 -->
  <q-table :rows="tableRows" class="orderTable">
    <template #header>
      <q-tr>
        <q-th style="font-size:20px">ID</q-th>
        <q-th style="font-size:20px">商品</q-th>
        <q-th style="font-size:20px">搭配</q-th>
        <q-th style="font-size:20px">飲料</q-th>
        <q-th style="font-size:20px">配菜</q-th>
        <q-th style="font-size:20px">金額</q-th>
        <q-th style="font-size:20px">操作</q-th>
      </q-tr>
    </template>

    <template #body="props">
      <q-tr :props="props">
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.id }}</q-td>
        <q-td style="text-align: center;font-size:20px">
          {{ props.row.name }}
          <div v-for="(input, index) in props.row.inputs" :key="index" style="text-align: center;font-size:20px">
            <input type="hidden" :name="input.name" v-model="input.value"
            >
          </div>
        </q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.Main }}</q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.drinks }}</q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.sideDishes }}</q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.price }}</q-td>
        <q-td style="text-align: center">
          <q-btn icon="delete"
          color="red"
          fab-mini
          unelevated
          size="sm"
          @click="deleteRow(props.row.id)" />
          <q-btn icon="edit"
          fab-mini
          unelevated size="sm"
          color="info"
          @click="editRowDialog9(props.row)"/>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <!-- 客製招牌便當修改dialog -->
     <q-dialog v-model="editDialog9">
  <q-card class="q-gutter-md row items-start  word-break " id="bangdongcard">
    <div>
      <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1MainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongCustom1EditMain, index) in bangdongCustom1EditMains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model="bangdongCustom1EditMain.quantity" :label="bangdongCustom1EditMain.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
            style="width: 130px;"
            min="0"/>
        </q-item>
      </div>
    </div>
    <!-- 飲料 -->
    <div>
      <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1DrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongCustom1EditDrink, index) in bangdongCustom1EditDrinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model="bangdongCustom1EditDrink.quantity" :label="bangdongCustom1EditDrink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
            style="width: 130px;"
            min="0" />
        </q-item>
      </div>
    </div>
    <!-- 副主餐 -->
    <div>
      <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1BentoMainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongCustom1EditBentoMain, index) in bangdongCustom1EditBentoMains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model="bangdongCustom1EditBentoMain.quantity" :label="bangdongCustom1EditBentoMain.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
            style="width: 130px;"
            min="0"/>
        </q-item>
      </div>
    </div>
    <!-- 配菜 -->
    <div>
      <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongCustom1EditSideDish, index) in bangdongCustom1EditSideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model="bangdongCustom1EditSideDish.quantity" :label="bangdongCustom1EditSideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
            style="width: 130px;"
            min="0"/>
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;height: 30px;">
      <h5 style="line-height: 0;">{{bangdongCustom1Name}}</h5>
    </div>
    <div class="row">
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="bangdongCustom1EditTotalQuantity" label="數量總計" readonly
        min="0"/>
        <q-input
    min="0"
     outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
      v-model="bangdongCustom1EditPrice" label="價格"  />
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="bangdongCustom1EditTotalQuantityPrice" label="金額總計" readonly
        min="0"/>
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn label="取消" color="red" @click="closeEditDialog9" />
      <q-btn label="儲存" color="primary" @click="saveEditDialog9" />

    </div>

  </q-card>
</q-dialog>

  </template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { apiAuth } from 'src/boot/axios'

const bangdongCustom1Mains = reactive([])
const bangdongCustom1MainName = ref('')
const bangdongCustom1Drinks = reactive([])
const bangdongCustom1DrinkName = ref('')
const bangdongCustom1SideDishes = reactive([])
const bangdongCustom1SideDishName = ref('')
const bangdongCustom1Name = ref('')
const bangdongCustom1BentoMains = reactive([])
const bangdongCustom1BentoMainName = ref('')
const tableRows = reactive([])
const editDialog9 = ref(false)
// 抓取客製招牌便當主餐形成input
const loadBangdongCustom1 = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1043')
    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdongCustom1Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.short_name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdongCustom1Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        quantity: 0
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdongCustom1SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      bangdongCustom1BentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.short_name,
        quantity: 0
      })
    }

    bangdongCustom1Name.value = response.data.name
    bangdongCustom1MainName.value = mainMeal.name
    bangdongCustom1DrinkName.value = Drink.name
    bangdongCustom1SideDishName.value = sideDish.name
    bangdongCustom1BentoMainName.value = bentoMain.name
  } catch (error) {
    console.error(error)
  }
}

loadBangdongCustom1()

// 計算總數量
const bangdongCustom1TotalQuantity = computed(() => {
  return bangdongCustom1Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})
const bangdongCustom1Price = ref(0)

// 計算總價格
const bangdongCustom1TotalQuantityPrice = computed(() => {
  return bangdongCustom1TotalQuantity.value * bangdongCustom1Price.value
})
// 將資料推進tableRows
const submitBangdongCustom1 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 9,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    sideDishDefault: '',
    price: bangdongCustom1TotalQuantityPrice.value,
    inputs: []
  }

  const totalQuantity = bangdongCustom1TotalQuantity.value

  for (const bangdongCustom1Main of bangdongCustom1Mains) {
    if (bangdongCustom1Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ', '
      }
      row.name = bangdongCustom1Name.value + totalQuantity + '份'
      row.Main += bangdongCustom1Main.name + '' + parseInt(bangdongCustom1Main.quantity).toString()

      const input = {
        name: bangdongCustom1Main.name,
        value: parseInt(bangdongCustom1Main.quantity)
      }
      row.inputs.push(input)
      bangdongCustom1Main.quantity = 0
    }
  }
  for (const bangdongCustom1Drink of bangdongCustom1Drinks) {
    if (bangdongCustom1Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ', '
      }
      row.drinks += bangdongCustom1Drink.name + '' + parseInt(bangdongCustom1Drink.quantity).toString()

      const input = {
        name: bangdongCustom1Drink.name,
        value: parseInt(bangdongCustom1Drink.quantity)
      }
      row.inputs.push(input)
      bangdongCustom1Drink.quantity = 0
    }
  }

  for (const bangdongCustom1SideDish of bangdongCustom1SideDishes) {
    if (bangdongCustom1SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += bangdongCustom1SideDish.name + '' + parseInt(bangdongCustom1SideDish.quantity).toString()
      row.sideDishDefault += bangdongCustom1SideDish.is_default + ' '

      const input = {
        name: bangdongCustom1SideDish.name,
        value: parseInt(bangdongCustom1SideDish.quantity),
        is_default: bangdongCustom1SideDish.is_default
      }
      row.inputs.push(input)
      bangdongCustom1SideDish.quantity = 0
    }
  }

  // 副主餐
  for (const bangdongCustom1BentoMain of bangdongCustom1BentoMains) {
    if (bangdongCustom1BentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdongCustom1BentoMain.name + '' + parseInt(bangdongCustom1BentoMain.quantity).toString() + ' '

      const input = {
        name: bangdongCustom1BentoMain.name,
        value: parseInt(bangdongCustom1BentoMain.quantity)
      }
      row.inputs.push(input)
      bangdongCustom1BentoMain.quantity = 0
    }
  }
  bangdongCustom1Price.value = 0
  // 將這個 row 推進 tableRows 中
  tableRows.push(row)
}

// 刪除該行
const deleteRow = (id) => {
  const index = tableRows.findIndex((row) => row.id === id)
  if (index >= 0) {
    tableRows.splice(index, 1)

    // 重新生成 ID
    for (let i = index; i < tableRows.length; i++) {
      tableRows[i].id = tableRows[i].id - 1
    }
  }
}
// editDialog9導入欄位
const bangdongCustom1EditMains = reactive([])
const bangdongCustom1EditDrinks = reactive([])
const bangdongCustom1EditSideDishes = reactive([])
const bangdongCustom1EditBentoMains = reactive([])
const loadBangdongCustom1Edit = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1043')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdongCustom1EditMain = {
        id: value.id,
        name: value.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongCustom1EditMains.push(bangdongCustom1EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdongCustom1EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongCustom1EditDrinks.push(bangdongCustom1EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdongCustom1EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default
      }
      bangdongCustom1EditSideDishes.push(bangdongCustom1EditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdongCustom1EditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongCustom1EditBentoMains.push(bangdongCustom1EditBentoMain)
      console.log(bangdongCustom1EditBentoMain)
    }

    bangdongCustom1MainName.value = mainMeal.name
    bangdongCustom1DrinkName.value = Drink.name
    bangdongCustom1SideDishName.value = sideDish.name
    bangdongCustom1BentoMainName.value = bentoMain.name
  } catch (error) {
    console.error(error)
  }
}

loadBangdongCustom1Edit()

// 將table資料拆解放回修正欄位

let editingRow = null

function editRowDialog9 (row) {
  // 客製招牌便當主餐歸零
  for (const bangdongCustom1EditMain of bangdongCustom1EditMains) {
    bangdongCustom1EditMain.quantity = 0
  }
  // 客製招牌便當飲料歸零
  for (const bangdongCustom1EditDrink of bangdongCustom1EditDrinks) {
    bangdongCustom1EditDrink.quantity = 0
  }
  // 客製招牌便當配菜歸零
  for (const bangdongCustom1EditSideDish of bangdongCustom1EditSideDishes) {
    bangdongCustom1EditSideDish.quantity = 0
  }
  // 客製招牌便當副主餐歸零
  for (const bangdongCustom1EditBentoMain of bangdongCustom1EditBentoMains) {
    bangdongCustom1EditBentoMain.quantity = 0
  }
  // 客製招牌便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 客製招牌便當  主餐  推入input數值
    const mainIndex = bangdongCustom1EditMains.findIndex(
      (bangdongCustom1EditMain) => bangdongCustom1EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdongCustom1EditMains[mainIndex].quantity = parseInt(value)
    }
    // 客製招牌便當  飲料  推入input數值
    const drinkIndex = bangdongCustom1EditDrinks.findIndex(
      (bangdongCustom1EditDrink) => bangdongCustom1EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdongCustom1EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 客製招牌便當  配菜  推入input數值
    const sideDishIndex = bangdongCustom1EditSideDishes.findIndex(
      (bangdongCustom1EditSideDish) => bangdongCustom1EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdongCustom1EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 客製招牌便當  副主餐  推入input數值
    const bentoMainIndex = bangdongCustom1EditBentoMains.findIndex(
      (bangdongCustom1EditBentoMain) => bangdongCustom1EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdongCustom1EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
  }

  const totalQuantity = parseFloat(row.price) // 获取 bangdongCustom1TotalQuantity 的值

  bangdongCustom1EditPrice.value = totalQuantity / bangdongCustom1EditTotalQuantity.value // 将 rowPrice / totalQuantity 的值赋给 bangdongCustom1EditPrice

  editingRow = row
  editDialog9.value = true
}

const bangdongCustom1EditTotalQuantity = computed(() => {
  return bangdongCustom1EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})

const bangdongCustom1EditPrice = ref(0)
const bangdongCustom1EditTotalQuantityPrice = computed(() => {
  return bangdongCustom1EditTotalQuantity.value * bangdongCustom1EditPrice.value
})

// 關閉修正欄位
function closeEditDialog9 () {
  editDialog9.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog9 () {
  const row = {
    bentoType: 9,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    sideDishDefault: '',
    price: bangdongCustom1EditTotalQuantityPrice.value,
    inputs: []
  }

  const totalEditQuantity = bangdongCustom1EditTotalQuantity.value // 計算總數量
  for (const bangdongCustom1EditMain of bangdongCustom1EditMains) {
    if (bangdongCustom1EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += '、'
      }
      row.name = bangdongCustom1Name.value + totalEditQuantity + '份' // 使用總數量
      row.Main += bangdongCustom1EditMain.name + '' + parseInt(bangdongCustom1EditMain.quantity).toString() + ' '
      const input = {
        name: bangdongCustom1EditMain.name,
        value: parseInt(bangdongCustom1EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }

  for (const bangdongCustom1EditDrink of bangdongCustom1EditDrinks) {
    if (bangdongCustom1EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += '、'
      }
      row.drinks += bangdongCustom1EditDrink.name + '' + parseInt(bangdongCustom1EditDrink.quantity).toString() + ' '
      const input = {
        name: bangdongCustom1EditDrink.name,
        value: parseInt(bangdongCustom1EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }

  for (const bangdongCustom1EditSideDish of bangdongCustom1EditSideDishes) {
    if (bangdongCustom1EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += '、'
      }
      row.sideDishes += bangdongCustom1EditSideDish.name + '' + parseInt(bangdongCustom1EditSideDish.quantity).toString() + ' '
      row.sideDishDefault += bangdongCustom1EditSideDish.is_default + ' '
      const input = {
        name: bangdongCustom1EditSideDish.name,
        value: parseInt(bangdongCustom1EditSideDish.quantity),
        is_default: bangdongCustom1EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入副主餐置入table
  for (const bangdongCustom1EditBentoMain of bangdongCustom1EditBentoMains) {
    if (bangdongCustom1EditBentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdongCustom1EditBentoMain.name + '' + parseInt(bangdongCustom1EditBentoMain.quantity).toString() + ' '
      const input = {
        name: bangdongCustom1EditBentoMain.name,
        value: parseInt(bangdongCustom1EditBentoMain.quantity)
      }
      row.inputs.push(input)
    }
  }

  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog9.value = false
}

</script>
  <style lang="scss" scoped>
  .orderTable{
    td {
    white-space: normal;
  }

  }
  </style>
