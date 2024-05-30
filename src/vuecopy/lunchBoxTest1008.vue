<template>
  <!-- 主餐 -->
  <q-card>
    <div class="q-gutter-xs row items-start justify-center" id="lunchbox4">
      <div v-for="(lunchBox4Main, index) in lunchBox4Mains" :key="index">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox4Main.name }}</h5>
        <q-input
        min="0"
         v-model="lunchBox4Main.quantity" :label="lunchBox4Main.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        <h5 style="margin: 0; padding: 0;">{{ lunchBox4DrinkName }}</h5>
        <div v-for="(lunchBox4Drink, drinkIndex) in lunchBox4Main.drinks" :key="drinkIndex">
          <q-input
          min="0"
           v-model="lunchBox4Drink.quantity" :label="lunchBox4Drink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </div>
      </div>
    </div>
    <!-- 配菜 -->
    <div class="row q-mr-lg q-mb-auto  flex-wrap" style="width: 100%; gap: 16px; margin-top:5px;  margin-left:35px; ">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox4SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(lunchBox4SideDish, index) in lunchBox4SideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0"
           v-model="lunchBox4SideDish.quantity" :label="lunchBox4SideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width: 100%; margin-top:5px;  margin-left:35px; ">
      <h5 style="margin: 0; padding: 0;">{{lunchBox4Name}}</h5>
      <div class="row">
        <q-input
        min="0"
         outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model="lunchBox4TotalQuantity" label="數量總計" readonly />
          <q-input
          min="0"
          outlined
          type="number"
          :input-style="{ fontSize: '20px' }"
          style="width: 130px;"
          v-model="lunchBox4Price"
          label="商品單價"
          readonly
          />
        <q-input
        min="0"
         outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model="lunchBox4TotalQuantityPrice" label="金額總計" readonly />
      </div>
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary"
      label="送出"
      type="submit"
      class="q-mt-md"
      @click="submitLunchbox4"
      />
      <q-btn
      color="red"
      label="取消"
      @click="showLunchBox4 = false"
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
            <input type="value" :name="input.name" v-model="input.value">
          </div>
        </q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.Main }}</q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.drinks }}</q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.sideDishes }}</q-td>
        <q-td style="text-align: center;font-size:20px;max-width:200px">{{ props.row.price }}</q-td>
        <q-td style="text-align: center">
          <q-btn icon="delete" color="red" fab-mini unelevated size="sm" @click="deleteRow(props.row.id)" />
          <q-btn icon="edit" fab-mini unelevated size="sm" color="info" @click="editRowDialog8(props.row)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <!-- 經濟盒餐修改dialog -->
  <q-dialog v-model="editDialog8">
    <q-card class="q-gutter-md row items-start  word-break " id="customLunchbox">
  <div class="q-gutter-xs row items-start justify-center" id="lunchbox4Edit">
    <div v-for="(lunchBox4EditMain, index) in lunchBox4EditMains" :key="index">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox4EditMain.name }}</h5>
      <q-input
      min="0"
       v-model="lunchBox4EditMain.quantity" :label="lunchBox4EditMain.name" outlined type="number"
        :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      <h5 style="margin: 0; padding: 0;">{{ lunchBox4EditDrinkName }}</h5>
      <div v-for="(lunchBox4EditDrink, drinkIndex) in lunchBox4EditMain.drinks" :key="drinkIndex">
        <q-input
        min="0"
         v-model="lunchBox4EditDrink.quantity" :label="lunchBox4EditDrink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </div>
    </div>
  </div>
  <!-- 配菜 -->
  <div class="row q-mr-lg q-mb-auto  flex-wrap" style="width: 100%; gap: 16px; margin-top:5px;  margin-left:35px; ">
    <h5 style="margin: 0; padding: 0;">{{ lunchBox4EditSideDishName }}</h5>
    <div class="row items-center">
      <q-item v-for="(lunchBox4EditSideDish, index) in lunchBox4EditSideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="lunchBox4EditSideDish.quantity" :label="lunchBox4EditSideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 總計 -->
  <div style="width: 100%; margin-top:5px;  margin-left:35px; ">
    <h5 style="margin: 0; padding: 0;">{{lunchBox4EditName}}</h5>
    <div class="row">
      <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="lunchBox4EditTotalQuantity" label="數量總計" readonly />
        <q-input
          min="0"
          outlined
          type="number"
          :input-style="{ fontSize: '20px' }"
          style="width: 130px;"
          v-model="lunchBox4EditPrice"
          label="商品單價"
          readonly
          />
      <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="lunchBox4EditTotalQuantityPrice" label="金額總計" readonly />
    </div>
  </div>
  <!-- 按鈕 -->
  <div class="row justify-end" style="width: 100%;">
    <q-btn color="primary"
    label="送出"
    type="submit"
    class="q-mt-md"
    @click="saveEditDialog8"
    />
    <q-btn
    color="red"
    label="取消"
    @click="closeEditDialog8"
    class="q-mt-md"
    />
  </div>
</q-card>

  </q-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { apiAuth } from 'src/boot/axios'

const lunchBox4Mains = reactive([])
const tableRows = reactive([])
const lunchBox4SideDishes = reactive([])
const lunchBox4SideDishName = ref('')
const lunchBox4DrinkName = ref('')
const lunchBox4MainName = ref('')
const lunchBox4Name = ref('')
const price = ref(0)

const loadLunchBox4 = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1005')
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

      lunchBox4Mains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox4SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // 監聽主餐的數量變化
    lunchBox4Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          lunchBox4SideDishes.forEach(sideDish => {
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
    lunchBox4Name.value = response.data.name
    lunchBox4MainName.value = mainMeal.name
    lunchBox4DrinkName.value = drink.name
    lunchBox4SideDishName.value = sideDish.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}
loadLunchBox4()
// 計算總數量
const lunchBox4TotalQuantity = computed(() => {
  return lunchBox4Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})
// 商品單價
const lunchBox4Price = computed(() => {
  return price.value
})
// 計算總價格
const lunchBox4TotalQuantityPrice = computed(() => {
  return lunchBox4TotalQuantity.value * price.value
})

const submitLunchbox4 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1
  const row = {
    bentoType: 8,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox4TotalQuantityPrice.value,
    inputs: []
  }
  const totalQuantity = lunchBox4TotalQuantity.value
  for (const option of lunchBox4Mains) {
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
      row.name = lunchBox4Name.value + totalQuantity + '份'
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
  for (const sideDish of lunchBox4SideDishes) {
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

// editDialog8導入欄位
const lunchBox4EditMains = reactive([])
const lunchBox4EditSideDishes = reactive([])
const lunchBox4EditSideDishName = ref('')
const lunchBox4EditDrinkName = ref('')
const lunchBox4EditMainName = ref('')
const lunchBox4EditName = ref('')

const loadLunchBox4Edit = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1005')
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

      lunchBox4EditMains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox4EditSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // // 監聽主餐的數量變化
    // lunchBox4EditMains.forEach(main => {
    //   watch(() => main.quantity, (newVal, oldVal) => {
    //     if (newVal !== oldVal) {
    //       // 配菜的數量跟著主餐的數量變化
    //       lunchBox4EditSideDishes.forEach(sideDish => {
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
    lunchBox4EditName.value = response.data.name
    lunchBox4EditMainName.value = mainMeal.name
    lunchBox4EditDrinkName.value = drink.name
    lunchBox4EditSideDishName.value = sideDish.name
  } catch (error) {
    console.error(error)
  }
}
loadLunchBox4Edit()

// 將 table 資料拆解放回修正欄位
let editingRow = null

function editRowDialog8 (row) {
  for (const main of lunchBox4EditMains) {
    main.quantity = 0
    for (const drink of main.drinks) {
      drink.quantity = 0
    }
  }

  for (const sideDish of lunchBox4EditSideDishes) {
    sideDish.quantity = 0
  }
  for (const input of row.inputs) {
    const mainId = input.mainId
    const name = input.name
    const value = input.value

    const mainIndex = lunchBox4EditMains.findIndex(
      (lunchBox4EditMain) => lunchBox4EditMain.name === name
    )
    if (mainIndex >= 0) {
      lunchBox4EditMains[mainIndex].quantity = parseInt(value)
    }
    for (const main of lunchBox4EditMains) {
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

    const sideDishIndex = lunchBox4EditSideDishes.findIndex(sideDish => sideDish.name === name)
    if (sideDishIndex >= 0) {
      lunchBox4EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
  }

  editingRow = row
  editDialog8.value = true
}

const lunchBox4EditTotalQuantity = computed(() => {
  return lunchBox4EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})

const lunchBox4EditPrice = computed(() => {
  return price.value
})

const lunchBox4EditTotalQuantityPrice = computed(() => {
  return lunchBox4EditTotalQuantity.value * price.value
})
const editDialog8 = ref(false)
function closeEditDialog8 () {
  editDialog8.value = false
}

const saveEditDialog8 = () => {
  const row = {
    bentoType: 8,
    id: editingRow.id,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox4EditTotalQuantityPrice.value,
    inputs: []
  }
  const totalEditQuantity = lunchBox4EditTotalQuantity.value // 計算總數量
  for (const option of lunchBox4EditMains) {
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
      row.name = lunchBox4Name.value + totalEditQuantity + '份' // 使用總數量
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

  for (const sideDish of lunchBox4EditSideDishes) {
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

  editDialog8.value = false
}

</script>

<style lang="scss" scoped>
.orderTable{
td {
white-space: normal;
}

}
</style>
