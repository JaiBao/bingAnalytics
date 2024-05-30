import { defineStore } from 'pinia'
// import { computed } from 'vue'
// import { LocalStorage } from 'quasar'
import { apiAuth } from 'src/boot/axios'
import { DateTime } from 'luxon'

const today = DateTime.local().toFormat('yyyy-MM-dd')
export const UseMealStore = defineStore('meal', {
  state: () => ({
    order: [],
    id: '',
    orderdetails: [],
    tableRows: [],
    tableRows2: [],
    status_id: '',
    reOrderDate: '', // yyyy-MM-dd
    reOrderTime: '', // HH:mm
    shouldEdit: false,
    reorderSuccess: false,
    notsavemeals: false,
    orderSaved: false
  }),
  getters: {},
  actions: {
    async sent () {
      const formData = new FormData()
      // 添加基本的訂單信息
      formData.append('order_id', '') // 訂單編號
      formData.append('customer_id', this.order.customer_id) // 訂購人編號
      formData.append('order_date', today) // 訂購日期
      formData.append('shipping_method', this.order.shipping_method) // 取貨方式
      formData.append('delivery_date_ymd', this.reOrderDate) // 送達日
      formData.append('delivery_date_hi', this.reOrderTime.substring(0, 5)) // 送達時間
      formData.append('delivery_time_range', this.reOrderTime) // 送達時間範圍
      formData.append('shipping_road_abbr', this.order.shipping_road_abbr) // 送達路段
      formData.append('personal_name', this.order.personal_name) // 訂購人姓名
      formData.append('salutation_id', 18) // 稱謂(即性別，先生/小姐)
      formData.append('mobile', this.order.mobile) // 訂購人手機
      formData.append('telephone_prefix', this.order.telephone_prefix) // 區碼
      formData.append('telephone', this.order.telephone) // 訂購人電話
      formData.append('payment_company', this.order.payment_company) // 訂購公司
      formData.append('payment_department', this.order.payment_department) // 訂購公司部門
      formData.append('payment_tin', this.order.payment_tin) // 統一編號
      formData.append('is_payment_tin', this.order.is_payment_tin) // 是否需要統編
      formData.append('payment_method', this.order.payment_method) //  付款方式
      formData.append('payment_total', this.order.payment_total) //  總金額
      formData.append('payment_paid', this.order.payment_paid) //  付款金額
      formData.append('payment_unpaid', this.order.payment_unpaid) //  未付餘額
      formData.append(
        'shipping_personal_name',
        this.order.shipping_personal_name
      ) //  personForm.recipient
      formData.append('shipping_state_id', this.order.shipping_state_id) //  縣市代號
      formData.append('shipping_city_id', this.order.shipping_city_id) //  鄉鎮市區代號
      formData.append('shipping_road', this.order.shipping_road) //  送達地址
      formData.append('shipping_address1', this.order.shipping_address1) //  送達地址
      formData.append('payment_company', this.order.payment_company) //  收件公司
      formData.append('shipping_phone', this.order.shipping_phone) //  收件人電話
      formData.append('comment', this.order.comment) //  客戶備註
      formData.append('extra_comment', this.order.extra_comment) //  餐點備註
      formData.append('status_id', this.order.status_id) // 設定訂單狀態
      formData.append('location_id', this.order.location_id) // 設定訂單狀態

      formData.append('order_totals[sub_total][title]', '商品合計') // 商品合計
      formData.append(
        'order_totals[sub_total][value]',
        this.order.payment_unpaid
      )
      formData.append('order_totals[discount][title]', '優惠折扣') // 優惠折扣
      formData.append('order_totals[discount][value]', '0')
      formData.append('order_totals[shipping_fee][title]', '運費') // 運費
      formData.append('order_totals[shipping_fee][value]', 0)
      formData.append('order_totals[total][title]', '總計') // 總計
      formData.append('order_totals[total][value]', this.order.payment_unpaid)

      // 添加訂單產品
      for (const row of this.tableRows) {
        for (const productInput of row.productInputs) {
          if (Object.prototype.hasOwnProperty.call(productInput, 'name')) {
            formData.append(
              `order_products[${row.id}][product_id]`,
              productInput.id
            )
            formData.append(
              `order_products[${row.id}][name]`,
              productInput.name
            )
            formData.append(
              `order_products[${row.id}][quantity]`,
              productInput.value
            )
            formData.append(
              `order_products[${row.id}][price]`,
              productInput.price
            )
            formData.append(
              `order_products[${row.id}][total]`,
              productInput.totalPrice
            )
            formData.append(
              `order_products[${row.id}][final_total]`,
              productInput.totalPrice
            )
            formData.append(
              `order_products[${row.id}][comment]`,
              productInput.comment
            )
          }
        }

        let productOptionIndex = 1
        for (const productInput of row.productInputs) {
          if (
            typeof productInput.productTypeId !== 'undefined' &&
            typeof productInput.productType !== 'undefined' &&
            typeof productInput.productTypeName !== 'undefined'
          ) {
            formData.append(
              `order_products[${row.id}][product_options][${productOptionIndex}][product_option_id]`,
              productInput.productTypeId
            )
            formData.append(
              `order_products[${row.id}][product_options][${productOptionIndex}][type]`,
              productInput.productType
            )
            formData.append(
              `order_products[${row.id}][product_options][${productOptionIndex}][name]`,
              productInput.productTypeName
            )

            let productOptionValueIndex = 1
            for (const input of row.inputs) {
              if (
                input.mainId === productInput.mainId &&
                input.type === productInput.type
              ) {
                if (!input.name.includes('任意搭配')) {
                  if (input.name !== 'Arbitrarily') {
                    formData.append(
                      `order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][product_option_value_id]`,
                      input.id
                    )
                    formData.append(
                      `order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][value]`,
                      input.name
                    )
                    formData.append(
                      `order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][quantity]`,
                      input.value
                    )
                    if (input.mainId) {
                      formData.append(
                        `order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][parent_povid]`,
                        input.mainId
                      )
                    }

                    productOptionValueIndex++
                  }
                }
              }
            }
            productOptionIndex++
          }
        }
      }
      // 發送訂單到API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(formData)
      const response = await apiAuth.post('sale/order/save', formData)
      console.log(response.data)
      // 清空 tableRows
      this.tableRows.splice(0, this.tableRows.length)
      this.tableRows2.splice(0, this.tableRows2.length)
      this.order = []
      this.orderdetails = []
      return response.data
    },
    async getorder (val) {
      try {
        this.order.splice(0, this.order.length)
        const result = await apiAuth.get(`sale/order/${val}`)
        this.order = result.data
        this.orderdetails = result.data.order_products
        this.id = val
        this.status_id = result.data.status_txt
      } catch (error) {
        console.error('Failed to get state:', error)
      }
    },
    insertDataIntoTableRows (data) {
      console.log(data)
      // 创建一个新的row对象来存放便当信息
      const nextId =
        this.tableRows.length > 0
          ? this.tableRows[this.tableRows.length - 1].id + 1
          : 1
      const Bangdong = (data) => {
        console.log(data.total)
        row.comment = data.comment
        row.quantity = data.quantity
        row.productInputs.push({
          id: data.product_id,
          name: data.name,
          value: data.quantity,
          price: data.price,
          totalPrice: data.final_total,
          comment: data.comment
        })
        if (data.order_product_options) {
          // 创建一个对象来存储主餐选项及其数量
          const mainOptions = {}
          // 创建一个数组来存储所有饮料选项及其数量
          const drinkOptions = []
          // 遍历order_product_options数组，每个数据项代表一个便当选项
          for (const item of data.order_product_options) {
            // 判断便当选项类型并推入对应的数组
            switch (item.name) {
              case '主餐':
                // 将所有主餐选项及其数量存储到mainOptions对象中
                if (mainOptions[item.value]) {
                  mainOptions[item.value] += parseInt(item.quantity)
                } else {
                  mainOptions[item.value] = parseInt(item.quantity)
                }
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 1
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 1
                })
                break
              case '飲料':
                // 将所有饮料选项及其数量存储到drinkOptions数组中
                drinkOptions.push({
                  value: item.value,
                  quantity: parseInt(item.quantity)
                })
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 2
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 2
                })
                break
              case '配菜':
                row.sideDishes = item.value + ' x ' + item.quantity + '<br>'
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 3
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 3
                })
                break
              case '副主餐':
                row.bentoMains = item.value + ' x ' + item.quantity + '<br>'
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 4
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 4
                })
                break
              default:
                break
            }
          }
          // 将mainOptions对象中的所有主餐选项及其数量合并到Main中
          for (const option in mainOptions) {
            row.Main += option + ' x ' + mainOptions[option] + '<br>'
          }
          // 将drinkOptions数组中的所有饮料选项及其数量合并到drinks中
          for (const option of drinkOptions) {
            row.drinks += option.value + ' x ' + option.quantity + '<br>'
          }
        }
        // 将这个row推进tableRows数组中
        console.log(row)
        this.tableRows.push(row)
      }
      const Lunchbox = (data) => {
        row.comment = data.comment
        row.quantity = data.quantity
        row.productInputs.push({
          id: data.product_id,
          name: data.name,
          value: data.quantity,
          price: data.price,
          totalPrice: data.final_total,
          comment: data.comment
        })
        if (data.order_product_options) {
          // 创建一个对象来存储主餐选项及其数量
          const mainOptions = {}
          // 创建一个数组来存储所有饮料选项及其数量
          const drinkOptions = []
          // 遍历order_product_options数组，每个数据项代表一个便当选项
          for (const item of data.order_product_options) {
            // 判断便当选项类型并推入对应的数组
            switch (item.name) {
              case '主餐':
                // 将所有主餐选项及其数量存储到mainOptions对象中
                if (mainOptions[item.value]) {
                  mainOptions[item.value] += parseInt(item.quantity)
                } else {
                  mainOptions[item.value] = parseInt(item.quantity)
                }
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 1
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 1
                })
                break
              case '飲料':
                // 将所有饮料选项及其数量存储到drinkOptions数组中
                drinkOptions.push({
                  value: item.value,
                  quantity: parseInt(item.quantity)
                })
                row.productInputs.push({
                  mainId: item.parent_product_option_value_id,
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 2
                })
                row.inputs.push({
                  mainId: item.parent_product_option_value_id,
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 2
                })
                break
              case '配菜':
                row.sideDishes = item.value + ' x ' + item.quantity + '<br>'
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 3
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 3
                })
                break
              case '副主餐':
                row.bentoMains = item.value + ' x ' + item.quantity + '<br>'
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 4
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 4
                })
                break
              // 如果有其他类型的便当选项，可以继续添加case
              default:
                break
            }
          }
          // 将mainOptions对象中的所有主餐选项及其数量合并到Main中
          for (const option in mainOptions) {
            row.Main += option + ' x ' + mainOptions[option] + '<br>'
          }
          // 将drinkOptions数组中的所有饮料选项及其数量合并到drinks中
          for (const option of drinkOptions) {
            row.drinks += option.value + ' x ' + option.quantity + '<br>'
          }
        }
        // 将这个row推进tableRows数组中
        console.log(row)
        this.tableRows.push(row)
      }
      const Solo = (data) => {
        row.comment = data.comment
        row.quantity = data.quantity
        row.productInputs.push({
          id: data.product_id,
          name: data.name,
          value: data.quantity,
          price: data.price,
          totalPrice: data.final_total,
          comment: data.comment
        })
        if (data.order_product_options) {
          // 创建一个对象来存储主餐选项及其数量
          const mainOptions = {}
          // 创建一个数组来存储所有饮料选项及其数量
          const drinkOptions = []
          // 遍历order_product_options数组，每个数据项代表一个便当选项
          for (const item of data.order_product_options) {
            // 判断便当选项类型并推入对应的数组
            switch (item.name) {
              case '6吋潤餅':
                // 将所有主餐选项及其数量存储到mainOptions对象中
                if (mainOptions[item.value]) {
                  mainOptions[item.value] += parseInt(item.quantity)
                } else {
                  mainOptions[item.value] = parseInt(item.quantity)
                }
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 5
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 5
                })
                break
              case '3吋潤餅':
                // 将所有饮料选项及其数量存储到drinkOptions数组中
                drinkOptions.push({
                  value: item.value,
                  quantity: parseInt(item.quantity)
                })
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 6
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 6
                })
                break
              case '飲料':
                row.drinks = item.value + ' x ' + item.quantity + '<br>'
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 7
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 7
                })
                break
              case '配菜':
                row.sideDishes = item.value + ' x ' + item.quantity + '<br>'
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 8
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 8
                })
                break
              case '副主餐':
                row.bentoMains = item.value + ' x ' + item.quantity + '<br>'
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 9
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 9
                })
                break
              case '環保袋':
                row.bentoMains = item.value + ' x ' + item.quantity
                row.productInputs.push({
                  productTypeId: item.product_option_id,
                  productTypeName: item.name,
                  productType: item.type,
                  type: 0
                })
                row.inputs.push({
                  id: item.product_option_value_id,
                  name: item.value,
                  value: parseInt(item.quantity),
                  type: 0
                })
                break
              // 如果有其他类型的便当选项，可以继续添加case
              default:
                break
            }
          }
          // 将mainOptions对象中的所有主餐选项及其数量合并到Main中
          for (const option in mainOptions) {
            row.Main += option + ' x ' + mainOptions[option] + ' '
          }
          // 将drinkOptions数组中的所有饮料选项及其数量合并到drinks中
          for (const option of drinkOptions) {
            row.drinks += option.value + ' x ' + option.quantity + ' '
          }
        }
        // 将这个row推进tableRows数组中
        console.log(row)
        this.tableRows.push(row)
      }
      const row = {
        bentoType: 1,
        id: nextId,
        name: data.name + ' x ' + data.quantity + '份',
        Main: '',
        drinks: '',
        sideDishes: '',
        bentoMains: '',
        sideDishDefault: '',
        quantity: '',
        price: parseInt(data.total.replace(',', ''), 10),
        inputs: [],
        productInputs: [],
        comment: ''
      }
      if (data.name === '招牌便當') {
        row.bentoType = 1
        Bangdong(data)
      } else if (data.name === '雞胸便當') {
        row.bentoType = 2
        Bangdong(data)
      } else if (data.name === '雞腿便當') {
        row.bentoType = 3
        Bangdong(data)
      } else if (data.name === '滷牛便當') {
        row.bentoType = 4
        Bangdong(data)
      } else if (data.name === '經濟盒餐') {
        row.bentoType = 5
        Lunchbox(data)
      } else if (data.name === '會議盒餐') {
        row.bentoType = 6
        Lunchbox(data)
      } else if (data.name === '貴賓盒餐') {
        row.bentoType = 7
        Lunchbox(data)
      } else if (data.name === '首席盒餐') {
        row.bentoType = 8
        Lunchbox(data)
      } else if (data.name === '客製便當') {
        row.bentoType = 9
        Bangdong(data)
      } else if (data.name === '其它商品組') {
        row.bentoType = 10
        Solo(data)
      } else if (data.name === '客製盒餐') {
        row.bentoType = 0
        Lunchbox(data)
      } else if (data.name === '素排便當125元') {
        row.bentoType = 11
        Bangdong(data)
      } else if (data.name === '素排便當150元') {
        row.bentoType = 12
        Bangdong(data)
      } else if (data.name === '鮭魚便當') {
        row.bentoType = 13
        Bangdong(data)
      }
    },
    async reOrder (val) {
      try {
        this.order.splice(0, this.order.length)
        this.orderdetails.splice(0, this.orderdetails.length)
        this.tableRows.splice(0, this.tableRows.length)
        await this.getorder(val)
        for (let i = 0; i < this.orderdetails.length; i++) {
          await this.insertDataIntoTableRows(this.orderdetails[i])
        }
        await new Promise((resolve) => setTimeout(resolve, 500))
        await this.sent()
        this.reorderSuccess = true
      } catch (error) {
        console.error(error)
        // $q.notify({
        //   color: 'red-4',
        //   textColor: 'white',
        //   icon: 'error',
        //   position: 'center',
        //   message: 'An error occurred: ' + error.message
        // })
      } finally {
        this.order = []
        this.id = ''
      }
    },
    async onlySaveOrder () {
      const formData = new FormData()
      formData.append('order_id', this.order.id) // 訂單編號
      formData.append('customer_id', this.order.customer_id) // 訂購人編號
      formData.append('order_date', this.order.order_date) // 訂購日期
      formData.append('shipping_method', this.order.shipping_method) // 取貨方式
      formData.append('delivery_date_ymd', this.order.delivery_date_ymd) // 送達日
      formData.append('delivery_date_hi', this.order.delivery_date_hi) // 送達時間
      formData.append('delivery_time_range', this.order.delivery_time_range) // 送達時間範圍
      formData.append('shipping_road_abbr', this.order.shipping_road_abbr) // 送達路段
      formData.append('personal_name', this.order.personal_name) // 訂購人姓名
      formData.append('salutation_id', 18) // 稱謂(即性別，先生/小姐)
      formData.append('mobile', this.order.mobile) // 訂購人手機
      formData.append('telephone_prefix', this.order.telephone_prefix) // 區碼
      formData.append('telephone', this.order.telephone) // 訂購人電話
      formData.append('payment_company', this.order.payment_company) // 訂購公司
      formData.append('payment_department', this.order.payment_department) // 訂購公司部門
      formData.append('payment_tin', this.order.payment_tin) // 統一編號
      formData.append('is_payment_tin', this.order.is_payment_tin) // 是否需要統編
      formData.append('payment_method', this.order.payment_method) //  付款方式
      formData.append('payment_total', this.order.payment_total) //  總金額
      formData.append('payment_paid', this.order.payment_paid) //  付款金額
      formData.append('payment_unpaid', this.order.payment_unpaid) //  未付餘額
      // formData.append("order_tags", personForm.event); //  訂單標籤
      formData.append(
        'shipping_personal_name',
        this.order.shipping_personal_name
      ) //  personForm.recipient
      formData.append('shipping_state_id', this.order.shipping_state_id) //  縣市代號
      formData.append('shipping_city_id', this.order.shipping_city_id) //  鄉鎮市區代號
      formData.append('shipping_road', this.order.shipping_road) //  送達地址
      formData.append('shipping_address1', this.order.shipping_address1) //  送達地址
      formData.append('payment_company', this.order.payment_company) //  收件公司
      formData.append('shipping_phone', this.order.shipping_phone) //  收件人電話
      formData.append('comment', this.order.comment) //  客戶備註
      formData.append('extra_comment', this.order.extra_comment) //  餐點備註
      formData.append('status_id', this.order.status_id) // 設定訂單狀態
      formData.append('location_id', this.order.location_id) // 設定訂單狀態

      // formData.append("order_totals[sub_total][title]", "商品合計"); // 商品合計
      // formData.append("order_totals[sub_total][value]", productPrice.value);
      // // formData.append('order_totals[sub_total][sort_order]', 1)
      // formData.append("order_totals[discount][title]", "優惠折扣"); // 優惠折扣
      // formData.append("order_totals[discount][value]", discount.value);
      // // formData.append('order_totals[discount][sort_order]', 2)
      // formData.append("order_totals[shipping_fee][title]", "運費"); // 運費
      // formData.append("order_totals[shipping_fee][value]", freight.value);
      // // formData.append('order_totals[shipping_fee][sort_order]', 3)
      // formData.append("order_totals[total][title]", "總計"); // 總計
      // formData.append("order_totals[total][value]", total.value);
      // // formData.append('order_totals[total ][sort_order]', 4)

      // 添加訂單產品
      for (const row of this.tableRows) {
        for (const productInput of row.productInputs) {
          if (Object.prototype.hasOwnProperty.call(productInput, 'name')) {
            formData.append(
              `order_products[${row.id}][product_id]`,
              productInput.id
            )
            formData.append(
              `order_products[${row.id}][name]`,
              productInput.name
            )
            formData.append(
              `order_products[${row.id}][quantity]`,
              productInput.value
            )
            formData.append(
              `order_products[${row.id}][price]`,
              productInput.price
            )
            formData.append(
              `order_products[${row.id}][total]`,
              productInput.totalPrice
            )
            formData.append(
              `order_products[${row.id}][final_total]`,
              productInput.totalPrice
            )
            formData.append(
              `order_products[${row.id}][comment]`,
              productInput.comment
            )
          }
        }

        let productOptionIndex = 1
        for (const productInput of row.productInputs) {
          if (
            typeof productInput.productTypeId !== 'undefined' &&
            typeof productInput.productType !== 'undefined' &&
            typeof productInput.productTypeName !== 'undefined'
          ) {
            formData.append(
              `order_products[${row.id}][product_options][${productOptionIndex}][product_option_id]`,
              productInput.productTypeId
            )
            formData.append(
              `order_products[${row.id}][product_options][${productOptionIndex}][type]`,
              productInput.productType
            )
            formData.append(
              `order_products[${row.id}][product_options][${productOptionIndex}][name]`,
              productInput.productTypeName
            )

            let productOptionValueIndex = 1
            for (const input of row.inputs) {
              if (
                input.mainId === productInput.mainId &&
                input.type === productInput.type
              ) {
                if (!input.name.includes('任意搭配')) {
                  if (input.name !== 'Arbitrarily') {
                    formData.append(
                      `order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][product_option_value_id]`,
                      input.id
                    )
                    formData.append(
                      `order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][value]`,
                      input.name
                    )
                    formData.append(
                      `order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][quantity]`,
                      input.value
                    )
                    if (input.mainId) {
                      formData.append(
                        `order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][parent_povid]`,
                        input.mainId
                      )
                    }

                    productOptionValueIndex++
                  }
                }
              }
            }
            productOptionIndex++
          }
        }
      }
      try {
        // 發送訂單到API
        const response = await apiAuth.post('sale/order/save', formData)
        console.log(response)
        this.tableRows.splice(0, this.tableRows.length)
        return response.data
        // $q.notify({
        //   color: 'green-4',
        //   textColor: 'white',
        //   icon: 'check-circle',
        //   position: 'center',
        //   message: '已成功修改訂單'
        // })
        // 清空 tableRows

        // onReset();
        // getMoneyDate.value = "";
        // paid.value = 0;
        // freight.value = 0;
        // discount.value = 0;
        // mealRemark.value = ''
      } catch (error) {
        console.error(error)
        // $q.notify({
        //   color: 'red-4',
        //   textColor: 'white',
        //   icon: 'error',
        //   position: 'center',
        //   message: 'An error occurred: ' + error.message
        // })
      } finally {
        this.order = []
        this.id = ''
        this.orderdetails = []
      }
    },
    clear () {
      this.order = []
      this.id = ''
      this.orderdetails = []
      this.tableRows = []
      this.tableRows2 = []
      this.status_id = ''
      this.reOrderDate = '' // yyyy-MM-dd
      this.reOrderTime = ''// HH:mm
      this.shouldEdit = false
      this.reorderSuccess = false
      this.notsavemeals = false
      this.orderSaved = false
    }
  }
})
