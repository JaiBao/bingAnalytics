<template>
  <!-- 主餐 -->
  <q-card>
    <div class="q-gutter-xs row items-start justify-center" id="lunchbox1">
      <div v-for="(lunchBox1Main, index) in lunchBox1Mains" :key="index">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox1Main.name }}</h5>
        <q-input
        min="0"
         v-model="lunchBox1Main.quantity" :label="lunchBox1Main.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        <h5 style="margin: 0; padding: 0;">{{ lunchBox1DrinkName }}</h5>
        <div v-for="(lunchBox1Drink, drinkIndex) in lunchBox1Main.drinks" :key="drinkIndex">
          <q-input
          min="0"
           v-model="lunchBox1Drink.quantity" :label="lunchBox1Drink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </div>
      </div>
    </div>
    <!-- 配菜 -->
    <div class="row q-mr-lg q-mb-auto  flex-wrap" style="width: 100%; gap: 16px; margin-top:5px;  margin-left:35px; ">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox1SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(lunchBox1SideDish, index) in lunchBox1SideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0"
           v-model="lunchBox1SideDish.quantity" :label="lunchBox1SideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width: 100%; margin-top:5px;  margin-left:35px; ">
      <h5 style="margin: 0; padding: 0;">{{lunchBox1Name}}</h5>
      <div class="row">
        <q-input
        min="0"
         outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model="lunchBox1TotalQuantity" label="數量總計" readonly />
          <q-input
          min="0"
          outlined
          type="number"
          :input-style="{ fontSize: '20px' }"
          style="width: 130px;"
          v-model="lunchBox1Price"
          label="商品單價"
          readonly
          />
        <q-input
        min="0"
         outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model="lunchBox1TotalQuantityPrice" label="金額總計" readonly />
      </div>
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary"
      label="送出"
      type="submit"
      class="q-mt-md"
      @click="submitLunchbox1"
      />
      <q-btn
      color="red"
      label="取消"
      @click="showLunchBox1 = false"
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
          <q-btn icon="edit" fab-mini unelevated size="sm" color="info" @click="editRowDialog5(props.row)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <!-- 經濟盒餐修改dialog -->
  <q-dialog v-model="editDialog5">
    <q-card class="q-gutter-md row items-start  word-break " id="customLunchbox">
  <div class="q-gutter-xs row items-start justify-center" id="lunchbox1Edit">
    <div v-for="(lunchBox1EditMain, index) in lunchBox1EditMains" :key="index">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox1EditMain.name }}</h5>
      <q-input
      min="0"
       v-model="lunchBox1EditMain.quantity" :label="lunchBox1EditMain.name" outlined type="number"
        :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      <h5 style="margin: 0; padding: 0;">{{ lunchBox1EditDrinkName }}</h5>
      <div v-for="(lunchBox1EditDrink, drinkIndex) in lunchBox1EditMain.drinks" :key="drinkIndex">
        <q-input
        min="0"
         v-model="lunchBox1EditDrink.quantity" :label="lunchBox1EditDrink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </div>
    </div>
  </div>
  <!-- 配菜 -->
  <div class="row q-mr-lg q-mb-auto  flex-wrap" style="width: 100%; gap: 16px; margin-top:5px;  margin-left:35px; ">
    <h5 style="margin: 0; padding: 0;">{{ lunchBox1EditSideDishName }}</h5>
    <div class="row items-center">
      <q-item v-for="(lunchBox1EditSideDish, index) in lunchBox1EditSideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="lunchBox1EditSideDish.quantity" :label="lunchBox1EditSideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 總計 -->
  <div style="width: 100%; margin-top:5px;  margin-left:35px; ">
    <h5 style="margin: 0; padding: 0;">{{lunchBox1EditName}}</h5>
    <div class="row">
      <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="lunchBox1EditTotalQuantity" label="數量總計" readonly />
        <q-input
          min="0"
          outlined
          type="number"
          :input-style="{ fontSize: '20px' }"
          style="width: 130px;"
          v-model="lunchBox1EditPrice"
          label="商品單價"
          readonly
          />
      <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="lunchBox1EditTotalQuantityPrice" label="金額總計" readonly />
    </div>
  </div>
  <!-- 按鈕 -->
  <div class="row justify-end" style="width: 100%;">
    <q-btn color="primary"
    label="送出"
    type="submit"
    class="q-mt-md"
    @click="saveEditDialog5"
    />
    <q-btn
    color="red"
    label="取消"
    @click="closeEditDialog5"
    class="q-mt-md"
    />
  </div>
</q-card>

  </q-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { apiAuth } from 'src/boot/axios'

const lunchBox1Mains = reactive([])
const tableRows = reactive([])
const lunchBox1SideDishes = reactive([])
const lunchBox1SideDishName = ref('')
const lunchBox1DrinkName = ref('')
const lunchBox1MainName = ref('')
const lunchBox1Name = ref('')
const price = ref(0)

const loadLunchBox1 = async () => {
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

      lunchBox1Mains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox1SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // 監聽主餐的數量變化
    lunchBox1Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          lunchBox1SideDishes.forEach(sideDish => {
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
    lunchBox1Name.value = response.data.name
    lunchBox1MainName.value = mainMeal.name
    lunchBox1DrinkName.value = drink.name
    lunchBox1SideDishName.value = sideDish.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}
loadLunchBox1()
// 計算總數量
const lunchBox1TotalQuantity = computed(() => {
  return lunchBox1Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})
// 商品單價
const lunchBox1Price = computed(() => {
  return price.value
})
// 計算總價格
const lunchBox1TotalQuantityPrice = computed(() => {
  return lunchBox1TotalQuantity.value * price.value
})

const submitLunchbox1 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1
  const row = {
    bentoType: 5,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox1TotalQuantityPrice.value,
    inputs: []
  }
  const totalQuantity = lunchBox1TotalQuantity.value
  for (const option of lunchBox1Mains) {
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
      row.name = lunchBox1Name.value + totalQuantity + '份'
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
  for (const sideDish of lunchBox1SideDishes) {
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

// editDialog5導入欄位
const lunchBox1EditMains = reactive([])
const lunchBox1EditSideDishes = reactive([])
const lunchBox1EditSideDishName = ref('')
const lunchBox1EditDrinkName = ref('')
const lunchBox1EditMainName = ref('')
const lunchBox1EditName = ref('')

const loadLunchBox1Edit = async () => {
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

      lunchBox1EditMains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox1EditSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // // 監聽主餐的數量變化
    // lunchBox1EditMains.forEach(main => {
    //   watch(() => main.quantity, (newVal, oldVal) => {
    //     if (newVal !== oldVal) {
    //       // 配菜的數量跟著主餐的數量變化
    //       lunchBox1EditSideDishes.forEach(sideDish => {
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
    lunchBox1EditName.value = response.data.name
    lunchBox1EditMainName.value = mainMeal.name
    lunchBox1EditDrinkName.value = drink.name
    lunchBox1EditSideDishName.value = sideDish.name
  } catch (error) {
    console.error(error)
  }
}
loadLunchBox1Edit()

// 將 table 資料拆解放回修正欄位
let editingRow = null
let watchers = []
function editRowDialog5 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  for (const main of lunchBox1EditMains) {
    main.quantity = 0
    for (const drink of main.drinks) {
      drink.quantity = 0
    }
  }

  for (const sideDish of lunchBox1EditSideDishes) {
    sideDish.quantity = 0
  }
  for (const input of row.inputs) {
    const mainId = input.mainId
    const name = input.name
    const value = input.value

    const mainIndex = lunchBox1EditMains.findIndex(
      (lunchBox1EditMain) => lunchBox1EditMain.name === name
    )
    if (mainIndex >= 0) {
      lunchBox1EditMains[mainIndex].quantity = parseInt(value)
    }
    for (const main of lunchBox1EditMains) {
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

    const sideDishIndex = lunchBox1EditSideDishes.findIndex(sideDish => sideDish.name === name)
    if (sideDishIndex >= 0) {
      lunchBox1EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
  }
  // 監聽主餐的數量變化
  lunchBox1EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        lunchBox1EditSideDishes.forEach(sideDish => {
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
    // Store unwatch reference
    watchers.push(unwatch)
  })

  editingRow = row
  editDialog5.value = true
}

const lunchBox1EditTotalQuantity = computed(() => {
  return lunchBox1EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})

const lunchBox1EditPrice = computed(() => {
  return price.value
})
const lunchBox1EditTotalQuantityPrice = computed(() => {
  return lunchBox1EditTotalQuantity.value * price.value
})
const editDialog5 = ref(false)
function closeEditDialog5 () {
  editDialog5.value = false
}

const saveEditDialog5 = () => {
  const row = {
    bentoType: 5,
    id: editingRow.id,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox1EditTotalQuantityPrice.value,
    inputs: []
  }
  const totalEditQuantity = lunchBox1EditTotalQuantity.value // 計算總數量
  for (const option of lunchBox1EditMains) {
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
      row.name = lunchBox1Name.value + totalEditQuantity + '份' // 使用總數量
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

  for (const sideDish of lunchBox1EditSideDishes) {
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

  editDialog5.value = false
}

</script>

<style lang="scss" scoped>
.orderTable{
td {
white-space: normal;
}

}
</style>
