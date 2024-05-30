<template>
  <!-- 主餐 -->
    <div>
  <h5 style="margin: 0; padding: 0;">{{ bangdong2MainName }}</h5>
  <div class="row items-center"
  >
  <q-item  v-for="(bangdong2Main, index) in bangdong2Mains" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
  <q-input
  min="0"
  v-model="bangdong2Main.quantity"
  :label="bangdong2Main.name"
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
    <h5 style="margin: 0; padding: 0;">{{ bangdong2DrinkName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdong2Drink, index) in bangdong2Drinks" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong2Drink.quantity" :label="bangdong2Drink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 副主餐 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong2BentoMainName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdong2BentoMain, index) in bangdong2BentoMains" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong2BentoMain.quantity" :label="bangdong2BentoMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
      </div>
    </div>
  <!-- 配菜 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong2SideDishName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdong2SideDish, index) in bangdong2SideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong2SideDish.quantity" :label="bangdong2SideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 總計 -->
  <div style="width:100%;padding: 0;margin: 0;height: 30px;">
      <h5  style="line-height: 0;">{{bangdong2Name}}</h5>
      </div>
      <div class="row">
  <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong2TotalQuantity"
  label="數量總計"
  readonly
  />
  <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong2TotalQuantityPrice"
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
  @click="submitBangdong2"
  />
  <q-btn
  color="red"
  label="取消"
  @click="showbangdong2 = false"
  class="q-mt-md"
  />

  </div >
  <!-- 訂單區 -->
  <q-table :rows="tableRows" class="orderTable">
    <template #header>
      <q-tr>
        <q-th style="font-size:20px">ID</q-th>
        <q-th style="font-size:20px">商品</q-th>
        <q-th style="font-size:20px">主餐搭配</q-th>
        <q-th style="font-size:20px">飲料</q-th>
        <!-- <q-th style="font-size:20px">配菜</q-th> -->
        <q-th style="font-size:20px">副主餐</q-th>
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
        <!-- <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.sideDishes }}</q-td> -->
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.bentoMains }}</q-td>
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
          @click="editRowDialog(props.row)"/>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <!-- 雞腿便當修改dialog -->
  <q-dialog v-model="editDialog2" persistent>
      <q-card>
        <q-card-section>
<!-- 主餐 -->
          <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong2MainName }}</h5>
    <div class="row items-center"></div>
    <q-item v-for="(bangdong2EditMain, index) in bangdong2EditMains" :key="index" class="flex-auto "
      style="margin: 0; padding: 0;">
      <q-input
      min="0" v-model="bangdong2EditMain.quantity" :label="bangdong2EditMain.name" outlined type="number"
        :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
    </q-item>
  </div>

  <!-- 飲料 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong2DrinkName }}</h5>
    <div class="row items-center"></div>
      <q-item v-for="(bangdong2EditDrink, index) in bangdong2EditDrinks" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong2EditDrink.quantity" :label="bangdong2EditDrink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
    <!-- 副主餐 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong2BentoMainName }}</h5>
    <div class="row items-center"></div>
      <q-item v-for="(bangdong2EditBentoMain, index) in bangdong2EditBentoMains" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong2EditBentoMain.quantity" :label="bangdong2EditBentoMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  <!-- 配菜 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong2SideDishName }}</h5>
    <div class="row items-center"></div>
      <q-item v-for="(bangdong2EditSideDish, index) in bangdong2EditSideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong2EditSideDish.quantity" :label="bangdong2EditSideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  <div style="width:100%;padding: 0;margin: 0;height: 30px;">
    <h5 style="line-height: 0;">{{bangdong2Name}}</h5>
  </div>
  <div class="row">
    <q-input
    min="0" outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
      v-model="bangdong2EditTotalQuantity" label="數量總計" readonly />
    <q-input
    min="0" outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
      v-model="bangdong2EditTotalQuantityPrice" label="金額總計" readonly />
  </div>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="取消" color="red" @click="closeEditDialog2" />
          <q-btn label="儲存" color="primary" @click="saveEditDialog2" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { apiAuth } from 'src/boot/axios'

const bangdong2Mains = reactive([])
const bangdong2MainName = ref('')
const bangdong2Drinks = reactive([])
const bangdong2DrinkName = ref('')
const bangdong2SideDishes = reactive([])
const bangdong2SideDishName = ref('')
const bangdong2BentoMains = reactive([])
const bangdong2BentoMainName = ref('')
const bangdong2Name = ref('')
const price = ref(0)
const tableRows = reactive([])
const editDialog2 = ref(false)
// 抓取招牌便當主餐形成input
const loadBangdong2 = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1002')
    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdong2Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.short_name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdong2Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        quantity: 0
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdong2SideDishes.push({
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
      bangdong2BentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.short_name,
        quantity: 0
      })
    }
    // 監聽主餐的數量變化
    bangdong2Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          bangdong2SideDishes.forEach(sideDish => {
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
          // 副主餐的數量跟著主餐的數量變化
          bangdong2BentoMains.forEach(bentoMain => {
            const diff = Number(newVal) - Number(oldVal)
            const newQuantity = Number(bentoMain.quantity) + diff

            // 确保副主餐数量不会变为负数
            bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
          })
        }
      })
    })

    bangdong2Name.value = response.data.name
    bangdong2MainName.value = mainMeal.name
    bangdong2DrinkName.value = Drink.name
    bangdong2SideDishName.value = sideDish.name
    bangdong2BentoMainName.value = bentoMain.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

loadBangdong2()

// 計算總數量
const bangdong2TotalQuantity = computed(() => {
  return bangdong2Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})

// 計算總價格
const bangdong2TotalQuantityPrice = computed(() => {
  return bangdong2TotalQuantity.value * price.value
})
// 將資料推進tableRows
const submitBangdong2 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 2,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong2TotalQuantityPrice.value,
    inputs: []
  }

  const totalQuantity = bangdong2TotalQuantity.value
  // 主餐
  for (const bangdong2Main of bangdong2Mains) {
    if (bangdong2Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }
      row.name = bangdong2Name.value + totalQuantity + '份'
      row.Main += bangdong2Main.name + '' + parseInt(bangdong2Main.quantity).toString() + ' '

      const input = {
        name: bangdong2Main.name,
        value: parseInt(bangdong2Main.quantity)
      }
      console.log(parseInt(bangdong2Main.quantity).toString())
      row.inputs.push(input)
      bangdong2Main.quantity = 0
    }
  }
  // 飲料
  for (const bangdong2Drink of bangdong2Drinks) {
    if (bangdong2Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong2Drink.name + '' + parseInt(bangdong2Drink.quantity).toString() + ' '
      const input = {
        name: bangdong2Drink.name,
        value: parseInt(bangdong2Drink.quantity)
      }
      row.inputs.push(input)
      bangdong2Drink.quantity = 0
    }
  }
  // 配菜
  for (const bangdong2SideDish of bangdong2SideDishes) {
    if (bangdong2SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong2SideDish.name + '' + parseInt(bangdong2SideDish.quantity).toString() + ' '
      row.sideDishDefault += bangdong2SideDish.is_default + ' '
      const input = {
        name: bangdong2SideDish.name,
        value: parseInt(bangdong2SideDish.quantity),
        is_default: bangdong2SideDish.is_default
      }
      row.inputs.push(input)
      bangdong2SideDish.quantity = 0
    }
  }
  // 副主餐
  for (const bangdong2BentoMain of bangdong2BentoMains) {
    if (bangdong2BentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdong2BentoMain.name + '' + parseInt(bangdong2BentoMain.quantity).toString() + ' '

      const input = {
        name: bangdong2BentoMain.name,
        value: parseInt(bangdong2BentoMain.quantity)
      }
      row.inputs.push(input)
      bangdong2BentoMain.quantity = 0
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
// editDialog2導入欄位
const bangdong2EditMains = reactive([])
const bangdong2EditDrinks = reactive([])
const bangdong2EditSideDishes = reactive([])
const bangdong2EditBentoMains = reactive([])
const loadBangdong2Edit = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1002')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdong2EditMain = {
        id: value.id,
        name: value.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong2EditMains.push(bangdong2EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdong2EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong2EditDrinks.push(bangdong2EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdong2EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default
      }
      bangdong2EditSideDishes.push(bangdong2EditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdong2EditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong2EditBentoMains.push(bangdong2EditBentoMain)
      console.log(bangdong2EditBentoMain)
    }
    bangdong2MainName.value = mainMeal.name
    bangdong2DrinkName.value = Drink.name
    bangdong2SideDishName.value = sideDish.name
    bangdong2BentoMainName.value = bentoMain.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

loadBangdong2Edit()

// 將table資料拆解放回修正欄位

let editingRow = null

function editRowDialog (row) {
  // 雞胸便當主餐歸零
  for (const bangdong2EditMain of bangdong2EditMains) {
    bangdong2EditMain.quantity = 0
  }
  // 雞胸便當飲料歸零
  for (const bangdong2EditDrink of bangdong2EditDrinks) {
    bangdong2EditDrink.quantity = 0
  }
  // 雞胸便當配菜歸零
  for (const bangdong2EditSideDish of bangdong2EditSideDishes) {
    bangdong2EditSideDish.quantity = 0
  }
  // 雞胸便當副主餐歸零
  for (const bangdong2EditBentoMain of bangdong2EditBentoMains) {
    bangdong2EditBentoMain.quantity = 0
  }
  // 雞胸便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 雞胸便當  主餐  推入input數值
    const mainIndex = bangdong2EditMains.findIndex(
      (bangdong2EditMain) => bangdong2EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdong2EditMains[mainIndex].quantity = parseInt(value)
    }
    // 雞胸便當  飲料  推入input數值
    const drinkIndex = bangdong2EditDrinks.findIndex(
      (bangdong2EditDrink) => bangdong2EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdong2EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 雞胸便當  配菜  推入input數值
    const sideDishIndex = bangdong2EditSideDishes.findIndex(
      (bangdong2EditSideDish) => bangdong2EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdong2EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 雞胸便當  副主餐  推入input數值
    const bentoMainIndex = bangdong2EditBentoMains.findIndex(
      (bangdong2EditBentoMain) => bangdong2EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdong2EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
  }

  editingRow = row
  editDialog2.value = true
}

const bangdong2EditTotalQuantity = computed(() => {
  return bangdong2EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})

const bangdong2EditTotalQuantityPrice = computed(() => {
  return bangdong2EditTotalQuantity.value * price.value
})

// 關閉修正欄位
function closeEditDialog2 () {
  editDialog2.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog2 () {
  const row = {
    bentoType: 2,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong2EditTotalQuantityPrice.value,
    inputs: []
  }

  const totalEditQuantity = bangdong2EditTotalQuantity.value // 計算總數量

  // 儲存推入主餐置入table
  for (const bangdong2EditMain of bangdong2EditMains) {
    if (bangdong2EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }
      row.name = bangdong2Name.value + totalEditQuantity + '份' // 使用總數量
      row.Main += bangdong2EditMain.name + '' + parseInt(bangdong2EditMain.quantity).toString() + ' '
      const input = {
        name: bangdong2EditMain.name,
        value: parseInt(bangdong2EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入飲料置入table
  for (const bangdong2EditDrink of bangdong2EditDrinks) {
    if (bangdong2EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong2EditDrink.name + '' + parseInt(bangdong2EditDrink.quantity).toString() + ' '
      const input = {
        name: bangdong2EditDrink.name,
        value: parseInt(bangdong2EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入配菜置入table
  for (const bangdong2EditSideDish of bangdong2EditSideDishes) {
    if (bangdong2EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong2EditSideDish.name + '' + parseInt(bangdong2EditSideDish.quantity).toString() + ' '
      row.sideDishDefault += bangdong2EditSideDish.is_default + ' '
      const input = {
        name: bangdong2EditSideDish.name,
        value: parseInt(bangdong2EditSideDish.quantity),
        is_default: bangdong2EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入副主餐置入table
  for (const bangdong2EditBentoMain of bangdong2EditBentoMains) {
    if (bangdong2EditBentoMain.quantity > 0) {
      row.bentoMains += bangdong2EditBentoMain.name + '' + parseInt(bangdong2EditBentoMain.quantity).toString() + ' '
      const input = {
        name: bangdong2EditBentoMain.name,
        value: parseInt(bangdong2EditBentoMain.quantity)
      }
      row.inputs.push(input)
    }
  }

  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog2.value = false
}

</script>
  <style lang="scss" scoped>
  .orderTable{
    td {
    white-space: normal;
  }

  }
  </style>
