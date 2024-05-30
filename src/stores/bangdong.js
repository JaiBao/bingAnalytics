import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
// import { useQuasar } from 'quasar'
import { apiAuth } from 'src/boot/axios'
export const useUserStore = defineStore(
  'bangdong',
  () => {
    const bnagdong1Mains = reactive([])
    const bangdongMainName = ref('')
    const price = ref(0)
    const tableRows = reactive([])

    const loadBangdongMain = async () => {
      try {
        const response = await apiAuth.get('catalog/product/1001')
        const productOptions = response.data.product_options
        const mainMeal = productOptions.main_meal
        const values = mainMeal.product_option_values
        for (const value of values) {
          bnagdong1Mains.push({
            id: value.id,
            name: value.short_name,
            quantity: 0
          })
        }
        bangdongMainName.value = mainMeal.name
        price.value = parseInt(response.data.price)
        console.log(bnagdong1Mains)
      } catch (error) {
        console.error(error)
      }
    }
    const bangdong1TotalQuantity = computed(() => {
      return bnagdong1Mains.reduce((total, current) => {
        return total + parseInt(current.quantity)
      }, 0)
    })

    // 計算總價格
    const bangdong1TotalQuantityPrice = computed(() => {
      for (let i = 0; i < bnagdong1Mains.length; i++) {
        console.log(bnagdong1Mains[i].quantity)
      }
      return bangdong1TotalQuantity.value * price.value
    })
    // const $q = useQuasar()
    const submitBangdong1 = () => {
      const row = {
        name: '',
        quantity: ''
      }
      for (const bnagdong1Main of bnagdong1Mains) {
        if (bnagdong1Main.quantity > 0) {
          row.name = '招牌便當' + bangdong1TotalQuantity.value
          row.quantity +=
            bnagdong1Main.name +
            '' +
            parseInt(bnagdong1Main.quantity).toString() +
            ' '
        }
      }
      // 將這個 row 推進 tableRows 中
      tableRows.push(row)
    }

    const deleteRow = (id) => {
      const index = tableRows.findIndex((row) => row.id === id)
      if (index >= 0) {
        tableRows.splice(index, 1)
      }
    }
    const showEditDialog = ref(false)
    const editData = reactive({
      id: null,
      name: '',
      quantity: 0
    })

    const editRowDialog = (row) => {
      editData.name = row.name
      editData.quantity = row.quantity
      showEditDialog.value = true
    }
    const saveEditData = () => {
      const index = tableRows.findIndex(
        (row) =>
          row.name === editData.name && row.quantity === editData.quantity
      )
      if (index >= 0) {
        tableRows[index].name = editData.name
        tableRows[index].quantity = editData.quantity
      }
      showEditDialog.value = false
    }
    return {
      bnagdong1Mains,
      bangdongMainName,
      price,
      loadBangdongMain,
      bangdong1TotalQuantityPrice,
      bangdong1TotalQuantity,
      submitBangdong1,
      deleteRow,
      editRowDialog,
      saveEditData,
      tableRows

    }
  },
  {
    persist: {
      key: '2023-bangdong',
      paths: ['']
    }
  },
  {}
)
