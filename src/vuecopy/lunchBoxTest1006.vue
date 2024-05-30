<template>
  <!-- 主餐 -->
  <q-card>
    <div class="q-gutter-xs row items-start justify-center" id="lunchbox2">
      <div v-for="(lunchBox2Main, index) in lunchBox2Mains" :key="index">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox2Main.name }}</h5>
        <q-input
        min="0"
         v-model="lunchBox2Main.quantity" :label="lunchBox2Main.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        <h5 style="margin: 0; padding: 0;">{{ lunchBox2DrinkName }}</h5>
        <div v-for="(lunchBox2Drink, drinkIndex) in lunchBox2Main.drinks" :key="drinkIndex">
          <q-input
          min="0"
           v-model="lunchBox2Drink.quantity" :label="lunchBox2Drink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </div>
      </div>
    </div>
    <!-- 配菜 -->
    <div class="row q-mr-lg q-mb-auto  flex-wrap" style="width: 100%; gap: 16px; margin-top:5px;  margin-left:35px; ">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox2SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(lunchBox2SideDish, index) in lunchBox2SideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0"
           v-model="lunchBox2SideDish.quantity" :label="lunchBox2SideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width: 100%; margin-top:5px;  margin-left:35px; ">
      <h5 style="margin: 0; padding: 0;">{{lunchBox2Name}}</h5>
      <div class="row">
        <q-input
        min="0"
         outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model="lunchBox2TotalQuantity" label="數量總計" readonly />
          <q-input
          min="0"
          outlined
          type="number"
          :input-style="{ fontSize: '20px' }"
          style="width: 130px;"
          v-model="lunchBox2Price"
          label="商品單價"
          readonly
          />
        <q-input
        min="0"
         outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model="lunchBox2TotalQuantityPrice" label="金額總計" readonly />
      </div>
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary"
      label="送出"
      type="submit"
      class="q-mt-md"
      @click="submitLunchbox2"
      />
      <q-btn
      color="red"
      label="取消"
      @click="showLunchBox2 = false"
      class="q-mt-md"
      />
    </div>
  </q-card>

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
            <input type="hidden" :name="input.name" v-model="input.value">
          </div>
        </q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.Main }}</q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.drinks }}</q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.sideDishes }}</q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.price }}</q-td>
        <q-td style="text-align: center">
          <q-btn icon="delete" color="red" fab-mini unelevated size="sm" @click="deleteRow(props.row.id)" />
          <q-btn icon="edit" fab-mini unelevated size="sm" color="info" @click="editRowDialog6(props.row)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <!-- 經濟盒餐修改dialog -->
  <q-dialog v-model="editDialog6">
    <q-card class="q-gutter-md row items-start  word-break " id="customLunchbox">
  <div class="q-gutter-xs row items-start justify-center" id="lunchbox2Edit">
    <div v-for="(lunchBox2EditMain, index) in lunchBox2EditMains" :key="index">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox2EditMain.name }}</h5>
      <q-input
      min="0"
       v-model="lunchBox2EditMain.quantity" :label="lunchBox2EditMain.name" outlined type="number"
        :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      <h5 style="margin: 0; padding: 0;">{{ lunchBox2EditDrinkName }}</h5>
      <div v-for="(lunchBox2EditDrink, drinkIndex) in lunchBox2EditMain.drinks" :key="drinkIndex">
        <q-input
        min="0"
         v-model="lunchBox2EditDrink.quantity" :label="lunchBox2EditDrink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </div>
    </div>
  </div>
  <!-- 配菜 -->
  <div class="row q-mr-lg q-mb-auto  flex-wrap" style="width: 100%; gap: 16px; margin-top:5px;  margin-left:35px; ">
    <h5 style="margin: 0; padding: 0;">{{ lunchBox2EditSideDishName }}</h5>
    <div class="row items-center">
      <q-item v-for="(lunchBox2EditSideDish, index) in lunchBox2EditSideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="lunchBox2EditSideDish.quantity" :label="lunchBox2EditSideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 總計 -->
  <div style="width: 100%; margin-top:5px;  margin-left:35px; ">
    <h5 style="margin: 0; padding: 0;">{{lunchBox2EditName}}</h5>
    <div class="row">
      <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="lunchBox2EditTotalQuantity" label="數量總計" readonly />
        <q-input
          min="0"
          outlined
          type="number"
          :input-style="{ fontSize: '20px' }"
          style="width: 130px;"
          v-model="lunchBox2EditPrice"
          label="商品單價"
          readonly
          />
      <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="lunchBox2EditTotalQuantityPrice" label="金額總計" readonly />
    </div>
  </div>
  <!-- 按鈕 -->
  <div class="row justify-end" style="width: 100%;">
    <q-btn color="primary"
    label="送出"
    type="submit"
    class="q-mt-md"
    @click="saveEditDialog6"
    />
    <q-btn
    color="red"
    label="取消"
    @click="closeEditDialog6"
    class="q-mt-md"
    />
  </div>
</q-card>

  </q-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { apiAuth } from 'src/boot/axios'

const lunchBox2Mains = reactive([])
const tableRows = reactive([])
const lunchBox2SideDishes = reactive([])
const lunchBox2SideDishName = ref('')
const lunchBox2DrinkName = ref('')
const lunchBox2MainName = ref('')
const lunchBox2Name = ref('')
const price = ref(0)

const loadLunchBox2 = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1006')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.short_name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.short_name,
        quantity: 0
      }))

      lunchBox2Mains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox2SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // 監聽主餐的數量變化
    lunchBox2Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          lunchBox2SideDishes.forEach(sideDish => {
            if (sideDish.is_default) {
              const diff = Number(newVal) - Number(oldVal)
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
    lunchBox2Name.value = response.data.name
    lunchBox2MainName.value = mainMeal.name
    lunchBox2DrinkName.value = drink.name
    lunchBox2SideDishName.value = sideDish.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}
loadLunchBox2()
// 計算總數量
const lunchBox2TotalQuantity = computed(() => {
  return lunchBox2Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})
// 商品單價
const lunchBox2Price = computed(() => {
  return price.value
})
// 計算總價格
const lunchBox2TotalQuantityPrice = computed(() => {
  return lunchBox2TotalQuantity.value * price.value
})

const submitLunchbox2 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1
  const row = {
    bentoType: 6,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox2TotalQuantityPrice.value,
    inputs: []
  }
  const totalQuantity = lunchBox2TotalQuantity.value
  for (const option of lunchBox2Mains) {
    if (option.quantity > 0) {
      let Main = `${option.name} x ${option.quantity}`
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += `${drink.name} x ${drink.quantity}`

          // 將帶有數值的input推進inputs
          const input = {
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }
      row.name = lunchBox2Name.value + totalQuantity + '份'
      row.Main += Main

      // 將帶有數值的input推進inputs
      const input = {
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
    }
  }

  // 推進配菜
  for (const sideDish of lunchBox2SideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += `${sideDish.name} x ${sideDish.quantity}`

      // 將帶有數值的input推進inputs
      const input = {
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }

  if (row.Main !== '' || row.sideDishes !== '') {
    // 如果 row.Main 或 row.sideDishes 不是空的，則添加到 tableRows
    tableRows.push(row)
  }
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

// editDialog6導入欄位
const lunchBox2EditMains = reactive([])
const lunchBox2EditSideDishes = reactive([])
const lunchBox2EditSideDishName = ref('')
const lunchBox2EditDrinkName = ref('')
const lunchBox2EditMainName = ref('')
const lunchBox2EditName = ref('')

const loadLunchBox2Edit = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1006')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.short_name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.short_name,
        quantity: 0
      }))

      lunchBox2EditMains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox2EditSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // // 監聽主餐的數量變化
    // lunchBox2EditMains.forEach(main => {
    //   watch(() => main.quantity, (newVal, oldVal) => {
    //     if (newVal !== oldVal) {
    //       // 配菜的數量跟著主餐的數量變化
    //       lunchBox2EditSideDishes.forEach(sideDish => {
    //         if (sideDish.is_default) {
    //           const diff = Number(newVal) - Number(oldVal)
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
    lunchBox2EditName.value = response.data.name
    lunchBox2EditMainName.value = mainMeal.name
    lunchBox2EditDrinkName.value = drink.name
    lunchBox2EditSideDishName.value = sideDish.name
  } catch (error) {
    console.error(error)
  }
}
loadLunchBox2Edit()

// 將 table 資料拆解放回修正欄位
let editingRow = null

function editRowDialog6 (row) {
  for (const main of lunchBox2EditMains) {
    main.quantity = 0
    for (const drink of main.drinks) {
      drink.quantity = 0
    }
  }

  for (const sideDish of lunchBox2EditSideDishes) {
    sideDish.quantity = 0
  }
  for (const input of row.inputs) {
    const mainId = input.mainId
    const name = input.name
    const value = input.value

    const mainIndex = lunchBox2EditMains.findIndex(
      (lunchBox2EditMain) => lunchBox2EditMain.name === name
    )
    if (mainIndex >= 0) {
      lunchBox2EditMains[mainIndex].quantity = parseInt(value)
    }
    for (const main of lunchBox2EditMains) {
      if (main.id === mainId) {
        if (main.name === name) {
          main.quantity = parseInt(value)
        } else {
          for (const drink of main.drinks) {
            if (drink.name === name) {
              drink.quantity = parseInt(value)
            }
          }
        }
      }
    }

    const sideDishIndex = lunchBox2EditSideDishes.findIndex(sideDish => sideDish.name === name)
    if (sideDishIndex >= 0) {
      lunchBox2EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
  }

  editingRow = row
  editDialog6.value = true
}

const lunchBox2EditTotalQuantity = computed(() => {
  return lunchBox2EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})

const lunchBox2EditPrice = computed(() => {
  return price.value
})
const lunchBox2EditTotalQuantityPrice = computed(() => {
  return lunchBox2EditTotalQuantity.value * price.value
})
const editDialog6 = ref(false)
function closeEditDialog6 () {
  editDialog6.value = false
}

const saveEditDialog6 = () => {
  const row = {
    bentoType: 6,
    id: editingRow.id,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox2EditTotalQuantityPrice.value,
    inputs: []
  }
  const totalEditQuantity = lunchBox2EditTotalQuantity.value // 計算總數量
  for (const option of lunchBox2EditMains) {
    if (option.quantity > 0) {
      let Main = `${option.name} x ${option.quantity}`
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += `${drink.name} x ${drink.quantity}`

          // 將帶有數值的input推進inputs
          const input = {
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }
      row.name = lunchBox2Name.value + totalEditQuantity + '份' // 使用總數量
      row.Main += Main

      // 將帶有數值的input推進inputs
      const input = {
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
    }
  }

  for (const sideDish of lunchBox2EditSideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += `${sideDish.name} x ${sideDish.quantity}`

      // 將帶有數值的input推進inputs
      const input = {
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }

  if (row.Main !== '' || row.sideDishes !== '') {
    const rowIndex = tableRows.findIndex((item) => item.id === editingRow.id)
    tableRows.splice(rowIndex, 1, row)
  }

  editDialog6.value = false
}

</script>

<style lang="scss" scoped>
.orderTable{
td {
white-space: normal;
}

}
</style>
