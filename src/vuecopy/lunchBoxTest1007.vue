<template>
  <!-- 主餐 -->
  <q-card>
    <div class="q-gutter-xs row items-start justify-center" id="lunchbox3">
      <div v-for="(lunchBox3Main, index) in lunchBox3Mains" :key="index">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox3Main.name }}</h5>
        <q-input
        min="0"
         v-model="lunchBox3Main.quantity" :label="lunchBox3Main.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        <h5 style="margin: 0; padding: 0;">{{ lunchBox3DrinkName }}</h5>
        <div v-for="(lunchBox3Drink, drinkIndex) in lunchBox3Main.drinks" :key="drinkIndex">
          <q-input
          min="0"
           v-model="lunchBox3Drink.quantity" :label="lunchBox3Drink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </div>
      </div>
    </div>
    <!-- 配菜 -->
    <div class="row q-mr-lg q-mb-auto  flex-wrap" style="width: 100%; gap: 16px; margin-top:5px;  margin-left:35px; ">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox3SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(lunchBox3SideDish, index) in lunchBox3SideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0"
           v-model="lunchBox3SideDish.quantity" :label="lunchBox3SideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width: 100%; margin-top:5px;  margin-left:35px; ">
      <h5 style="margin: 0; padding: 0;">{{lunchBox3Name}}</h5>
      <div class="row">
        <q-input
        min="0"
         outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model="lunchBox3TotalQuantity" label="數量總計" readonly />
          <q-input
          min="0"
          outlined
          type="number"
          :input-style="{ fontSize: '20px' }"
          style="width: 130px;"
          v-model="lunchBox3Price"
          label="商品單價"
          readonly
          />
        <q-input
        min="0"
         outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model="lunchBox3TotalQuantityPrice" label="金額總計" readonly />
      </div>
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary"
      label="送出"
      type="submit"
      class="q-mt-md"
      @click="submitLunchbox3"
      />
      <q-btn
      color="red"
      label="取消"
      @click="showLunchBox3 = false"
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
          <q-btn icon="edit" fab-mini unelevated size="sm" color="info" @click="editRowDialog7(props.row)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <!-- 經濟盒餐修改dialog -->
  <q-dialog v-model="editDialog7">
    <q-card class="q-gutter-md row items-start  word-break " id="customLunchbox">
  <div class="q-gutter-xs row items-start justify-center" id="lunchbox3Edit">
    <div v-for="(lunchBox3EditMain, index) in lunchBox3EditMains" :key="index">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox3EditMain.name }}</h5>
      <q-input
      min="0"
       v-model="lunchBox3EditMain.quantity" :label="lunchBox3EditMain.name" outlined type="number"
        :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      <h5 style="margin: 0; padding: 0;">{{ lunchBox3EditDrinkName }}</h5>
      <div v-for="(lunchBox3EditDrink, drinkIndex) in lunchBox3EditMain.drinks" :key="drinkIndex">
        <q-input
        min="0"
         v-model="lunchBox3EditDrink.quantity" :label="lunchBox3EditDrink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </div>
    </div>
  </div>
  <!-- 配菜 -->
  <div class="row q-mr-lg q-mb-auto  flex-wrap" style="width: 100%; gap: 16px; margin-top:5px;  margin-left:35px; ">
    <h5 style="margin: 0; padding: 0;">{{ lunchBox3EditSideDishName }}</h5>
    <div class="row items-center">
      <q-item v-for="(lunchBox3EditSideDish, index) in lunchBox3EditSideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="lunchBox3EditSideDish.quantity" :label="lunchBox3EditSideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 總計 -->
  <div style="width: 100%; margin-top:5px;  margin-left:35px; ">
    <h5 style="margin: 0; padding: 0;">{{lunchBox3EditName}}</h5>
    <div class="row">
      <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="lunchBox3EditTotalQuantity" label="數量總計" readonly />
        <q-input
          min="0"
          outlined
          type="number"
          :input-style="{ fontSize: '20px' }"
          style="width: 130px;"
          v-model="lunchBox3EditPrice"
          label="商品單價"
          readonly
          />
      <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="lunchBox3EditTotalQuantityPrice" label="金額總計" readonly />
    </div>
  </div>
  <!-- 按鈕 -->
  <div class="row justify-end" style="width: 100%;">
    <q-btn color="primary"
    label="送出"
    type="submit"
    class="q-mt-md"
    @click="saveEditDialog7"
    />
    <q-btn
    color="red"
    label="取消"
    @click="closeEditDialog7"
    class="q-mt-md"
    />
  </div>
</q-card>

  </q-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { apiAuth } from 'src/boot/axios'

const lunchBox3Mains = reactive([])
const tableRows = reactive([])
const lunchBox3SideDishes = reactive([])
const lunchBox3SideDishName = ref('')
const lunchBox3DrinkName = ref('')
const lunchBox3MainName = ref('')
const lunchBox3Name = ref('')
const price = ref(0)

const loadLunchBox3 = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1007')
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

      lunchBox3Mains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox3SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // 監聽主餐的數量變化
    lunchBox3Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          lunchBox3SideDishes.forEach(sideDish => {
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
    lunchBox3Name.value = response.data.name
    lunchBox3MainName.value = mainMeal.name
    lunchBox3DrinkName.value = drink.name
    lunchBox3SideDishName.value = sideDish.name
    price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}
loadLunchBox3()
// 計算總數量
const lunchBox3TotalQuantity = computed(() => {
  return lunchBox3Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})
// 商品單價
const lunchBox3Price = computed(() => {
  return price.value
})
// 計算總價格
const lunchBox3TotalQuantityPrice = computed(() => {
  return lunchBox3TotalQuantity.value * price.value
})

const submitLunchbox3 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1
  const row = {
    bentoType: 7,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox3TotalQuantityPrice.value,
    inputs: []
  }
  const totalQuantity = lunchBox3TotalQuantity.value
  for (const option of lunchBox3Mains) {
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
      row.name = lunchBox3Name.value + totalQuantity + '份'
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
  for (const sideDish of lunchBox3SideDishes) {
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

// editDialog7導入欄位
const lunchBox3EditMains = reactive([])
const lunchBox3EditSideDishes = reactive([])
const lunchBox3EditSideDishName = ref('')
const lunchBox3EditDrinkName = ref('')
const lunchBox3EditMainName = ref('')
const lunchBox3EditName = ref('')

const loadLunchBox3Edit = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1007')
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

      lunchBox3EditMains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox3EditSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // // 監聽主餐的數量變化
    // lunchBox3EditMains.forEach(main => {
    //   watch(() => main.quantity, (newVal, oldVal) => {
    //     if (newVal !== oldVal) {
    //       // 配菜的數量跟著主餐的數量變化
    //       lunchBox3EditSideDishes.forEach(sideDish => {
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
    lunchBox3EditName.value = response.data.name
    lunchBox3EditMainName.value = mainMeal.name
    lunchBox3EditDrinkName.value = drink.name
    lunchBox3EditSideDishName.value = sideDish.name
  } catch (error) {
    console.error(error)
  }
}
loadLunchBox3Edit()

// 將 table 資料拆解放回修正欄位
let editingRow = null

function editRowDialog7 (row) {
  for (const main of lunchBox3EditMains) {
    main.quantity = 0
    for (const drink of main.drinks) {
      drink.quantity = 0
    }
  }

  for (const sideDish of lunchBox3EditSideDishes) {
    sideDish.quantity = 0
  }
  for (const input of row.inputs) {
    const mainId = input.mainId
    const name = input.name
    const value = input.value

    const mainIndex = lunchBox3EditMains.findIndex(
      (lunchBox3EditMain) => lunchBox3EditMain.name === name
    )
    if (mainIndex >= 0) {
      lunchBox3EditMains[mainIndex].quantity = parseInt(value)
    }
    for (const main of lunchBox3EditMains) {
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

    const sideDishIndex = lunchBox3EditSideDishes.findIndex(sideDish => sideDish.name === name)
    if (sideDishIndex >= 0) {
      lunchBox3EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
  }

  editingRow = row
  editDialog7.value = true
}

const lunchBox3EditTotalQuantity = computed(() => {
  return lunchBox3EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0)
})

const lunchBox3EditPrice = computed(() => {
  return price.value
})

const lunchBox3EditTotalQuantityPrice = computed(() => {
  return lunchBox3EditTotalQuantity.value * price.value
})
const editDialog7 = ref(false)
function closeEditDialog7 () {
  editDialog7.value = false
}

const saveEditDialog7 = () => {
  const row = {
    bentoType: 7,
    id: editingRow.id,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox3EditTotalQuantityPrice.value,
    inputs: []
  }
  const totalEditQuantity = lunchBox3EditTotalQuantity.value // 計算總數量
  for (const option of lunchBox3EditMains) {
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
      row.name = lunchBox3Name.value + totalEditQuantity + '份' // 使用總數量
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

  for (const sideDish of lunchBox3EditSideDishes) {
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

  editDialog7.value = false
}

</script>

<style lang="scss" scoped>
.orderTable{
td {
white-space: normal;
}

}
</style>
