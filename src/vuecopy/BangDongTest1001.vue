<template>
  <!-- 主餐 -->
    <div>
  <h5 style="margin: 0; padding: 0;">{{ bangdong1MainName }}</h5>
  <div class="row items-center"
  >
  <q-item  v-for="(bangdong1Main, index) in bangdong1Mains" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
  <q-input
  min="0"

  v-model="bangdong1Main.quantity"
  :label="bangdong1Main.name"
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
    <h5 style="margin: 0; padding: 0;">{{ bangdong1DrinkName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdong1Drink, index) in bangdong1Drinks" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdong1Drink.quantity" :label="bangdong1Drink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 配菜 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong1SideDishName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdong1SideDish, index) in bangdong1SideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdong1SideDish.quantity" :label="bangdong1SideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 總計 -->
  <div style="width:100%;padding: 0;margin: 0;height: 30px;">
      <h5  style="line-height: 0;">{{bangdong1Name}}</h5>
      </div>
      <div class="row">
  <q-input
  min="0"

  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong1TotalQuantity"
  label="數量總計"
  readonly
  />
  <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong1Price"
  label="商品單價"
  readonly
  />
  <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong1TotalQuantityPrice"
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
  @click="submitBangdong1"
  />
  <q-btn
  color="red"
  label="取消"
  @click="showbangdong1 = false"
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
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.price }}
          <div v-for="(productInput, index) in props.row.productInputs" :key="index" style="text-align: center;font-size:20px">
            <input type="hidden" :name="productInput.name" v-model="productInput.value"
            >
          </div>
          <div v-for="(priceInput, index) in props.row.priceInputs" :key="index" style="text-align: center;font-size:20px">
            <input type="hidden" :name="priceInput.name" v-model="priceInput.value"
            >
          </div>
          <div v-for="(productTypeInput, index) in props.row.productTypeInputs" :key="index" style="text-align: center;font-size:20px">
            <input type="hidden" :name="productTypeInput.name" v-model="productTypeInput.value"
            >
          </div>
        </q-td>
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
          @click="editRowDialog(props.row)"/>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <!-- 招牌便當修改dialog -->
  <q-dialog v-model="editDialog1" persistent>
      <q-card>
        <q-card-section>

          <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong1MainName }}</h5>
    <div class="row items-center"></div>
    <q-item v-for="(bangdong1EditMain, index) in bangdong1EditMains" :key="index" class="flex-auto "
      style="margin: 0; padding: 0;">
      <q-input
      min="0"
       v-model="bangdong1EditMain.quantity" :label="bangdong1EditMain.name" outlined type="number"
        :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
    </q-item>
  </div>

  <!-- 飲料 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong1DrinkName }}</h5>
    <div class="row items-center"></div>
      <q-item v-for="(bangdong1EditDrink, index) in bangdong1EditDrinks" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdong1EditDrink.quantity" :label="bangdong1EditDrink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  <!-- 配菜 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong1SideDishName }}</h5>
    <div class="row items-center"></div>
      <q-item v-for="(bangdong1EditSideDish, index) in bangdong1EditSideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdong1EditSideDish.quantity" :label="bangdong1EditSideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  <div style="width:100%;padding: 0;margin: 0;height: 30px;">
    <h5 style="line-height: 0;">{{bangdong1Name}}</h5>
  </div>
  <div class="row">
    <q-input
    min="0"
     outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
      v-model="bangdong1EditTotalQuantity" label="數量總計" readonly />
    <q-input
    min="0"
     outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
      v-model="bangdong1EditPrice" label="商品單價" readonly />
    <q-input
    min="0"
     outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
      v-model="bangdong1EditTotalQuantityPrice" label="金額總計" readonly />
  </div>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="取消" color="red" @click="closeEditDialog1editDialog1" />
          <q-btn label="儲存" color="primary" @click="saveEditDialog1editDialog1" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { apiAuth } from 'src/boot/axios'

const bangdong1Mains = reactive([])
const bangdong1MainName = ref('')
const bangdong1Drinks = reactive([])
const bangdong1DrinkName = ref('')
const bangdong1SideDishes = reactive([])
const bangdong1SideDishName = ref('')
const bangdong1Name = ref('')
const price = ref(0)
const tableRows = reactive([])
const editDialog1 = ref(false)
// 抓取招牌便當主餐形成input
const loadBangdong1 = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1001')
    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdong1Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.short_name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdong1Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        quantity: 0
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdong1SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // 監聽主餐的數量變化
    bangdong1Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          bangdong1SideDishes.forEach(sideDish => {
            const diff = Number(newVal) - Number(oldVal)
            if (main.name === '全潤' || main.name === '蛋潤') {
              if (sideDish.name === '炸菇' || sideDish.name === '炸地瓜' || sideDish.name === '水果' || sideDish.name === '蛋塔') {
                if (newVal === 0) {
                  sideDish.quantity = 0
                } else {
                  sideDish.quantity = Number(sideDish.quantity) + diff
                }
              }
            } else if (sideDish.is_default) {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          })
        }
      })
    })

    bangdong1Name.value = response.data.name
    bangdong1MainName.value = mainMeal.name
    bangdong1DrinkName.value = Drink.name
    bangdong1SideDishName.value = sideDish.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

loadBangdong1()

// 計算總數量
const bangdong1TotalQuantity = computed(() => {
  return bangdong1Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})
// 商品單價
const bangdong1Price = computed(() => {
  return price.value
})

// 計算總價格
const bangdong1TotalQuantityPrice = computed(() => {
  return bangdong1TotalQuantity.value * price.value
})
// 將資料推進tableRows
const submitBangdong1 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 1,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    sideDishDefault: '',
    price: bangdong1TotalQuantityPrice.value,
    inputs: [],
    productInputs: [],
    priceInputs: [],
    productTypeInputs: []
  }

  const totalQuantity = bangdong1TotalQuantity.value

  for (const bangdong1Main of bangdong1Mains) {
    if (bangdong1Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ', '
      }
      row.name = bangdong1Name.value + totalQuantity + '份'
      const productInput = {
        name: bangdong1Name.value,
        value: parseInt(totalQuantity)
      }
      row.productInputs.push(productInput)
      row.Main += bangdong1Main.name + '' + parseInt(bangdong1Main.quantity).toString()

      const input = {
        name: bangdong1Main.name,
        value: parseInt(bangdong1Main.quantity)
      }
      row.inputs.push(input)
      bangdong1Main.quantity = 0
    }
  }
  for (const bangdong1Drink of bangdong1Drinks) {
    if (bangdong1Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ', '
      }
      row.drinks += bangdong1Drink.name + '' + parseInt(bangdong1Drink.quantity).toString()

      const input = {
        name: bangdong1Drink.name,
        value: parseInt(bangdong1Drink.quantity)
      }
      row.inputs.push(input)
      bangdong1Drink.quantity = 0
    }
  }

  for (const bangdong1SideDish of bangdong1SideDishes) {
    if (bangdong1SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += bangdong1SideDish.name + '' + parseInt(bangdong1SideDish.quantity).toString()
      row.sideDishDefault += bangdong1SideDish.is_default + ' '

      const input = {
        name: bangdong1SideDish.name,
        value: parseInt(bangdong1SideDish.quantity),
        is_default: bangdong1SideDish.is_default
      }
      row.inputs.push(input)
      bangdong1SideDish.quantity = 0
    }
  }

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
// editDialog1導入欄位
const bangdong1EditMains = reactive([])
const bangdong1EditDrinks = reactive([])
const bangdong1EditSideDishes = reactive([])
const bangdong1EditBentoMains = reactive([])
const loadBangdong1Edit = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1001')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdong1EditMain = {
        id: value.id,
        name: value.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong1EditMains.push(bangdong1EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdong1EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong1EditDrinks.push(bangdong1EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdong1EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default
      }
      bangdong1EditSideDishes.push(bangdong1EditSideDish)
    }
    // 修改修改欄位配菜跟著變

    bangdong1MainName.value = mainMeal.name
    bangdong1DrinkName.value = Drink.name
    bangdong1SideDishName.value = sideDish.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

loadBangdong1Edit()

// 將table資料拆解放回修正欄位

let editingRow = null

function editRowDialog (row) {
  // 招牌便當主餐歸零
  for (const bangdong1EditMain of bangdong1EditMains) {
    bangdong1EditMain.quantity = 0
  }
  // 招牌便當飲料歸零
  for (const bangdong1EditDrink of bangdong1EditDrinks) {
    bangdong1EditDrink.quantity = 0
  }
  // 招牌便當配菜歸零
  for (const bangdong1EditSideDish of bangdong1EditSideDishes) {
    bangdong1EditSideDish.quantity = 0
  }
  // 招牌便當副主餐歸零
  for (const bangdong1EditBentoMain of bangdong1EditBentoMains) {
    bangdong1EditBentoMain.quantity = 0
  }
  // 招牌便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 招牌便當  主餐  推入input數值
    const mainIndex = bangdong1EditMains.findIndex(
      (bangdong1EditMain) => bangdong1EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdong1EditMains[mainIndex].quantity = parseInt(value)
    }
    // 招牌便當  飲料  推入input數值
    const drinkIndex = bangdong1EditDrinks.findIndex(
      (bangdong1EditDrink) => bangdong1EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdong1EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 招牌便當  配菜  推入input數值
    const sideDishIndex = bangdong1EditSideDishes.findIndex(
      (bangdong1EditSideDish) => bangdong1EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdong1EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 招牌便當  副主餐  推入input數值
    const bentoMainIndex = bangdong1EditBentoMains.findIndex(
      (bangdong1EditBentoMain) => bangdong1EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdong1EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
  }

  editingRow = row
  editDialog1.value = true
}

const bangdong1EditTotalQuantity = computed(() => {
  return bangdong1EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})

// 修改窗商品單價
const bangdong1EditPrice = computed(() => {
  return price.value
})

const bangdong1EditTotalQuantityPrice = computed(() => {
  return bangdong1EditTotalQuantity.value * price.value
})

// 關閉修正欄位
function closeEditDialog1editDialog1 () {
  editDialog1.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog1editDialog1 () {
  const row = {
    bentoType: 1,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    sideDishDefault: '',
    price: bangdong1EditTotalQuantityPrice.value,
    inputs: []
  }

  const totalEditQuantity = bangdong1EditTotalQuantity.value // 計算總數量
  for (const bangdong1EditMain of bangdong1EditMains) {
    if (bangdong1EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += '、'
      }
      row.name = bangdong1Name.value + totalEditQuantity + '份' // 使用總數量
      row.Main += bangdong1EditMain.name + '' + parseInt(bangdong1EditMain.quantity).toString() + ' '
      const input = {
        name: bangdong1EditMain.name,
        value: parseInt(bangdong1EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }

  for (const bangdong1EditDrink of bangdong1EditDrinks) {
    if (bangdong1EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += '、'
      }
      row.drinks += bangdong1EditDrink.name + '' + parseInt(bangdong1EditDrink.quantity).toString() + ' '
      const input = {
        name: bangdong1EditDrink.name,
        value: parseInt(bangdong1EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }

  for (const bangdong1EditSideDish of bangdong1EditSideDishes) {
    if (bangdong1EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += '、'
      }
      row.sideDishes += bangdong1EditSideDish.name + '' + parseInt(bangdong1EditSideDish.quantity).toString() + ' '
      row.sideDishDefault += bangdong1EditSideDish.is_default + ' '
      const input = {
        name: bangdong1EditSideDish.name,
        value: parseInt(bangdong1EditSideDish.quantity),
        is_default: bangdong1EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }

  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog1.value = false
}

</script>
  <style lang="scss" scoped>
  .orderTable{
    td {
    white-space: normal;
  }

  }
  </style>
