<template>
  <div  style="display: flex; gap: 20px; align-items: center;padding-bottom: 2em;padding-top:  1em;">
      <q-btn-toggle
        v-model="browse"
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="red"
        color="white"
        text-color="red"
        :options="[
          {label: '套餐組合分析', value: 'one'},
          {label: '成分分析', value: 'two'}
        ]"
      />
    <div v-if="browse==='one'">
      <q-btn-toggle
        v-model="useType"
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="blue"
        color="white"
        text-color="blue"
        :options="[
          {label: '新增組合', value: '1'},
          {label: '查詢組合', value: '2'}
        ]"
      />
    </div>
    <div v-if="selectProduct &&browse==='one'"  style="display: flex; gap: 10px; align-items: center;padding-bottom: 0.5em;" >
      <span style="font-size: 20px; font-weight: bold;">{{ "套餐總成本:"  }}</span>
        <span class="primary" style="font-size: 20px; font-weight: bold;">{{ totalAll }}</span>
        <br>
        <span style="font-size: 20px; font-weight: bold;"> {{"商品售價:"  }}</span>
        <span style="font-size: 20px;padding-right: 30px; font-weight: bold;">{{ totalPrice }}</span>
        <q-btn @click="cleanBOM"  color="primary" style="font-size: 20px;"  v-if="useType==='1'&&selectBento">{{ "清空" }}</q-btn>
       <q-btn @click="updatecombo" color="primary" style="font-size: 20px;margin-left: 5px;" v-if="useType==='1'&&selectBento">{{ "儲存" }}</q-btn>
    </div>
    <div v-if="useType==='2' && browse==='one'">
        <q-select
            style=" width: 300px; font-size: 20px"
            filled
            v-model="selectCombo"
            :options = "comboData"
            label="選擇組合"
            option-value="name"
            option-label="name"
            >
        </q-select>
      </div>
  </div>
  <div v-if="browse==='one'" style="font-size: 20px;font-weight: 500;">

    <div style="display: flex; gap: 23px; align-items: center">
      <div  style="padding-bottom: 3em" v-if="selectCombo || useType==='1'">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectBento"
            :options = "setTypeData"
            label="套餐類型"
            option-value="term_id"
            option-label="name"
            >
        </q-select>
      </div>
      <div style="padding-bottom: 3em">
        <q-select
            v-if="selectBento"
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectProduct"
            :options = "selectBento.items"
            label="商品名稱"
            option-value="name"
            option-label="name"
            >
        </q-select>
      </div>
    <div v-if="selectBento"  class="div-border" >
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectBurrito6i"
            :options = "burrito6i"
            label="潤餅"
            option-value="product_id"
            option-label="name"
            >
      <!-- <template v-slot:append> -->
        <q-input
          v-model="burrito6i_quantity"
          filled
          type="float"
          min="1"
          style="width: 80px; font-size: 20px"
          label="数量"
          disable
        />
      <!-- </template> -->
        </q-select>
        {{"成本:"}}
        <span class="primary" style="padding-right: 10px" v-if="selectBurrito6i">{{burrito6iTotalCost}}</span>
        <span style="font-size: 15px;">{{ "佔比:" }} {{burrito6iPercentage}}</span>
    </div>
    <div  v-if="selectBento"  class="div-border">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectDrink"
            :options = "drink"
            label="飲料"
            option-value="product_id"
            option-label="name"
            >
            <q-input
          v-model="drink_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span class="primary" style="padding-right: 10px" v-if="selectDrink">{{drinkTotalCost}}</span>
        <span style="font-size: 15px;">{{ "佔比:" }} {{drinkPercentag}}</span>
    </div>
  </div>
    <div style="display: flex; gap: 20px; align-items: center;flex-wrap: wrap">
      <div v-if="selectBento"  class="div-border" >
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectSide_dish1"
            :options = "side_dish_bento"
            label="配菜1"
            option-value="product_id"
            option-label="name"
            >
            <q-input
          v-model="dish1_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span class="primary" style="padding-right: 10px" v-if="selectSide_dish1">{{dish1TotalCost}}</span>
        <span style="font-size: 15px;">{{ "佔比:" }} {{dish1Percentag}}</span>
    </div>
    <div v-if="selectBento"  class="div-border">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectSide_dish2"
            :options = "side_dish_bento"
            label="配菜2"
            option-value="product_id"
            option-label="name"
            >
            <q-input
          v-model="dish2_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span class="primary" style="padding-right: 10px" v-if="selectSide_dish2">{{dish2TotalCost}}</span>
        <span style="font-size: 15px;">{{ "佔比:" }} {{dish2Percentag}}</span>
    </div>
    <div v-if="selectBento"  class="div-border">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectSide_dish3"
            :options = "side_dish_bento"
            label="配菜3"
            option-value="product_id"
            option-label="name"
            >
            <q-input
          v-model="dish3_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span class="primary" style="padding-right: 10px" v-if="selectSide_dish3">{{dish3TotalCost}}</span>
        <span style="font-size: 15px;">{{ "佔比:" }} {{dish3Percentag}}</span>
    </div>
    <div v-if="selectBento && show_half_main===true"  class="div-border">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectHaif_main"
            :options = "half_main"
            label="副主餐"
            option-value="name"
            option-label="name"
            >
            <q-input
          v-model="half_main_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span class="primary" style="padding-right: 10px" v-if="selectHaif_main">{{halfMainTotalCost}}</span>
        <span style="font-size: 15px;">{{ "佔比:" }} {{half_mainPercentag}}</span>
    </div>
    <!-- <div  v-if="selectBento"  class="div-border">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectSide_dish4"
            :options = "side_dish_bento"
            label="配菜4"
            option-value="product_id"
            option-label="name"
            >
            <q-input
          v-model="dish4_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span v-if="selectSide_dish4">{{dish4TotalCost}}</span>
    </div> -->
    </div>
  <div style="display: flex; gap: 20px; align-items: center;flex-wrap: wrap">
    <div  v-if="selectBento"  class="div-border">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectSide_dish4"
            :options = "side_dish_bento"
            label="配菜4"
            option-value="product_id"
            option-label="name"
            >
            <q-input
          v-model="dish4_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span  class="primary" style="padding-right: 10px" v-if="selectSide_dish4">{{dish4TotalCost}}</span>
        <span style="font-size: 15px;">{{ "佔比:" }} {{dish4Percentag}}</span>
    </div>
    <div   v-if="selectBento"  class="div-border">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectSide_dish5"
            :options = "side_dish_bento"
            label="配菜5"
            option-value="product_id"
            option-label="name"
            >
            <q-input
          v-model="dish5_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span class="primary" style="padding-right: 10px" v-if="selectSide_dish5">{{dish5TotalCost}}</span>
        <span style="font-size: 15px;">{{ "佔比:" }} {{dish5Percentag}}</span>
    </div>
    <div   v-if="selectBento"  class="div-border">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectSide_dish6"
            :options = "side_dish_bento"
            label="配菜6"
            option-value="product_id"
            option-label="name"
            >
            <q-input
          v-model="dish6_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span class="primary" style="padding-right: 10px" v-if="selectSide_dish6">{{dish6TotalCost}}</span>
        <span style="font-size: 15px;">{{ "佔比:" }} {{dish6Percentag}}</span>
    </div>
    <div   v-if="selectBento"  class="div-border">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectSide_dish7"
            :options = "side_dish_bento"
            label="配菜7"
            option-value="product_id"
            option-label="name"
            >
            <q-input
          v-model="dish7_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span class="primary" style="padding-right: 10px" v-if="selectSide_dish7">{{dish7TotalCost}}</span>
        <span style="font-size: 15px;">{{ "佔比:" }} {{dish7Percentag}}</span>
    </div>
    <div   v-if="selectBento &&selectpackaging"  class="div-border">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectpackaging"
            :options = "packaging"
            label="包材"
            option-value="product_id"
            option-label="name"
            >
            <q-input
          v-model="packaging_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span class="primary" style="padding-right: 10px" v-if="selectpackaging">{{packagingTotalCost}}</span>
        <span style="font-size: 15px;">{{ "佔比:" }} {{packagingPercentag}}</span>
    </div>
    <!-- <div   v-if="selectBento"  class="div-border">
        <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectSide_dish8"
            :options = "side_dish_bento"
            label="配菜8"
            option-value="product_id"
            option-label="name"
            >
            <q-input
          v-model="dish8_quantity"
          filled
          type="number"
          min="0"
          style="width: 80px; font-size: 20px"
          label="数量"
        />
        </q-select>
        {{"成本:"}}
        <span  v-if="selectSide_dish8">{{dish8TotalCost}}</span>
    </div> -->
  </div>

</div>

<!-- 成分 -->
<div v-if="browse==='two'" >
  <div>
      <div style="display: flex; gap: 20px; align-items: center;flex-wrap: wrap;margin-bottom: 3em;">
        <!-- <q-select
            style="padding: 2px; width: 250px; font-size: 20px"
            filled
            v-model="selectBom"
            :options = "bomData"
            label="品項"
            option-value="product_id"
            option-label="name"
            >
        </q-select> -->
        <q-select
          style="padding: 2px; width: 250px; font-size: 20px"
          filled
          v-model="selectedType"
          :options="bomTypes"
          label="商品分類"
          option-label="label"
          option-value="value">
        </q-select>
        <q-select
          style=" padding: 2px; width: 250px; font-size: 20px"
          filled
          v-model="selectBom"
          :options="filteredBomData"
          label="品項"
          option-value="product_id"
          option-label="name">
        </q-select>
        <span style="font-size: 25px;"> {{ "製成品總成本:" }} {{ totalAmount }}</span>
      </div>
      <div v-if="selectBom" style="display: flex; gap: 20px; align-items: center;font-size: 18px;flex-wrap: wrap">
        <div v-for="(item, index) in selectBom.items " :key="index"  class="div-border">
          <span style="margin-right: 20px;" >{{ "組成:" }}{{item.name}}</span> <br>
          <span >{{ "單位:" }}{{item.usage_unit_code}}</span><br>
          <span >{{ "數量:" }}{{item.quantity}}</span><br>
          <span >{{ "成本:" }}{{item.amount}}</span>
        </div>
      </div>
  </div>
</div>
</template>
<script>

import { apiAuth } from 'src/boot/axios'
export default {
  filters: {
    toPercentage (value) {
      if (typeof value !== 'number') {
        return value
      }
      return `${(value * 100).toFixed(2)}%` // 轉換為百分比並保留兩位小數
    }
  },
  data () {
    return {
      selectBento: null,
      selectProduct: null,
      selectBurrito6i: null,
      burrito6i_quantity: 1,
      drink_quantity: 0,
      dish1_quantity: 0,
      dish2_quantity: 0,
      dish3_quantity: 0,
      dish4_quantity: 0,
      dish5_quantity: 0,
      dish6_quantity: 0,
      dish7_quantity: 0,
      dish8_quantity: 0,
      half_main_quantity: 0,
      selectHaif_main: null,
      selectDrink: null,
      selectSide_dish1: null,
      selectSide_dish2: null,
      selectSide_dish3: null,
      selectSide_dish4: null,
      selectSide_dish5: null,
      selectSide_dish6: null,
      selectSide_dish7: null,
      selectSide_dish8: null,
      bomData: [],
      setTypeData: [],
      selectBom: null,
      product: [],
      main_meal: [],
      drink: [],
      side_dish: [],
      product_price: 0,
      side_dish_bento: [],
      veg: [],
      // 時蔬
      veg_change: {
        name: '時蔬',
        total: 0,
        option_name: '配菜',
        product_id: 1036,
        items: [
        ]
      },
      browse: 'one',
      combo_name: '',
      comboData: [],
      useType: '1',
      selectCombo: null,
      half_main: [],
      show_half_main: false,
      veg_product: [],
      clean: false,
      realCombo: [],
      packaging: [],
      selectpackaging: null,
      packaging_quantity: 1,
      bomDataElement: [],
      bomTypes: [
        // { label: '主餐', value: '1003' },
        { label: '飲料', value: 1004 },
        { label: '配菜', value: 1005 },
        { label: '副主餐', value: 1007 },
        { label: '6吋潤餅', value: 1009 },
        { label: '其他', value: null }
      ],
      selectedType: null
    }
  },
  computed: {
    burrito6iTotalCost () {
      if (this.selectBurrito6i) {
        return this.selectBurrito6i.total * this.burrito6i_quantity / 2
      }
      return 0
    },
    showHalfMain () {
      if (this.selectBento.name === '便當') {
        if (this.selectProduct.name === '雞胸便當' || this.selectProduct.name === '鮭魚便當' || this.selectProduct.name === '素排便當' || this.selectProduct.name === '雞腿便當') {
          return 'true'
        }
      }
      return 'false'
    },
    drinkTotalCost () {
      if (this.selectDrink) {
        return this.selectDrink.total * this.drink_quantity
      }
      return 0
    },
    halfMainTotalCost () {
      if (this.selectHaif_main) {
        return this.selectHaif_main.total * this.half_main_quantity
      }
      return 0
    },
    dish1TotalCost () {
      if (this.selectSide_dish1) {
        return this.selectSide_dish1.total * this.dish1_quantity
      }
      return 0
    },
    dish2TotalCost () {
      if (this.selectSide_dish2) {
        return this.selectSide_dish2.total * this.dish2_quantity
      }
      return 0
    },
    dish3TotalCost () {
      if (this.selectSide_dish3) {
        return this.selectSide_dish3.total * this.dish3_quantity
      }
      return 0
    },
    dish4TotalCost () {
      if (this.selectSide_dish4) {
        return this.selectSide_dish4.total * this.dish4_quantity
      }
      return 0
    },
    dish5TotalCost () {
      if (this.selectSide_dish5) {
        return this.selectSide_dish5.total * this.dish5_quantity
      }
      return 0
    },
    dish6TotalCost () {
      if (this.selectSide_dish6) {
        return this.selectSide_dish6.total * this.dish6_quantity
      }
      return 0
    },
    dish7TotalCost () {
      if (this.selectSide_dish7) {
        return this.selectSide_dish7.total * this.dish7_quantity
      }
      return 0
    },
    dish8TotalCost () {
      if (this.selectSide_dish8) {
        return this.selectSide_dish8.total * this.dish8_quantity
      }
      return 0
    },
    packagingTotalCost () {
      if (this.selectpackaging) {
        return this.selectpackaging.total * this.packaging_quantity
      }
      return 0
    },
    totalPrice () {
      if (this.selectProduct.price) {
        return this.selectProduct.price + this.drink_quantity * 15
      } else if (this.selectProduct.total) {
        return this.selectProduct.total + this.drink_quantity * 15
      } else {
        return '客製售價開發中'
      }
    },
    totalAll () {
      const num = (this.burrito6iTotalCost + this.drinkTotalCost + this.dish1TotalCost + this.dish2TotalCost + this.dish3TotalCost + this.dish4TotalCost + this.dish5TotalCost + this.dish6TotalCost + this.dish7TotalCost + this.dish8TotalCost + this.halfMainTotalCost + this.packagingTotalCost)
      const numStr = num.toString()
      const decimalIndex = numStr.indexOf('.')

      if (decimalIndex !== -1) { // 检查是否有小数点
        const decimalPart = numStr.slice(decimalIndex + 1)
        if (decimalPart.length > 3) {
          return num.toFixed(3) // 如果小数位超过三位，格式化为三位小数
        }
      }
      return num
    },
    // 成分成本計算
    totalAmount () {
      let num = 0
      if (this.selectBom) {
        this.selectBom.items.forEach(element => {
          num = num + element.amount
        })
        const numStr = num.toString()
        const decimalIndex = numStr.indexOf('.')

        if (decimalIndex !== -1) { // 检查是否有小数点
          const decimalPart = numStr.slice(decimalIndex + 1)
          if (decimalPart.length > 3) {
            return num.toFixed(3) // 如果小数位超过三位，格式化为三位小数
          }
        }
        return num
      }
      return num
    },
    // 百
    burrito6iPercentage () {
      if (this.selectBurrito6i && this.totalAll > 0) {
        return ((this.burrito6iTotalCost / this.totalAll) * 100).toFixed(2) + '%'
      }
      return '0%'
    },
    drinkPercentag () {
      if (this.selectDrink && this.totalAll > 0) {
        return ((this.drinkTotalCost / this.totalAll) * 100).toFixed(2) + '%'
      }
      return '0%'
    },
    dish1Percentag () {
      if (this.selectSide_dish1 && this.totalAll > 0) {
        return ((this.dish1TotalCost / this.totalAll) * 100).toFixed(2) + '%'
      }
      return '0%'
    },
    dish2Percentag () {
      if (this.selectSide_dish2 && this.totalAll > 0) {
        return ((this.dish2TotalCost / this.totalAll) * 100).toFixed(2) + '%'
      }
      return '0%'
    },
    dish3Percentag () {
      if (this.selectSide_dish3 && this.totalAll > 0) {
        return ((this.dish3TotalCost / this.totalAll) * 100).toFixed(2) + '%'
      }
      return '0%'
    },
    dish4Percentag () {
      if (this.selectSide_dish4 && this.totalAll > 0) {
        return ((this.dish4TotalCost / this.totalAll) * 100).toFixed(2) + '%'
      }
      return '0%'
    },
    dish5Percentag () {
      if (this.selectSide_dish5 && this.totalAll > 0) {
        return ((this.dish5TotalCost / this.totalAll) * 100).toFixed(2) + '%'
      }
      return '0%'
    },
    dish6Percentag () {
      if (this.selectSide_dish6 && this.totalAll > 0) {
        return ((this.dish6TotalCost / this.totalAll) * 100).toFixed(2) + '%'
      }
      return '0%'
    },
    dish7Percentag () {
      if (this.selectSide_dish7 && this.totalAll > 0) {
        return ((this.dish7TotalCost / this.totalAll) * 100).toFixed(2) + '%'
      }
      return '0%'
    },
    packagingPercentag () {
      if (this.selectpackaging && this.totalAll > 0) {
        return ((this.packagingTotalCost / this.totalAll) * 100).toFixed(2) + '%'
      }
      return '0%'
    },
    half_mainPercentag () {
      if (this.selectHaif_main && this.totalAll > 0) {
        return ((this.halfMainTotalCost / this.totalAll) * 100).toFixed(2) + '%'
      }
      return '0%'
    },
    filteredBomData () {
      if (!this.selectedType) {
        return []
      }
      console.log(this.selectedType.value)
      return this.bomData.filter(item => item.type === this.selectedType.value)
    }
  },
  watch: {
    selectProduct (newVal, oldVal) {
      if (newVal !== null && this.useType === '1') {
        this.getProductCombo(newVal)
        //   if (this.clean === false) {
        //     if (newVal.name === '雞胸便當' || newVal.name === '滷牛便當' || newVal.name === '雞腿便當' || newVal.name === '鮭魚便當' || newVal.name === '素排便當125元' || newVal.name === '素排便當150元') {
        //       this.show_half_main = true
        //     } else {
        //       this.show_half_main = false
        //     }
        if (newVal.name === '素食便當' || newVal.name === '素排便當125元' || newVal.name === '素排便當150元') {
          this.burrito6i = this.veg_product
          this.burrito6i = this.burrito6i.map(item => {
            return {
              ...item,
              name: item.name.replace(/6/g, '3')
            }
          })
        } else {
          this.burrito6i = this.bomData.filter(item => item.option_name === '6吋潤餅')
          this.burrito6i = this.burrito6i.map(item => {
            return {
              ...item,
              name: item.name.replace(/6/g, '3')
            }
          })
        }
      }
    //     if (newVal !== oldVal) {
    //       this.EnterSideDish2()
    //     }
    //   }
    },
    selectCombo (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getCombo()
      }
    },
    browse (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.cleanBOM()
      }
    },
    useType (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.cleanBOM()
      }
    },
    selectedType (newVal, oldVal) {
      this.selectBom = null // 清空第二個下拉選單的選擇
    }
    // selectBento (newVal, oldVal) {
    //   this.selectProduct = null
    // }

  },
  mounted () {
    this.getdata()
  },
  methods: {
    async  getdata () {
      const result = await apiAuth.get('/analysis/bom_items')
      this.setTypeData = result.data.type
      this.bomData = result.data.data
      this.bomDataElement = this.bomData
      this.comboData = result.data.combo_data
      this.burrito6i = this.bomData.filter(item => item.option_name === '6吋潤餅')
      this.burrito6i = this.burrito6i.map(item => {
        return {
          ...item,
          name: item.name.replace(/6/g, '3')
        }
      })
      this.veg_product = this.bomData.filter(item => item.name === '全素潤餅6吋' || item.name === '薯泥潤餅6吋')
      this.drink = this.bomData.filter(item => item.option_name === '飲料')
      this.side_dish = this.bomData.filter(item => item.option_name === '配菜')
      this.packaging = this.bomData.filter(item => item.name.includes('包材'))
      // 便當配菜
      this.side_dish_bento = this.side_dish.filter(item => item.name === '鹽水煮蛋' || item.name === '廚娘油飯' || item.name === '梅汁蕃茄' || item.name === '香滷豆干' || item.name === '酥炸菇菇' || item.name === '蛋塔' || item.name === '芋頭糕' || item.name === '烤地瓜')
      this.veg = this.side_dish.filter(item => item.name === '調味毛豆' || item.name === '玉米')
      console.log(this.side_dish)
      this.veg_change.total = parseFloat(this.veg[0].total) + parseFloat(this.veg[1].total)
      this.veg_change.items = this.veg
      this.side_dish_bento.push(this.veg_change)
      this.half_main = this.bomData.filter(item => item.name === '滷牛腱' || item.name === '滷雞腿' || item.name === '素肉排' || item.name === '燻鮭魚' || item.name === '嫩雞胸')
    },
    // selectedQuantity (newValue) {
    //   const selectedItem = this.side_dish_bento.find(item => item.product_id === this.selectSide_dish1)
    //   if (selectedItem) {
    //     selectedItem.total = newValue // 当数量输入变化时，更新对应的数据
    //   }
    // },
    // EnterSideDish2 () {
    //   this.$nextTick(() => {
    //     if (this.selectBento.name === '便當' && this.selectProduct && this.useType !== '2') {
    //       for (let i = 0; i < this.side_dish_bento.length; i++) {
    //         if (this.selectSide_dish1 == null) {
    //           this.selectSide_dish1 = this.side_dish_bento[i]
    //           this.dish1_quantity = 1
    //           continue
    //         }
    //         if (this.selectSide_dish2 == null) {
    //           this.selectSide_dish2 = this.side_dish_bento[i]
    //           this.dish2_quantity = 1
    //           continue
    //         }
    //         if (this.selectSide_dish3 == null) {
    //           this.selectSide_dish3 = this.side_dish_bento[i]
    //           this.dish3_quantity = 1
    //           continue
    //         }
    //         if (this.selectSide_dish4 == null) {
    //           this.selectSide_dish4 = this.side_dish_bento[i]
    //           this.dish4_quantity = 1
    //           continue
    //         }
    //         if (this.selectSide_dish5 == null) {
    //           this.selectSide_dish5 = this.side_dish_bento[i]
    //           this.dish5_quantity = 1
    //           continue
    //         }
    //         if (this.selectSide_dish6 == null) {
    //           this.selectSide_dish6 = this.side_dish_bento[i]
    //           this.dish6_quantity = 0
    //           continue
    //         }
    //         if (this.selectSide_dish7 == null) {
    //           this.selectSide_dish7 = this.side_dish_bento[i]
    //           this.dish7_quantity = 1
    //           continue
    //         }
    //       }
    //     }
    //     if (this.selectProduct.name === '雞胸便當') {
    //       this.selectHaif_main = this.half_main.filter(item => item.name === '嫩雞胸')
    //       this.selectHaif_main = this.selectHaif_main[0]
    //       this.half_main_quantity = 1
    //     }
    //     if (this.selectProduct.name === '滷牛便當') {
    //       this.selectHaif_main = this.half_main.filter(item => item.name === '滷牛腱')
    //       this.selectHaif_main = this.selectHaif_main[0]
    //       this.half_main_quantity = 1
    //     }
    //     if (this.selectProduct.name === '鮭魚便當') {
    //       this.selectHaif_main = this.half_main.filter(item => item.name === '燻鮭魚')
    //       this.selectHaif_main = this.selectHaif_main[0]
    //       this.half_main_quantity = 1
    //     }
    //     if (this.selectProduct.name === '雞腿便當') {
    //       this.selectHaif_main = this.half_main.filter(item => item.name === '滷雞腿')
    //       this.selectHaif_main = this.selectHaif_main[0]
    //       this.half_main_quantity = 1
    //     }
    //     if (this.selectProduct.name === '素排便當125元' || this.selectProduct.name === '素排便當150元') {
    //       this.selectHaif_main = this.half_main.filter(item => item.name === '素肉排')
    //       this.selectHaif_main = this.selectHaif_main[0]
    //       this.half_main_quantity = 1
    //       if (this.selectProduct.name === '素排便當150元') {
    //         this.dish7_quantity = 2
    //       }
    //     }
    //   })
    // },
    updatecombo () {
      if (!this.selectProduct) {
        this.$q.notify({
          message: '請選擇商品',
          color: 'red-4',
          icon: 'warning',
          position: 'bottom'
        })
      }
      if (!this.selectBurrito6i) {
        this.$q.notify({
          message: '請選擇潤餅',
          color: 'red-4',
          icon: 'warning',
          position: 'bottom'
        })
      }
      if (this.selectDrink) {
        this.combo_name = this.selectProduct.name + this.selectBurrito6i.name + this.selectDrink.name
      } else {
        this.combo_name = this.selectProduct.name + this.selectBurrito6i.name
      }
      this.selectProduct.total = this.selectProduct.price
      const payload = {
        total: this.totalAll,
        name: this.combo_name,
        items: []
      }
      payload.items.push(this.selectBento)
      payload.items.push(this.selectProduct)
      payload.items.push(this.selectBurrito6i)
      payload.items.push(this.selectDrink)
      payload.items.push(this.selectSide_dish1)
      payload.items.push(this.selectSide_dish2)
      payload.items.push(this.selectSide_dish3)
      payload.items.push(this.selectSide_dish4)
      payload.items.push(this.selectSide_dish5)
      payload.items.push(this.selectSide_dish6)
      payload.items.push(this.selectSide_dish7)
      payload.items.push(this.selectSide_dish8)
      apiAuth.post('/analysis/update_combo', payload)
      this.$q.notify({
        message: '儲存成功',
        color: 'info',
        icon: 'warning',
        position: 'bottom'
      })
      // this.cleanBOM()
      // this.useType = '2'
    },
    async getProductCombo (id) {
      const payload = {
        product_id: id.product_id
      }
      const result = await apiAuth.post('/analysis/getBomProductItems', payload)
      this.realCombo = result.data.data
      if (this.realCombo.length > 0) {
        const sidedish = this.realCombo.filter(item => item.type === 1005)
        const halfmain = this.realCombo.filter(item => item.type === 1007)
        if (halfmain.length > 0) {
          this.selectHaif_main = halfmain[0]
          this.half_main_quantity = 1
          this.show_half_main = true
        } else {
          this.selectHaif_main = null
          this.half_main_quantity = 0
          this.show_half_main = false
        }
        // packaging
        if (sidedish) {
          sidedish.forEach((v, i) => {
            if (v.name === '時蔬') {
              v.total = this.veg_change.total
            }
            if (i === 0) {
              this.selectSide_dish1 = v
              if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
                this.dish1_quantity = 2
              } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
                this.dish1_quantity = 2
              } else if (v.is_default === 1) {
                this.dish1_quantity = 1
              } else {
                this.dish1_quantity = 0
              }
            }
            // v.is_default === 1
            if (i === 1) {
              this.selectSide_dish2 = v
              if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
                this.dish2_quantity = 2
              } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
                this.dish2_quantity = 2
              } else if (v.is_default === 1) {
                this.dish2_quantity = 1
              } else {
                this.dish2_quantity = 0
              }
            }
            if (i === 2) {
              this.selectSide_dish3 = v
              if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
                this.dish3_quantity = 2
              } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
                this.dish3_quantity = 2
              } else if (v.is_default === 1) {
                this.dish3_quantity = 1
              } else {
                this.dish3_quantity = 0
              }
            }
            if (i === 3) {
              this.selectSide_dish4 = v
              if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
                this.dish4_quantity = 2
              } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
                this.dish4_quantity = 2
              } else if (v.is_default === 1) {
                this.dish4_quantity = 1
              } else {
                this.dish4_quantity = 0
              }
            }
            if (i === 4) {
              this.selectSide_dish5 = v
              if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
                this.dish5_quantity = 2
              } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
                this.dish5_quantity = 2
              } else if (v.is_default === 1) {
                this.dish5_quantity = 1
              } else {
                this.dish5_quantity = 0
              }
            }
            if (i === 5) {
              this.selectSide_dish6 = v
              if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
                this.dish6_quantity = 2
              } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
                this.dish6_quantity = 2
              } else if (v.is_default === 1) {
                this.dish6_quantity = 1
              } else {
                this.dish6_quantity = 0
              }
            }
            if (i === 6) {
              this.selectSide_dish7 = v
              if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
                this.dish7_quantity = 2
              } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
                this.dish7_quantity = 2
              } else if (v.is_default === 1) {
                this.dish7_quantity = 1
              } else {
                this.dish7_quantity = 0
              }
            }
            if (i === 7) {
              this.selectSide_dish8 = v
              if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
                this.dish8_quantity = 2
              } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
                this.dish8_quantity = 2
              } else if (v.is_default === 1) {
                this.dish8_quantity = 1
              } else {
                this.dish8_quantity = 0
              }
            }
          })
        }
        if (this.packaging) {
          this.packaging.forEach((v, i) => {
            if (this.selectBento.name === '便當' && this.half_main_quantity === 1 && v.name === '包材-大便當盒') {
              this.selectpackaging = v
            } else if ((this.selectProduct.name === '貴賓盒餐' || this.selectProduct.name === '首席盒餐') && v.name === '包材-大手提餐盒') {
              this.selectpackaging = v
            } else if ((this.selectProduct.name === '招牌便當' || this.selectProduct.name === '素食便當') && v.name === '包材-小便當盒') {
              this.selectpackaging = v
            } else {
              this.selectpackaging = null
            }
          })
        }
        // kevin
        // side_dish_bento
      }
    },
    getCombo () {
      if (this.selectCombo) {
        const getproduct = this.comboData.filter(item => item.name === this.selectCombo.name)
        this.selectBento = getproduct[0].items.filter(item => item.name === '便當')
        this.selectBento = this.selectBento[0]
        this.selectProduct = getproduct[0].items.filter(item => item.name.includes('便當') && item.name !== '便當')
        console.log(this.selectProduct[0])
        this.selectProduct = this.selectProduct[0]
        this.selectBurrito6i = getproduct[0].items.filter(item => item.name.includes('潤餅'))
        this.selectBurrito6i = this.selectBurrito6i[0]
        this.selectDrink = getproduct[0].items.filter(item => item.type_id === 1004)
        this.selectDrink = this.selectDrink[0]
        if (this.selectDrink) {
          this.drink_quantity = 1
        }
        const getsidedish = getproduct[0].items.filter(item => item.type_id === 1005)
        console.log(getproduct[0].items.filter(item => item.type_id === 1005))
        getsidedish.forEach((v, i) => {
          if (v.name === '時蔬') {
            v.total = this.veg_change.total
          }
          if (i === 0) {
            this.selectSide_dish1 = v
            if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
              this.dish1_quantity = 2
            } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
              this.dish1_quantity = 2
            } else {
              this.dish1_quantity = 1
            }
          }
          // v.is_default === 1
          if (i === 1) {
            this.selectSide_dish2 = v
            if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
              this.dish2_quantity = 2
            } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
              this.dish2_quantity = 2
            } else {
              this.dish2_quantity = 1
            }
          }
          if (i === 2) {
            this.selectSide_dish3 = v
            if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
              this.dish3_quantity = 2
            } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
              this.dish3_quantity = 2
            } else {
              this.dish3_quantity = 1
            }
          }
          if (i === 3) {
            this.selectSide_dish4 = v
            if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
              this.dish4_quantity = 2
            } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
              this.dish4_quantity = 2
            } else {
              this.dish4_quantity = 1
            }
          }
          if (i === 4) {
            this.selectSide_dish5 = v
            if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
              this.dish5_quantity = 2
            } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
              this.dish5_quantity = 2
            } else {
              this.dish5_quantity = 1
            }
          }
          if (i === 5) {
            this.selectSide_dish6 = v
            if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
              this.dish6_quantity = 2
            } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
              this.dish6_quantity = 2
            } else {
              this.dish6_quantity = 1
            }
          }
          if (i === 6) {
            this.selectSide_dish7 = v
            if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
              this.dish7_quantity = 2
            } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
              this.dish7_quantity = 2
            } else {
              this.dish7_quantity = 1
            }
          }
          if (i === 7) {
            this.selectSide_dish8 = v
            if (this.selectProduct.name === '素排便當150元' && v.name === '時蔬') {
              this.dish8_quantity = 2
            } else if (this.selectBento.name === '飯盒' && v.name === '香菇油飯') {
              this.dish8_quantity = 2
            } else {
              this.dish8_quantity = 1
            }
          }
        })
      }
    },
    cleanBOM () {
      this.clean = true
      this.selectBento = null
      this.selectProduct = null
      this.selectBurrito6i = null
      this.selectDrink = null
      this.selectSide_dish1 = null
      this.selectSide_dish2 = null
      this.selectSide_dish3 = null
      this.selectSide_dish4 = null
      this.selectSide_dish5 = null
      this.selectSide_dish6 = null
      this.selectSide_dish7 = null
      this.selectSide_dish8 = null
      this.selectCombo = null
      this.clean = false
    }
  }
}
</script>
<style>
.div-border {
  border: 2px solid #ccc;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-bottom: 20px; /* 添加底部間隔 */
}
.primary {
  color: #f50077;
}
</style>
