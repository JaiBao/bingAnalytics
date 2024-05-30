<template>
  <!-- 主餐 -->
    <div>
  <h5 style="margin: 0; padding: 0;">{{ bangdong4MainName }}</h5>
  <div class="row items-center"
  >
  <q-item  v-for="(bangdong4Main, index) in bangdong4Mains" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
  <q-input
  min="0"
  v-model="bangdong4Main.quantity"
  :label="bangdong4Main.name"
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
    <h5 style="margin: 0; padding: 0;">{{ bangdong4DrinkName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdong4Drink, index) in bangdong4Drinks" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong4Drink.quantity" :label="bangdong4Drink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 副主餐 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong4BentoMainName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdong4BentoMain, index) in bangdong4BentoMains" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong4BentoMain.quantity" :label="bangdong4BentoMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
      </div>
    </div>
  <!-- 配菜 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong4SideDishName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdong4SideDish, index) in bangdong4SideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong4SideDish.quantity" :label="bangdong4SideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 總計 -->
  <div style="width:100%;padding: 0;margin: 0;height: 30px;">
      <h5  style="line-height: 0;">{{bangdong4Name}}</h5>
      </div>
      <div class="row">
  <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong4TotalQuantity"
  label="數量總計"
  readonly
  />
  <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong4Price"
  label="商品單價"
  readonly
  />
  <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong4TotalQuantityPrice"
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
  @click="submitBangdong4"
  />
  <q-btn
  color="red"
  label="取消"
  @click="showbangdong4 = false"
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

  <!-- 滷牛修改dialog -->
  <q-dialog v-model="editDialog4" persistent>
      <q-card>
        <q-card-section>
<!-- 主餐 -->
          <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong4MainName }}</h5>
    <div class="row items-center"></div>
    <q-item v-for="(bangdong4EditMain, index) in bangdong4EditMains" :key="index" class="flex-auto "
      style="margin: 0; padding: 0;">
      <q-input
      min="0" v-model="bangdong4EditMain.quantity" :label="bangdong4EditMain.name" outlined type="number"
        :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
    </q-item>
  </div>

  <!-- 飲料 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong4DrinkName }}</h5>
    <div class="row items-center"></div>
      <q-item v-for="(bangdong4EditDrink, index) in bangdong4EditDrinks" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong4EditDrink.quantity" :label="bangdong4EditDrink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
    <!-- 副主餐 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong4BentoMainName }}</h5>
    <div class="row items-center"></div>
      <q-item v-for="(bangdong4EditBentoMain, index) in bangdong4EditBentoMains" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong4EditBentoMain.quantity" :label="bangdong4EditBentoMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  <!-- 配菜 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong4SideDishName }}</h5>
    <div class="row items-center"></div>
      <q-item v-for="(bangdong4EditSideDish, index) in bangdong4EditSideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0" v-model="bangdong4EditSideDish.quantity" :label="bangdong4EditSideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  <div style="width:100%;padding: 0;margin: 0;height: 30px;">
    <h5 style="line-height: 0;">{{bangdong4Name}}</h5>
  </div>
  <div class="row">
    <q-input
    min="0" outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
      v-model="bangdong4EditTotalQuantity" label="數量總計" readonly />
      <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong4EditPrice"
  label="商品單價"
  readonly
  />
    <q-input
    min="0" outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
      v-model="bangdong4EditTotalQuantityPrice" label="金額總計" readonly />
  </div>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="取消" color="red" @click="closeEditDialog4" />
          <q-btn label="儲存" color="primary" @click="saveEditDialog4" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { apiAuth } from 'src/boot/axios'

const bangdong4Mains = reactive([])
const bangdong4MainName = ref('')
const bangdong4Drinks = reactive([])
const bangdong4DrinkName = ref('')
const bangdong4SideDishes = reactive([])
const bangdong4SideDishName = ref('')
const bangdong4BentoMains = reactive([])
const bangdong4BentoMainName = ref('')
const bangdong4Name = ref('')
const price = ref(0)
const tableRows = reactive([])
const editDialog4 = ref(false)
// 抓取招牌便當主餐形成input
const loadBangdong4 = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1004')
    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdong4Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.short_name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdong4Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        quantity: 0
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdong4SideDishes.push({
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
      bangdong4BentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.short_name,
        quantity: 0
      })
    }
    // 監聽主餐的數量變化
    bangdong4Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          bangdong4SideDishes.forEach(sideDish => {
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
          bangdong4BentoMains.forEach(bentoMain => {
            const diff = Number(newVal) - Number(oldVal)
            const newQuantity = Number(bentoMain.quantity) + diff

            // 确保副主餐数量不会变为负数
            bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
          })
        }
      })
    })
    bangdong4Name.value = response.data.name
    bangdong4MainName.value = mainMeal.name
    bangdong4DrinkName.value = Drink.name
    bangdong4SideDishName.value = sideDish.name
    bangdong4BentoMainName.value = bentoMain.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

loadBangdong4()

// 計算總數量
const bangdong4TotalQuantity = computed(() => {
  return bangdong4Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})
// 商品單價
const bangdong4Price = computed(() => {
  return price.value
})

// 計算總價格
const bangdong4TotalQuantityPrice = computed(() => {
  return bangdong4TotalQuantity.value * price.value
})
// 將資料推進tableRows
const submitBangdong4 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 4,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong4TotalQuantityPrice.value,
    inputs: []
  }

  const totalQuantity = bangdong4TotalQuantity.value
  // 主餐
  for (const bangdong4Main of bangdong4Mains) {
    if (bangdong4Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }
      row.name = bangdong4Name.value + totalQuantity + '份'
      row.Main += bangdong4Main.name + '' + parseInt(bangdong4Main.quantity).toString() + ' '

      const input = {
        name: bangdong4Main.name,
        value: parseInt(bangdong4Main.quantity)
      }
      console.log(parseInt(bangdong4Main.quantity).toString())
      row.inputs.push(input)
      bangdong4Main.quantity = 0
    }
  }
  // 飲料
  for (const bangdong4Drink of bangdong4Drinks) {
    if (bangdong4Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong4Drink.name + '' + parseInt(bangdong4Drink.quantity).toString() + ' '
      const input = {
        name: bangdong4Drink.name,
        value: parseInt(bangdong4Drink.quantity)
      }
      row.inputs.push(input)
      bangdong4Drink.quantity = 0
    }
  }
  // 配菜
  for (const bangdong4SideDish of bangdong4SideDishes) {
    if (bangdong4SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong4SideDish.name + '' + parseInt(bangdong4SideDish.quantity).toString() + ' '
      row.sideDishDefault += bangdong4SideDish.is_default + ' '
      const input = {
        name: bangdong4SideDish.name,
        value: parseInt(bangdong4SideDish.quantity),
        is_default: bangdong4SideDish.is_default
      }
      row.inputs.push(input)
      bangdong4SideDish.quantity = 0
    }
  }
  // 副主餐
  for (const bangdong4BentoMain of bangdong4BentoMains) {
    if (bangdong4BentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdong4BentoMain.name + '' + parseInt(bangdong4BentoMain.quantity).toString() + ' '

      const input = {
        name: bangdong4BentoMain.name,
        value: parseInt(bangdong4BentoMain.quantity)
      }
      row.inputs.push(input)
      bangdong4BentoMain.quantity = 0
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
// editDialog4導入欄位
const bangdong4EditMains = reactive([])
const bangdong4EditDrinks = reactive([])
const bangdong4EditSideDishes = reactive([])
const bangdong4EditBentoMains = reactive([])
const loadBangdong4Edit = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1004')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdong4EditMain = {
        id: value.id,
        name: value.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong4EditMains.push(bangdong4EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdong4EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong4EditDrinks.push(bangdong4EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdong4EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default
      }
      bangdong4EditSideDishes.push(bangdong4EditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdong4EditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong4EditBentoMains.push(bangdong4EditBentoMain)
      console.log(bangdong4EditBentoMain)
    }
    // // 監聽主餐的數量變化
    // bangdong4EditMains.forEach(main => {
    //   watch(() => main.quantity, (newVal, oldVal) => {
    //     if (newVal !== oldVal) {
    //       // 配菜的數量跟著主餐的數量變化
    //       bangdong4EditSideDishes.forEach(sideDish => {
    //         const diff = Number(newVal) - Number(oldVal)
    //         if (main.name === '全潤' || main.name === '蛋潤') {
    //           if (sideDish.name === '炸菇' || sideDish.name === '炸地瓜' || sideDish.name === '水果' || sideDish.name === '蛋塔') {
    //             if (newVal === 0) {
    //               sideDish.quantity = 0
    //             } else {
    //               sideDish.quantity = Number(sideDish.quantity) + diff
    //             }
    //           }
    //         } else if (sideDish.is_default) {
    //           if (newVal === 0) {
    //             sideDish.quantity = 0
    //           } else {
    //             sideDish.quantity = Number(sideDish.quantity) + diff
    //           }
    //         }
    //       })
    //     }
    //   })
    // })
    bangdong4MainName.value = mainMeal.name
    bangdong4DrinkName.value = Drink.name
    bangdong4SideDishName.value = sideDish.name
    bangdong4BentoMainName.value = bentoMain.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

loadBangdong4Edit()

// 將table資料拆解放回修正欄位

let editingRow = null

function editRowDialog (row) {
  // 雞胸便當主餐歸零
  for (const bangdong4EditMain of bangdong4EditMains) {
    bangdong4EditMain.quantity = 0
  }
  // 雞胸便當飲料歸零
  for (const bangdong4EditDrink of bangdong4EditDrinks) {
    bangdong4EditDrink.quantity = 0
  }
  // 雞胸便當配菜歸零
  for (const bangdong4EditSideDish of bangdong4EditSideDishes) {
    bangdong4EditSideDish.quantity = 0
  }
  // 雞胸便當副主餐歸零
  for (const bangdong4EditBentoMain of bangdong4EditBentoMains) {
    bangdong4EditBentoMain.quantity = 0
  }
  // 雞胸便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 雞胸便當  主餐  推入input數值
    const mainIndex = bangdong4EditMains.findIndex(
      (bangdong4EditMain) => bangdong4EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdong4EditMains[mainIndex].quantity = parseInt(value)
    }
    // 雞胸便當  飲料  推入input數值
    const drinkIndex = bangdong4EditDrinks.findIndex(
      (bangdong4EditDrink) => bangdong4EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdong4EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 雞胸便當  配菜  推入input數值
    const sideDishIndex = bangdong4EditSideDishes.findIndex(
      (bangdong4EditSideDish) => bangdong4EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdong4EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 雞胸便當  副主餐  推入input數值
    const bentoMainIndex = bangdong4EditBentoMains.findIndex(
      (bangdong4EditBentoMain) => bangdong4EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdong4EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
  }

  editingRow = row
  editDialog4.value = true
}

const bangdong4EditTotalQuantity = computed(() => {
  return bangdong4EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})

const bangdong4EditPrice = computed(() => {
  return price.value
})

const bangdong4EditTotalQuantityPrice = computed(() => {
  return bangdong4EditTotalQuantity.value * price.value
})

// 關閉修正欄位
function closeEditDialog4 () {
  editDialog4.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog4 () {
  const row = {
    bentoType: 4,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong4EditTotalQuantityPrice.value,
    inputs: []
  }

  const totalEditQuantity = bangdong4EditTotalQuantity.value // 計算總數量

  // 儲存推入主餐置入table
  for (const bangdong4EditMain of bangdong4EditMains) {
    if (bangdong4EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }
      row.name = bangdong4Name.value + totalEditQuantity + '份' // 使用總數量
      row.Main += bangdong4EditMain.name + '' + parseInt(bangdong4EditMain.quantity).toString() + ' '
      const input = {
        name: bangdong4EditMain.name,
        value: parseInt(bangdong4EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入飲料置入table
  for (const bangdong4EditDrink of bangdong4EditDrinks) {
    if (bangdong4EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong4EditDrink.name + '' + parseInt(bangdong4EditDrink.quantity).toString() + ' '
      const input = {
        name: bangdong4EditDrink.name,
        value: parseInt(bangdong4EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入配菜置入table
  for (const bangdong4EditSideDish of bangdong4EditSideDishes) {
    if (bangdong4EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong4EditSideDish.name + '' + parseInt(bangdong4EditSideDish.quantity).toString() + ' '
      row.sideDishDefault += bangdong4EditSideDish.is_default + ' '
      const input = {
        name: bangdong4EditSideDish.name,
        value: parseInt(bangdong4EditSideDish.quantity),
        is_default: bangdong4EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入副主餐置入table
  for (const bangdong4EditBentoMain of bangdong4EditBentoMains) {
    if (bangdong4EditBentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdong4EditBentoMain.name + '' + parseInt(bangdong4EditBentoMain.quantity).toString() + ' '
      const input = {
        name: bangdong4EditBentoMain.name,
        value: parseInt(bangdong4EditBentoMain.quantity)
      }
      row.inputs.push(input)
    }
  }

  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog4.value = false
}

</script>
  <style lang="scss" scoped>
  .orderTable{
    td {
    white-space: normal;
  }

  }
  </style>
