<template>
       <!-- 單點dailog -->

        <q-card class="q-gutter-md row items-start  word-break " >
 <!-- 6吋潤餅 -->
 <div>
  <h5 style="margin: 0; padding: 0;">{{ bangdongSolo6inchName }}</h5>
  <div class="row items-center"
  >
  <q-item  v-for="(bangdongSolo6inch, index) in bangdongSolo6inchs" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
  <q-input
  min="0"

  v-model="bangdongSolo6inch.quantity"
  :label="bangdongSolo6inch.name"
  outlined
  type="number"
    :input-style="{ fontSize: '20px', margin: '0' }"
    :label-style="{ fontSize: '20px' }"
    style="width: 130px;"
    />
  </q-item>
  </div>
  </div>
  <!-- 3吋潤餅 -->
    <div>
  <h5 style="margin: 0; padding: 0;">{{ bangdongSolo3inchName }}</h5>
  <div class="row items-center"
  >
  <q-item  v-for="(bangdongSolo3inch, index) in bangdongSolo3inchs" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
  <q-input
  min="0"

  v-model="bangdongSolo3inch.quantity"
  :label="bangdongSolo3inch.name"
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
    <h5 style="margin: 0; padding: 0;">{{ bangdongSoloDrinkName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdongSoloDrink, index) in bangdongSoloDrinks" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdongSoloDrink.quantity" :label="bangdongSoloDrink.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
  <!-- 副主餐 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdongSoloBentoMainName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdongSoloBentoMain, index) in bangdongSoloBentoMains" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdongSoloBentoMain.quantity" :label="bangdongSoloBentoMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
      </div>
    </div>
  <!-- 配菜 -->
  <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdongSoloSideDishName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdongSoloSideDish, index) in bangdongSoloSideDishes" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdongSoloSideDish.quantity" :label="bangdongSoloSideDish.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
    </div>
  </div>
    <!-- 環保袋 -->
    <div>
    <h5 style="margin: 0; padding: 0;">{{ bangdongSoloEcoBagName }}</h5>
    <div class="row items-center">
      <q-item v-for="(bangdongSoloEcoBag, index) in bangdongSoloEcoBags" :key="index" class="flex-auto "
        style="margin: 0; padding: 0;">
        <q-input
        min="0"
         v-model="bangdongSoloEcoBag.quantity" :label="bangdongSoloEcoBag.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
      </q-item>
      </div>
    </div>
  <!-- 總計 -->
  <div  style="width:100%">
      <h5  style="margin: 0; padding: 0;">{{bangdongSoloName}}</h5>
      </div>
      <div class="row">
  <q-input
  min="0"

  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdongSoloTotalQuantity"
  label="數量總計"
  readonly
  />

  <q-input
  min="0"

  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model="bangdongSoloTotalQuantityPrice"
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
  @click="submitBangdongSolo"
  />
  <q-btn
  color="red"
  label="取消"
  @click="showbangdongSolo = false"
  class="q-mt-md"
  />

  </div >

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
          <q-btn icon="edit" fab-mini unelevated size="sm" color="info" @click="editBangdongSolo(props.row)" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
     <!-- 單點修改dialog -->
     <q-dialog v-model="editDialog10" >
  <q-card class="q-gutter-md row items-start  word-break " >
<!-- 6吋潤餅 -->
<div>
<h5 style="margin: 0; padding: 0;">{{ bangdongSolo6inchName }}</h5>
<div class="row items-center"
>
<q-item  v-for="(bangdongSoloEdit6inch, index) in bangdongSoloEdit6inchs" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
<q-input
min="0"

v-model="bangdongSoloEdit6inch.quantity"
:label="bangdongSoloEdit6inch.name"
outlined
type="number"
:input-style="{ fontSize: '20px', margin: '0' }"
:label-style="{ fontSize: '20px' }"
style="width: 130px;"
/>
</q-item>
</div>
</div>
<!-- 3吋潤餅 -->
<div>
<h5 style="margin: 0; padding: 0;">{{ bangdongSolo3inchName }}</h5>
<div class="row items-center"
>
<q-item  v-for="(bangdongSoloEdit3inch, index) in bangdongSoloEdit3inchs" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
<q-input
min="0"

v-model="bangdongSoloEdit3inch.quantity"
:label="bangdongSoloEdit3inch.name"
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
<h5 style="margin: 0; padding: 0;">{{ bangdongSoloDrinkName }}</h5>
<div class="row items-center">
<q-item v-for="(bangdongSoloEditDrink, index) in bangdongSoloEditDrinks" :key="index" class="flex-auto "
  style="margin: 0; padding: 0;">
  <q-input
  min="0"
   v-model="bangdongSoloEditDrink.quantity" :label="bangdongSoloEditDrink.name" outlined type="number"
    :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
</q-item>
</div>
</div>
<!-- 副主餐 -->
<div>
<h5 style="margin: 0; padding: 0;">{{ bangdongSoloBentoMainName }}</h5>
<div class="row items-center">
<q-item v-for="(bangdongSoloEditBentoMain, index) in bangdongSoloEditBentoMains" :key="index" class="flex-auto "
  style="margin: 0; padding: 0;">
  <q-input
  min="0"
   v-model="bangdongSoloEditBentoMain.quantity" :label="bangdongSoloEditBentoMain.name" outlined type="number"
    :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
</q-item>
</div>
</div>
<!-- 配菜 -->
<div>
<h5 style="margin: 0; padding: 0;">{{ bangdongSoloSideDishName }}</h5>
<div class="row items-center">
<q-item v-for="(bangdongSoloEditSideDish, index) in bangdongSoloEditSideDishes" :key="index" class="flex-auto "
  style="margin: 0; padding: 0;">
  <q-input
  min="0"
   v-model="bangdongSoloEditSideDish.quantity" :label="bangdongSoloEditSideDish.name" outlined type="number"
    :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
</q-item>
</div>
</div>
<!-- 環保袋 -->
<div>
<h5 style="margin: 0; padding: 0;">{{ bangdongSoloEcoBagName }}</h5>
<div class="row items-center">
<q-item v-for="(bangdongSoloEditEcoBag, index) in bangdongSoloEditEcoBags" :key="index" class="flex-auto "
  style="margin: 0; padding: 0;">
  <q-input
  min="0"
   v-model="bangdongSoloEditEcoBag.quantity" :label="bangdongSoloEditEcoBag.name" outlined type="number"
    :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
</q-item>
</div>
</div>
<!-- 總計 -->
<div  style="width:100%">
<h5  style="margin: 0; padding: 0;">{{bangdongSoloName}}</h5>
</div>
<div class="row">
<q-input
min="0"

outlined
type="number"
:input-style="{ fontSize: '20px' }"
style="width: 130px;"
v-model="bangdongSoloEditTotalQuantity"
label="數量總計"
readonly
/>

<q-input
min="0"

outlined
type="number"
:input-style="{ fontSize: '20px' }"
style="width: 130px;"
v-model="bangdongSoloEditTotalQuantityPrice"
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
@click="saveEditDialog10"
/>
<q-btn
color="red"
label="取消"
@click="closeEditDialog10"
class="q-mt-md"
/>

</div >

    </q-card>
</q-dialog>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { apiAuth } from 'src/boot/axios'

const tableRows = reactive([])
// 單點
const bangdongSolo6inchs = reactive([])
const bangdongSolo6inchName = ref('')
const bangdongSolo3inchs = reactive([])
const bangdongSolo3inchName = ref('')
const bangdongSoloDrinks = reactive([])
const bangdongSoloDrinkName = ref('')
const bangdongSoloSideDishes = reactive([])
const bangdongSoloSideDishName = ref('')
const bangdongSoloBentoMains = reactive([])
const bangdongSoloBentoMainName = ref('')
const bangdongSoloEcoBags = reactive([])
const bangdongSoloEcoBagName = ref('')
const bangdongSoloName = ref('')
const editDialog10 = ref(false)
// 抓取單點商品形成input
const loadBangdongSolo = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1062')
    const productOptions = response.data.product_options
    // 6吋
    const burrito6inch = productOptions.burrito_6inch
    const burrito6inchValues = burrito6inch.product_option_values

    for (const burrito6inchValue of burrito6inchValues) {
      bangdongSolo6inchs.push({
        id: burrito6inchValue.id,
        name: burrito6inchValue.short_name,
        price: burrito6inchValue.price,
        quantity: 0
      })
    }
    // 6吋
    const burrito3inch = productOptions.burrito_3inch
    const burrito3inchValues = burrito3inch.product_option_values

    for (const burrito3inchValue of burrito3inchValues) {
      bangdongSolo3inchs.push({
        id: burrito3inchValue.id,
        name: burrito3inchValue.short_name,
        price: burrito3inchValue.price,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdongSoloDrinks.push({
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        price: DrinkValue.price,
        quantity: 0
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdongSoloSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        price: sideDishValue.price,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      bangdongSoloBentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.short_name,
        price: bentoMainValue.price,
        quantity: 0
      })
    }
    // 環保袋
    const ecoBag = productOptions.eco_bag
    const ecoBagValues = ecoBag.product_option_values
    for (const ecoBagValue of ecoBagValues) {
      bangdongSoloEcoBags.push({
        id: ecoBagValue.id,
        name: ecoBagValue.short_name,
        price: ecoBagValue.price,
        quantity: 0
      })
    }
    bangdongSoloName.value = response.data.name
    bangdongSolo6inchName.value = burrito6inch.name
    bangdongSolo3inchName.value = burrito3inch.name
    bangdongSoloDrinkName.value = Drink.name
    bangdongSoloSideDishName.value = sideDish.name
    bangdongSoloBentoMainName.value = bentoMain.name
    bangdongSoloEcoBagName.value = ecoBag.name
  } catch (error) {
    console.error(error)
  }
}

loadBangdongSolo()

// 計算總數量
const bangdongSoloTotalQuantity = computed(() => {
  let total = 0
  total += bangdongSolo6inchs.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSolo3inchs.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloDrinks.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloSideDishes.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloBentoMains.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEcoBags.reduce((sum, item) => sum + Number(item.quantity), 0)

  return total
})
// 計算總價格
const bangdongSoloTotalQuantityPrice = computed(() => {
  let total = 0
  total += bangdongSolo6inchs.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSolo3inchs.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloDrinks.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloSideDishes.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloBentoMains.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEcoBags.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)

  return total
})
// 將資料推進tableRows
const submitBangdongSolo = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 10,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdongSoloTotalQuantityPrice.value,
    inputs: []
  }

  const totalQuantity = bangdongSoloTotalQuantity.value
  // 6吋潤餅
  const bangdongSolo6inchCompositions = []
  for (const bangdongSolo6inch of bangdongSolo6inchs) {
    if (bangdongSolo6inch.quantity > 0) {
      const bangdongSolo6inchComposition = `${bangdongSolo6inch.name} x${bangdongSolo6inch.quantity}`
      bangdongSolo6inchCompositions.push(bangdongSolo6inchComposition)

      const input = {
        name: bangdongSolo6inch.name,
        value: parseInt(bangdongSolo6inch.quantity)
      }
      row.inputs.push(input)

      bangdongSolo6inch.quantity = 0
    }
  }
  // 3吋潤餅
  const bangdongSolo3inchCompositions = []
  for (const bangdongSolo3inch of bangdongSolo3inchs) {
    if (bangdongSolo3inch.quantity > 0) {
      const bangdongSolo3inchComposition = `${bangdongSolo3inch.name} x${bangdongSolo3inch.quantity}`
      bangdongSolo3inchCompositions.push(bangdongSolo3inchComposition)

      const input = {
        name: bangdongSolo3inch.name,
        value: parseInt(bangdongSolo3inch.quantity)
      }
      row.inputs.push(input)

      bangdongSolo3inch.quantity = 0
    }
  }

  if (bangdongSolo6inchCompositions.length > 0) {
    row.Main += `${bangdongSolo6inchName.value}  (${bangdongSolo6inchCompositions.join(', ')})`
  }

  if (bangdongSolo3inchCompositions.length > 0) {
    if (bangdongSolo6inchCompositions.length > 0) {
      row.Main += ', '
    }
    row.Main += `${bangdongSolo3inchName.value}  (${bangdongSolo3inchCompositions.join(', ')})`
  }

  // 飲料
  for (const bangdongSoloDrink of bangdongSoloDrinks) {
    if (bangdongSoloDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdongSoloDrink.name + 'x' + parseInt(bangdongSoloDrink.quantity).toString() + ' '
      const input = {
        name: bangdongSoloDrink.name,
        price: bangdongSoloDrink.price,
        value: parseInt(bangdongSoloDrink.quantity)
      }
      row.inputs.push(input)
      bangdongSoloDrink.quantity = 0
    }
  }
  // 配菜
  const bangdongSoloSideDishCompositions = []
  for (const bangdongSoloSideDish of bangdongSoloSideDishes) {
    if (bangdongSoloSideDish.quantity > 0) {
      const bangdongSoloSideDishComposition = `${bangdongSoloSideDish.name} x${bangdongSoloSideDish.quantity}`
      bangdongSoloSideDishCompositions.push(bangdongSoloSideDishComposition)
      // console.log(bangdongSoloSideDishComposition)

      const input = {
        name: bangdongSoloSideDish.name,
        price: bangdongSoloSideDish.price,
        value: parseInt(bangdongSoloSideDish.quantity),
        is_default: bangdongSoloSideDish.is_default
      }
      row.inputs.push(input)

      bangdongSoloSideDish.quantity = 0
    }
  }
  // 副主餐
  const bangdongSoloBentoMainCompositions = []
  for (const bangdongSoloBentoMain of bangdongSoloBentoMains) {
    if (bangdongSoloBentoMain.quantity > 0) {
      const bangdongSoloBentoMainComposition = `${bangdongSoloBentoMain.name} x${bangdongSoloBentoMain.quantity}`
      bangdongSoloBentoMainCompositions.push(bangdongSoloBentoMainComposition)
      // console.log(bangdongSoloBentoMainComposition)

      const input = {
        name: bangdongSoloBentoMain.name,
        price: bangdongSoloBentoMain.price,
        value: parseInt(bangdongSoloBentoMain.quantity)
      }
      row.inputs.push(input)

      bangdongSoloBentoMain.quantity = 0
    }
  }

  if (bangdongSoloSideDishCompositions.length > 0) {
    row.sideDishes += `配菜 (${bangdongSoloSideDishCompositions.join(', ')})`
  }

  if (bangdongSoloBentoMainCompositions.length > 0) {
    if (bangdongSoloSideDishCompositions.length > 0) {
      row.sideDishes += ', '
    }
    row.sideDishes += `副主餐 (${bangdongSoloBentoMainCompositions.join(', ')})`
  }
  row.name = bangdongSoloName.value + totalQuantity + '份'

  // 購物袋
  const ecoBagCompositions = []
  for (const bangdongSoloEcoBag of bangdongSoloEcoBags) {
    if (bangdongSoloEcoBag.quantity > 0) {
      const ecoBagComposition = `${bangdongSoloEcoBag.name} x${bangdongSoloEcoBag.quantity}`
      ecoBagCompositions.push(ecoBagComposition)

      const input = {
        name: bangdongSoloEcoBag.name,
        price: bangdongSoloEcoBag.price,
        value: parseInt(bangdongSoloEcoBag.quantity)
      }
      row.inputs.push(input)
      bangdongSoloEcoBag.quantity = 0
    }
  }

  if (ecoBagCompositions.length > 0) {
    row.name += ` (${ecoBagCompositions.join(', ')})`
  }

  // 將這個 row 推進 tableRows 中
  tableRows.push(row)
}
// editDialog10導入欄位
const bangdongSoloEdit6inchs = reactive([])
const bangdongSoloEdit3inchs = reactive([])
const bangdongSoloEditDrinks = reactive([])
const bangdongSoloEditSideDishes = reactive([])
const bangdongSoloEditBentoMains = reactive([])
const bangdongSoloEditEcoBags = reactive([])
const bangdongSoloEditName = ref('')
const loadBangdongSoloEdit = async () => {
  try {
    const response = await apiAuth.get('catalog/product/1062')
    const productOptions = response.data.product_options

    // 6吋潤餅
    const burrito6inch = productOptions.burrito_6inch
    const values = burrito6inch.product_option_values

    for (const value of values) {
      const bangdongSoloEdit6inch = {
        id: value.id,
        name: value.short_name,
        quantity: 0,
        price: value.price,
        hidenquantity: 0
      }
      bangdongSoloEdit6inchs.push(bangdongSoloEdit6inch)
    }
    // 3吋潤餅
    const burrito3inch = productOptions.burrito_3inch
    const burrito3inchValues = burrito3inch.product_option_values
    for (const burrito3inchValue of burrito3inchValues) {
      const bangdongSoloEditBentoMain = {
        id: burrito3inchValue.id,
        name: burrito3inchValue.short_name,
        quantity: 0,
        price: burrito3inchValue.price,
        hidenquantity: 0
      }
      bangdongSoloEdit3inchs.push(bangdongSoloEditBentoMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdongSoloEditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.short_name,
        quantity: 0,
        price: DrinkValue.price,
        hidenquantity: 0
      }
      bangdongSoloEditDrinks.push(bangdongSoloEditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdongSoloEditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.short_name,
        quantity: 0,
        price: sideDishValue.price,
        hidenquantity: 0,
        is_default: sideDishValue.is_default
      }
      bangdongSoloEditSideDishes.push(bangdongSoloEditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdongSoloEditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.short_name,
        quantity: 0,
        price: bentoMainValue.price,
        hidenquantity: 0
      }
      bangdongSoloEditBentoMains.push(bangdongSoloEditBentoMain)
    }
    // 環保袋
    const ecoBag = productOptions.eco_bag
    const ecoBagValues = ecoBag.product_option_values
    for (const ecoBagValue of ecoBagValues) {
      const bangdongSoloEditEcoBag = {
        id: ecoBagValue.id,
        name: ecoBagValue.short_name,
        price: ecoBagValue.price,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongSoloEditEcoBags.push(bangdongSoloEditEcoBag)
    }
    bangdongSolo6inchName.value = burrito6inch.name
    bangdongSoloDrinkName.value = Drink.name
    bangdongSoloSideDishName.value = sideDish.name
    bangdongSoloBentoMainName.value = bentoMain.name
    bangdongSoloEditName.value = response.data.name
  } catch (error) {
    console.error(error)
  }
}

loadBangdongSoloEdit()

// 將 table 資料拆解放回修正欄位
let editingRow = null

function editBangdongSolo (row) {
  // 6吋潤餅歸零
  for (const bangdongSoloEdit6inch of bangdongSoloEdit6inchs) {
    bangdongSoloEdit6inch.quantity = 0
  }
  // 3吋潤筆歸零
  for (const bangdongSoloEdit3inch of bangdongSoloEdit3inchs) {
    bangdongSoloEdit3inch.quantity = 0
  }
  // 飲料歸零
  for (const bangdongSoloEditDrink of bangdongSoloEditDrinks) {
    bangdongSoloEditDrink.quantity = 0
  }
  // 配菜歸零
  for (const bangdongSoloEditSideDish of bangdongSoloEditSideDishes) {
    bangdongSoloEditSideDish.quantity = 0
  }
  // 副主餐歸零
  for (const bangdongSoloEditBentoMain of bangdongSoloEditBentoMains) {
    bangdongSoloEditBentoMain.quantity = 0
  }
  // 環保袋歸零
  for (const bangdongSoloEditEcoBag of bangdongSoloEditEcoBags) {
    bangdongSoloEditEcoBag.quantity = 0
  }
  // 雞胸便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 6吋潤餅 推入input數值
    const mainIndex = bangdongSoloEdit6inchs.findIndex((bangdongSoloEdit6inch) => bangdongSoloEdit6inch.name === name)
    if (mainIndex >= 0) {
      bangdongSoloEdit6inchs[mainIndex].quantity = parseInt(value)
    }
    // 3吋潤筆 推入input數值
    const threeInchIndex = bangdongSoloEdit3inchs.findIndex((bangdongSoloEdit3inch) => bangdongSoloEdit3inch.name === name)
    if (threeInchIndex >= 0) {
      bangdongSoloEdit3inchs[threeInchIndex].quantity = parseInt(value)
    }
    // 飲料 推入input數值
    const drinkIndex = bangdongSoloEditDrinks.findIndex((bangdongSoloEditDrink) => bangdongSoloEditDrink.name === name)
    if (drinkIndex >= 0) {
      bangdongSoloEditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 配菜 推入input數值
    const sideDishIndex = bangdongSoloEditSideDishes.findIndex((bangdongSoloEditSideDish) => bangdongSoloEditSideDish.name === name)
    if (sideDishIndex >= 0) {
      bangdongSoloEditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 副主餐 推入input數值
    const bentoMainIndex = bangdongSoloEditBentoMains.findIndex((bangdongSoloEditBentoMain) => bangdongSoloEditBentoMain.name === name)
    if (bentoMainIndex >= 0) {
      bangdongSoloEditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
    // 環保袋 推入input數值
    const ecoBagIndex = bangdongSoloEditEcoBags.findIndex((bangdongSoloEditEcoBag) => bangdongSoloEditEcoBag.name === name)
    if (ecoBagIndex >= 0) {
      bangdongSoloEditEcoBags[ecoBagIndex].quantity = parseInt(value)
    }
  }

  editingRow = row
  editDialog10.value = true
}

// 計算總數量
const bangdongSoloEditTotalQuantity = computed(() => {
  let total = 0
  total += bangdongSoloEdit6inchs.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEdit3inchs.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEditDrinks.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEditSideDishes.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEditBentoMains.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEditEcoBags.reduce((sum, item) => sum + Number(item.quantity), 0)

  return total
})
// 計算總價格
const bangdongSoloEditTotalQuantityPrice = computed(() => {
  let total = 0
  total += bangdongSoloEdit6inchs.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEdit3inchs.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEditDrinks.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEditSideDishes.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEditBentoMains.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEditEcoBags.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)

  return total
})
// 關閉修正欄位
function closeEditDialog10 () {
  editDialog10.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog10 () {
  const row = {
    bentoType: 10,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdongSoloEditTotalQuantityPrice.value,
    inputs: []
  }

  const totalQuantity = bangdongSoloEditTotalQuantity.value

  // 儲存推入潤餅置入table
  // 6吋潤餅
  const bangdongSoloEdit6inchCompositions = []
  for (const bangdongSoloEdit6inch of bangdongSoloEdit6inchs) {
    if (bangdongSoloEdit6inch.quantity > 0) {
      const bangdongSoloEdit6inchComposition = `${bangdongSoloEdit6inch.name} x${bangdongSoloEdit6inch.quantity}`
      bangdongSoloEdit6inchCompositions.push(bangdongSoloEdit6inchComposition)

      const input = {
        name: bangdongSoloEdit6inch.name,
        value: parseInt(bangdongSoloEdit6inch.quantity)
      }
      row.inputs.push(input)

      bangdongSoloEdit6inch.quantity = 0
    }
  }
  // 3吋潤餅
  const bangdongSoloEdit3inchCompositions = []
  for (const bangdongSoloEdit3inch of bangdongSoloEdit3inchs) {
    if (bangdongSoloEdit3inch.quantity > 0) {
      const bangdongSoloEdit3inchComposition = `${bangdongSoloEdit3inch.name} x${bangdongSoloEdit3inch.quantity}`
      bangdongSoloEdit3inchCompositions.push(bangdongSoloEdit3inchComposition)

      const input = {
        name: bangdongSoloEdit3inch.name,
        value: parseInt(bangdongSoloEdit3inch.quantity)
      }
      row.inputs.push(input)

      bangdongSoloEdit3inch.quantity = 0
    }
  }

  if (bangdongSoloEdit6inchCompositions.length > 0) {
    row.Main += `${bangdongSolo6inchName.value} (${bangdongSoloEdit6inchCompositions.join(', ')})`
  }

  if (bangdongSoloEdit3inchCompositions.length > 0) {
    if (bangdongSoloEdit6inchCompositions.length > 0) {
      row.Main += ', '
    }
    row.Main += `${bangdongSolo3inchName.value}  (${bangdongSoloEdit3inchCompositions.join(', ')})`
  }
  // 儲存推入飲料置入table
  for (const bangdongSoloEditDrink of bangdongSoloEditDrinks) {
    if (bangdongSoloEditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdongSoloEditDrink.name + 'x' + parseInt(bangdongSoloEditDrink.quantity).toString() + ' '
      const input = {
        name: bangdongSoloEditDrink.name,
        price: bangdongSoloEditDrink.price,
        value: parseInt(bangdongSoloEditDrink.quantity)
      }
      row.inputs.push(input)
      bangdongSoloEditDrink.quantity = 0
    }
  }
  // 儲存推入配菜置入table
  const bangdongSoloEditSideDishCompositions = []
  for (const bangdongSoloEditSideDish of bangdongSoloEditSideDishes) {
    if (bangdongSoloEditSideDish.quantity > 0) {
      const bangdongSoloEditSideDishComposition = `${bangdongSoloEditSideDish.name} x${bangdongSoloEditSideDish.quantity}`
      bangdongSoloEditSideDishCompositions.push(bangdongSoloEditSideDishComposition)
      // console.log(bangdongSoloEditSideDishComposition)

      const input = {
        name: bangdongSoloEditSideDish.name,
        price: bangdongSoloEditSideDish.price,
        value: parseInt(bangdongSoloEditSideDish.quantity),
        is_default: bangdongSoloEditSideDish.is_default
      }
      row.inputs.push(input)

      bangdongSoloEditSideDish.quantity = 0
    }
  }
  // 儲存推入副主餐置入table
  const bangdongSoloEditBentoMainCompositions = []
  for (const bangdongSoloEditBentoMain of bangdongSoloEditBentoMains) {
    if (bangdongSoloEditBentoMain.quantity > 0) {
      const bangdongSoloEditBentoMainComposition = `${bangdongSoloEditBentoMain.name} x${bangdongSoloEditBentoMain.quantity}`
      bangdongSoloEditBentoMainCompositions.push(bangdongSoloEditBentoMainComposition)
      // console.log(bangdongSoloEditBentoMainComposition)

      const input = {
        name: bangdongSoloEditBentoMain.name,
        price: bangdongSoloEditBentoMain.price,
        value: parseInt(bangdongSoloEditBentoMain.quantity)
      }
      row.inputs.push(input)

      bangdongSoloEditBentoMain.quantity = 0
    }
  }

  if (bangdongSoloEditSideDishCompositions.length > 0) {
    row.sideDishes += `配菜 (${bangdongSoloEditSideDishCompositions.join(', ')})`
  }

  if (bangdongSoloEditBentoMainCompositions.length > 0) {
    if (bangdongSoloEditSideDishCompositions.length > 0) {
      row.sideDishes += ', '
    }
    row.sideDishes += `副主餐 (${bangdongSoloEditBentoMainCompositions.join(', ')})`
  }
  row.name = bangdongSoloEditName.value + totalQuantity + '份'

  // 購物袋
  const ecoBagCompositions = []
  for (const bangdongSoloEditEcoBag of bangdongSoloEditEcoBags) {
    if (bangdongSoloEditEcoBag.quantity > 0) {
      const ecoBagComposition = `${bangdongSoloEditEcoBag.name} x${bangdongSoloEditEcoBag.quantity}`
      ecoBagCompositions.push(ecoBagComposition)

      const input = {
        name: bangdongSoloEditEcoBag.name,
        price: bangdongSoloEditEcoBag.price,
        value: parseInt(bangdongSoloEditEcoBag.quantity)
      }
      row.inputs.push(input)
      bangdongSoloEditEcoBag.quantity = 0
    }
  }

  if (ecoBagCompositions.length > 0) {
    row.name += ` (${ecoBagCompositions.join(', ')})`
  }
  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog10.value = false
}

</script>

<style lang="scss" scoped>
.orderTable{
td {
white-space: normal;
}

}
</style>
