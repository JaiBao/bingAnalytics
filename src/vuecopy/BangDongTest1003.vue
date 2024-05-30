<template>
  <!-- 主餐 -->
    <div>
  <h5 style="margin: 0; padding: 0;">{{ bangdong3MainName }}</h5>
  <div class="row items-center"
  >
  <q-item  v-for="(bangdong3Main, index) in bangdong3Mains" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
  <q-input
  min="0"

  v-model="bangdong3Main.quantity"
  :label="bangdong3Main.name"
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
    <h5 style="margin: 0; padding: 0;">{{ bangdong3DrinkName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdong3Drink, index) in bangdong3Drinks" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdong3Drink.quantity" :label="bangdong3Drink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 副主餐 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong3BentoMainName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdong3BentoMain, index) in bangdong3BentoMains" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdong3BentoMain.quantity" :label="bangdong3BentoMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
      </div>
    </div>
  <!-- 配菜 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong3SideDishName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdong3SideDish, index) in bangdong3SideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdong3SideDish.quantity" :label="bangdong3SideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 總計 -->
  <div style="width:100%;padding: 0;margin: 0;height: 30px;">
      <h5  style="line-height: 0;">{{bangdong3Name}}</h5>
      </div>
      <div class="row">
  <q-input
  min="0"

  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong3TotalQuantity"
  label="數量總計"
  readonly
  />
  <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong3Price"
  label="商品單價"
  readonly
  />
  <q-input
  min="0"

  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong3TotalQuantityPrice"
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
  @click="submitBangdong3"
  />
  <q-btn
  color="red"
  label="取消"
  @click="showbangdong3 = false"
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
          @click="editBangdong3(props.row)"/>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <!-- 雞胸便當修改dialog -->
  <q-dialog v-model="editDialog3" persistent>
      <q-card>
        <q-card-section>
<!-- 主餐 -->
          <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong3MainName }}</h5>
    <div class="row items-center"></div>
    <q-item v-for="(bangdong3EditMain, index) in bangdong3EditMains" :key="index" class="flex-auto "
      style="margin: 0; padding: 0;">
      <q-input
      min="0"
       v-model="bangdong3EditMain.quantity" :label="bangdong3EditMain.name" outlined type="number"
        :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
    </q-item>
  </div>

  <!-- 飲料 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong3DrinkName }}</h5>
    <div class="row items-center"></div>
      <q-item v-for="(bangdong3EditDrink, index) in bangdong3EditDrinks" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdong3EditDrink.quantity" :label="bangdong3EditDrink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
    <!-- 副主餐 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong3BentoMainName }}</h5>
    <div class="row items-center"></div>
      <q-item v-for="(bangdong3EditBentoMain, index) in bangdong3EditBentoMains" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdong3EditBentoMain.quantity" :label="bangdong3EditBentoMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  <!-- 配菜 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdong3SideDishName }}</h5>
    <div class="row items-center"></div>
      <q-item v-for="(bangdong3EditSideDish, index) in bangdong3EditSideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdong3EditSideDish.quantity" :label="bangdong3EditSideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  <div style="width:100%;padding: 0;margin: 0;height: 30px;">
    <h5 style="line-height: 0;">{{bangdong3Name}}</h5>
  </div>
  <div class="row">
    <q-input
    min="0"
     outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
      v-model="bangdong3EditTotalQuantity" label="數量總計" readonly />
      <q-input
  min="0"
  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdong3EditPrice"
  label="商品單價"
  readonly
  />
    <q-input
    min="0"
     outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
      v-model="bangdong3EditTotalQuantityPrice" label="金額總計" readonly />
  </div>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="取消" color="red" @click="closeEditDialog3" />
          <q-btn label="儲存" color="primary" @click="saveEditDialog3" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { apiAuth } from 'src/boot/axios'

const bangdong3Mains = reactive([])
const bangdong3MainName = ref('')
const bangdong3Drinks = reactive([])
const bangdong3DrinkName = ref('')
const bangdong3SideDishes = reactive([])
const bangdong3SideDishName = ref('')
const bangdong3BentoMains = reactive([])
const bangdong3BentoMainName = ref('')
const bangdong3Name = ref('')
const price = ref(0)
const tableRows = reactive([])
const editDialog3 = ref(false)
// 抓取招牌便當主餐形成input
const loadBangdong3 = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1003')
    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdong3Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.short_name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdong3Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        quantity: 0
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdong3SideDishes.push({
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
      bangdong3BentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.short_name,
        quantity: 0
      })
    }
    // 監聽主餐的數量變化
    bangdong3Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          bangdong3SideDishes.forEach(sideDish => {
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
          bangdong3BentoMains.forEach(bentoMain => {
            const diff = Number(newVal) - Number(oldVal)
            const newQuantity = Number(bentoMain.quantity) + diff

            // 确保副主餐数量不会变为负数
            bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
          })
        }
      })
    })
    bangdong3Name.value = response.data.name
    bangdong3MainName.value = mainMeal.name
    bangdong3DrinkName.value = Drink.name
    bangdong3SideDishName.value = sideDish.name
    bangdong3BentoMainName.value = bentoMain.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

loadBangdong3()

// 計算總數量
const bangdong3TotalQuantity = computed(() => {
  return bangdong3Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})
// 商品單價
const bangdong3Price = computed(() => {
  return price.value
})
// 計算總價格
const bangdong3TotalQuantityPrice = computed(() => {
  return bangdong3TotalQuantity.value * price.value
})
// 將資料推進tableRows
const submitBangdong3 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 3,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong3TotalQuantityPrice.value,
    inputs: []
  }

  const totalQuantity = bangdong3TotalQuantity.value
  // 主餐
  for (const bangdong3Main of bangdong3Mains) {
    if (bangdong3Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }
      row.name = bangdong3Name.value + totalQuantity + '份'
      row.Main += bangdong3Main.name + '' + parseInt(bangdong3Main.quantity).toString() + ' '

      const input = {
        name: bangdong3Main.name,
        value: parseInt(bangdong3Main.quantity)
      }
      console.log(parseInt(bangdong3Main.quantity).toString())
      row.inputs.push(input)
      bangdong3Main.quantity = 0
    }
  }
  // 飲料
  for (const bangdong3Drink of bangdong3Drinks) {
    if (bangdong3Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong3Drink.name + '' + parseInt(bangdong3Drink.quantity).toString() + ' '
      const input = {
        name: bangdong3Drink.name,
        value: parseInt(bangdong3Drink.quantity)
      }
      row.inputs.push(input)
      bangdong3Drink.quantity = 0
    }
  }
  // 配菜
  for (const bangdong3SideDish of bangdong3SideDishes) {
    if (bangdong3SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong3SideDish.name + '' + parseInt(bangdong3SideDish.quantity).toString() + ' '
      row.sideDishDefault += bangdong3SideDish.is_default + ' '
      const input = {
        name: bangdong3SideDish.name,
        value: parseInt(bangdong3SideDish.quantity),
        is_default: bangdong3SideDish.is_default
      }
      row.inputs.push(input)
      bangdong3SideDish.quantity = 0
    }
  }
  // 副主餐
  for (const bangdong3BentoMain of bangdong3BentoMains) {
    if (bangdong3BentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdong3BentoMain.name + '' + parseInt(bangdong3BentoMain.quantity).toString() + ' '

      const input = {
        name: bangdong3BentoMain.name,
        value: parseInt(bangdong3BentoMain.quantity)
      }
      row.inputs.push(input)
      bangdong3BentoMain.quantity = 0
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
// editDialog3導入欄位
const bangdong3EditMains = reactive([])
const bangdong3EditDrinks = reactive([])
const bangdong3EditSideDishes = reactive([])
const bangdong3EditBentoMains = reactive([])
const loadBangdong3Edit = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1003')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdong3EditMain = {
        id: value.id,
        name: value.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong3EditMains.push(bangdong3EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdong3EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong3EditDrinks.push(bangdong3EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdong3EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default
      }
      bangdong3EditSideDishes.push(bangdong3EditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdong3EditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.short_name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong3EditBentoMains.push(bangdong3EditBentoMain)
      console.log(bangdong3EditBentoMain)
    }
    bangdong3MainName.value = mainMeal.name
    bangdong3DrinkName.value = Drink.name
    bangdong3SideDishName.value = sideDish.name
    bangdong3BentoMainName.value = bentoMain.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

loadBangdong3Edit()

// 將table資料拆解放回修正欄位

let editingRow = null
// const isEditing = ref(false)
let watchers = []
function editBangdong3 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  // 雞胸便當主餐歸零
  for (const bangdong3EditMain of bangdong3EditMains) {
    bangdong3EditMain.quantity = 0
  }
  // 雞胸便當飲料歸零
  for (const bangdong3EditDrink of bangdong3EditDrinks) {
    bangdong3EditDrink.quantity = 0
  }
  // 雞胸便當配菜歸零
  for (const bangdong3EditSideDish of bangdong3EditSideDishes) {
    bangdong3EditSideDish.quantity = 0
  }
  // 雞胸便當副主餐歸零
  for (const bangdong3EditBentoMain of bangdong3EditBentoMains) {
    bangdong3EditBentoMain.quantity = 0
  }
  // 雞胸便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 雞胸便當  主餐  推入input數值
    const mainIndex = bangdong3EditMains.findIndex(
      (bangdong3EditMain) => bangdong3EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdong3EditMains[mainIndex].quantity = parseInt(value)
    }
    // 雞胸便當  飲料  推入input數值
    const drinkIndex = bangdong3EditDrinks.findIndex(
      (bangdong3EditDrink) => bangdong3EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdong3EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 雞胸便當  配菜  推入input數值
    const sideDishIndex = bangdong3EditSideDishes.findIndex(
      (bangdong3EditSideDish) => bangdong3EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdong3EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 雞胸便當  副主餐  推入input數值
    const bentoMainIndex = bangdong3EditBentoMains.findIndex(
      (bangdong3EditBentoMain) => bangdong3EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdong3EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
    // isEditing.value = true
  }
  // 監聽主餐的數量變化
  bangdong3EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        bangdong3EditSideDishes.forEach(sideDish => {
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
        bangdong3EditBentoMains.forEach(bentoMain => {
          const diff = Number(newVal) - Number(oldVal)
          const newQuantity = Number(bentoMain.quantity) + diff

          // 確保副主餐數量不會變成負數
          bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
        })
      }
    })
    // Store unwatch reference
    watchers.push(unwatch)
  })

  editingRow = row
  editDialog3.value = true
}

const bangdong3EditTotalQuantity = computed(() => {
  return bangdong3EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})
// 修改窗商品單價
const bangdong3EditPrice = computed(() => {
  return price.value
})

const bangdong3EditTotalQuantityPrice = computed(() => {
  return bangdong3EditTotalQuantity.value * price.value
})

// 關閉修正欄位
function closeEditDialog3 () {
  editDialog3.value = false
  // isEditing.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog3 () {
  const row = {
    bentoType: 3,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong3EditTotalQuantityPrice.value,
    inputs: []
  }

  const totalEditQuantity = bangdong3EditTotalQuantity.value // 計算總數量

  // 儲存推入主餐置入table
  for (const bangdong3EditMain of bangdong3EditMains) {
    if (bangdong3EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }
      row.name = bangdong3Name.value + totalEditQuantity + '份' // 使用總數量
      row.Main += bangdong3EditMain.name + '' + parseInt(bangdong3EditMain.quantity).toString() + ' '
      const input = {
        name: bangdong3EditMain.name,
        value: parseInt(bangdong3EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入飲料置入table
  for (const bangdong3EditDrink of bangdong3EditDrinks) {
    if (bangdong3EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong3EditDrink.name + '' + parseInt(bangdong3EditDrink.quantity).toString() + ' '
      const input = {
        name: bangdong3EditDrink.name,
        value: parseInt(bangdong3EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入配菜置入table
  for (const bangdong3EditSideDish of bangdong3EditSideDishes) {
    if (bangdong3EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong3EditSideDish.name + '' + parseInt(bangdong3EditSideDish.quantity).toString() + ' '
      row.sideDishDefault += bangdong3EditSideDish.is_default + ' '
      const input = {
        name: bangdong3EditSideDish.name,
        value: parseInt(bangdong3EditSideDish.quantity),
        is_default: bangdong3EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入副主餐置入table
  for (const bangdong3EditBentoMain of bangdong3EditBentoMains) {
    if (bangdong3EditBentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdong3EditBentoMain.name + '' + parseInt(bangdong3EditBentoMain.quantity).toString() + ' '
      const input = {
        name: bangdong3EditBentoMain.name,
        value: parseInt(bangdong3EditBentoMain.quantity)
      }
      row.inputs.push(input)
    }
  }

  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog3.value = false
  // isEditing.value = false
}

</script>
  <style lang="scss" scoped>
  .orderTable{
    td {
    white-space: normal;
  }

  }
  </style>
