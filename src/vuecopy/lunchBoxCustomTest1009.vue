<template>
  <!-- 主餐 -->
  <q-card>
    <div class="q-gutter-xs row items-start justify-center" id="lunchboxCustom1">
      <div v-for="(lunchBoxCustom1Main, index) in lunchBoxCustom1Mains" :key="index">
        <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1Main.name }}</h5>
        <q-input
        min="0"
         v-model="lunchBoxCustom1Main.quantity" :label="lunchBoxCustom1Main.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1DrinkName }}</h5>
        <div v-for="(lunchBoxCustom1Drink, drinkIndex) in lunchBoxCustom1Main.drinks" :key="drinkIndex">
          <q-input
          min="0"
           v-model="lunchBoxCustom1Drink.quantity" :label="lunchBoxCustom1Drink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </div>
      </div>
    </div>
    <!-- 配菜 -->
    <div class="row q-mr-lg q-mb-auto  flex-wrap" style="width: 100%; gap: 16px; margin-top:5px;  margin-left:35px; ">
      <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(lunchBoxCustom1SideDish, index) in lunchBoxCustom1SideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0"
           v-model="lunchBoxCustom1SideDish.quantity" :label="lunchBoxCustom1SideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width: 100%; margin-top:5px;  margin-left:35px; ">
      <h5 style="margin: 0; padding: 0;">{{lunchBoxCustom1Name}}</h5>
      <div class="row">
        <q-input
        min="0"
         outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model="lunchBoxCustom1TotalQuantity" label="數量總計" readonly />
        <q-input
        min="0"
         outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model="lunchBoxCustom1Price" label="價格"  />
        <q-input
        min="0"
         outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model="lunchBoxCustom1TotalQuantityPrice" label="金額總計" readonly />
      </div>
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary"
      label="送出"
      type="submit"
      class="q-mt-md"
      @click="submitLunchboxCustom1"
      />
      <q-btn
      color="red"
      label="取消"
      @click="showLunchBoxCustom1 = false"
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
          <q-btn icon="edit" fab-mini unelevated size="sm" color="info" @click="editRowDialog0(props.row)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <!-- 客製盒餐修改dialog -->
  <q-dialog v-model="editDialog0" full-width>
    <q-card >
  <div class="q-gutter-xs row items-start justify-center" id="lunchBoxCustom1Edit">
    <div v-for="(lunchBoxCustom1EditMain, index) in lunchBoxCustom1EditMains" :key="index">
      <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1EditMain.name }}</h5>
      <q-input v-model="lunchBoxCustom1EditMain.quantity" :label="lunchBoxCustom1EditMain.name" outlined type="number"
        :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
        min="0"/>
      <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1EditDrinkName }}</h5>
      <div v-for="(lunchBoxCustom1EditDrink, drinkIndex) in lunchBoxCustom1EditMain.drinks" :key="drinkIndex">
        <q-input v-model="lunchBoxCustom1EditDrink.quantity" :label="lunchBoxCustom1EditDrink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
          min="0"/>
      </div>
    </div>
  </div>
  <!-- 配菜 -->
  <div class="row q-mr-lg q-mb-auto  flex-wrap" style="width: 100%; gap: 16px; margin-top:5px;  margin-left:35px; ">
    <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1EditSideDishName }}</h5>
    <div class="row items-center">
      <q-item v-for="(lunchBoxCustom1EditSideDish, index) in lunchBoxCustom1EditSideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input v-model="lunchBoxCustom1EditSideDish.quantity" :label="lunchBoxCustom1EditSideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
          min="0"/>
      </q-item>
    </div>
  </div>
  <!-- 總計 -->
  <div style="width: 100%; margin-top:5px;  margin-left:35px; ">
    <h5 style="margin: 0; padding: 0;">{{lunchBoxCustom1EditName}}</h5>
    <div class="row">
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="lunchBoxCustom1EditTotalQuantity" label="數量總計" readonly
        min="0"/>
        <q-input
    min="0"
     outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
      v-model="lunchBoxCustom1EditPrice" label="價格"  />
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="lunchBoxCustom1EditTotalQuantityPrice" label="金額總計" readonly
        min="0"/>
    </div>
  </div>
  <!-- 按鈕 -->
  <div class="row justify-end" style="width: 100%;">
    <q-btn color="primary"
    label="送出"
    type="submit"
    class="q-mt-md"
    @click="saveEditDialog0"
    />
    <q-btn
    color="red"
    label="取消"
    @click="closeEditDialog0"
    class="q-mt-md"
    />
  </div>
</q-card>

  </q-dialog>

</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { apiAuth } from 'src/boot/axios'

const lunchBoxCustom1Mains = reactive([])
const tableRows = reactive([])
const lunchBoxCustom1SideDishes = reactive([])
const lunchBoxCustom1SideDishName = ref('')
const lunchBoxCustom1DrinkName = ref('')
const lunchBoxCustom1MainName = ref('')
const lunchBoxCustom1Name = ref('')

const loadLunchBoxCustom1 = async () => {
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

      lunchBoxCustom1Mains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBoxCustom1SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // 監聽主餐的數量變化
    lunchBoxCustom1Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          lunchBoxCustom1SideDishes.forEach(sideDish => {
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
    lunchBoxCustom1Name.value = response.data.name
    lunchBoxCustom1MainName.value = mainMeal.name
    lunchBoxCustom1DrinkName.value = drink.name
    lunchBoxCustom1SideDishName.value = sideDish.name
  } catch (error) {
    console.error(error)
  }
}
loadLunchBoxCustom1()
// 計算總數量
const lunchBoxCustom1TotalQuantity = computed(() => {
  return lunchBoxCustom1Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})
const lunchBoxCustom1Price = ref(0)
// 計算總價格
const lunchBoxCustom1TotalQuantityPrice = computed(() => {
  return lunchBoxCustom1TotalQuantity.value * lunchBoxCustom1Price.value
})

const submitLunchboxCustom1 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1
  const row = {
    bentoType: 0,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBoxCustom1TotalQuantityPrice.value,
    inputs: []
  }
  const totalQuantity = lunchBoxCustom1TotalQuantity.value
  for (const option of lunchBoxCustom1Mains) {
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
      row.name = lunchBoxCustom1Name.value + totalQuantity + '份'
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
  for (const sideDish of lunchBoxCustom1SideDishes) {
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

// editDialog0導入欄位
const lunchBoxCustom1EditMains = reactive([])
const lunchBoxCustom1EditSideDishes = reactive([])
const lunchBoxCustom1EditSideDishName = ref('')
const lunchBoxCustom1EditDrinkName = ref('')
const lunchBoxCustom1EditMainName = ref('')
const lunchBoxCustom1EditName = ref('')

const loadLunchBoxCustom1Edit = async () => {
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

      lunchBoxCustom1EditMains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBoxCustom1EditSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // // 監聽主餐的數量變化
    // lunchBoxCustom1EditMains.forEach(main => {
    //   watch(() => main.quantity, (newVal, oldVal) => {
    //     if (newVal !== oldVal) {
    //       // 配菜的數量跟著主餐的數量變化
    //       lunchBoxCustom1EditSideDishes.forEach(sideDish => {
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
    lunchBoxCustom1EditName.value = response.data.name
    lunchBoxCustom1EditMainName.value = mainMeal.name
    lunchBoxCustom1EditDrinkName.value = drink.name
    lunchBoxCustom1EditSideDishName.value = sideDish.name
  } catch (error) {
    console.error(error)
  }
}
loadLunchBoxCustom1Edit()

// 將 table 資料拆解放回修正欄位
let editingRow = null

function editRowDialog0 (row) {
  for (const main of lunchBoxCustom1EditMains) {
    main.quantity = 0
    for (const drink of main.drinks) {
      drink.quantity = 0
    }
  }

  for (const sideDish of lunchBoxCustom1EditSideDishes) {
    sideDish.quantity = 0
  }
  for (const input of row.inputs) {
    const mainId = input.mainId
    const name = input.name
    const value = input.value

    const mainIndex = lunchBoxCustom1EditMains.findIndex(
      (lunchBoxCustom1EditMain) => lunchBoxCustom1EditMain.name === name
    )
    if (mainIndex >= 0) {
      lunchBoxCustom1EditMains[mainIndex].quantity = parseInt(value)
    }
    for (const main of lunchBoxCustom1EditMains) {
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

    const sideDishIndex = lunchBoxCustom1EditSideDishes.findIndex(sideDish => sideDish.name === name)
    if (sideDishIndex >= 0) {
      lunchBoxCustom1EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    const totalQuantity = parseFloat(row.price) // 获取 lunchBoxCustom1TotalQuantity 的值

    lunchBoxCustom1EditPrice.value = totalQuantity / lunchBoxCustom1EditTotalQuantity.value // 将 rowPrice / totalQuantity 的值赋给 lunchBoxCustom1EditPrice
  }

  editingRow = row
  editDialog0.value = true
}

const lunchBoxCustom1EditTotalQuantity = computed(() => {
  return lunchBoxCustom1EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})

const lunchBoxCustom1EditPrice = ref(0)
const lunchBoxCustom1EditTotalQuantityPrice = computed(() => {
  return lunchBoxCustom1EditTotalQuantity.value * lunchBoxCustom1EditPrice.value
})

const editDialog0 = ref(false)
function closeEditDialog0 () {
  editDialog0.value = false
}

const saveEditDialog0 = () => {
  const row = {
    bentoType: 0,
    id: editingRow.id,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBoxCustom1EditTotalQuantityPrice.value,
    inputs: []
  }
  const totalEditQuantity = lunchBoxCustom1EditTotalQuantity.value // 計算總數量
  for (const option of lunchBoxCustom1EditMains) {
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
      row.name = lunchBoxCustom1Name.value + totalEditQuantity + '份' // 使用總數量
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

  for (const sideDish of lunchBoxCustom1EditSideDishes) {
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

  editDialog0.value = false
}

</script>

<style lang="scss" scoped>
.orderTable{
td {
white-space: normal;
}

}
</style>
