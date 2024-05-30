<template>
  <div>
    <q-table
      title="Product Table"
      :data="products"
      :columns="productColumns"
      row-key="id"
      :pagination="pagination"
      :filter="filter"
      :sorting="sorting"
      :row-class="(row) => row.quantity <= 10 ? 'text-negative' : ''"
    >
      <template v-slot:top-right>
        <q-btn label="Add Product" icon="add" @click="showProductDialog = true" />
      </template>
      <template v-slot:body-cell-sideDishes="props">
        <q-chip
          v-for="sideDish in props.row.sideDishes"
          :key="sideDish"
          :label="sideDish"
        />
      </template>
      <template v-slot:body-cell="props">
        <q-btn icon="edit" @click="editProduct(props.row)" />
        <q-btn icon="delete" @click="deleteProduct(props.row)" />
      </template>
    </q-table>

    <q-dialog v-model="showProductDialog">
      <q-card>
        <q-card-section>
          <q-form @submit.prevent="saveProduct">
            <q-input v-model="product.name" label="Name" />
            <q-input v-model="product.price" type="number" label="Price" />
            <q-input v-model="product.quantity" type="number" label="Quantity" />
            <q-select v-model="product.sideDishes" :options="sideDishes" multiple label="Side Dishes" />
            <q-card-actions>
              <q-btn label="Save" type="submit" />
              <q-btn label="Cancel" @click="showProductDialog = false" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-table
      title="Side Dish Table"
      :data="sideDishes"
      :columns="sideDishColumns"
      row-key="id"
      :pagination="pagination"
      :filter="filter"
      :sorting="sorting"
      :row-class="(row) => row.quantity <= 10 ? 'text-negative' : ''"
    >
      <template v-slot:top-right>
        <q-btn label="Add Side Dish" icon="add" @click="showSideDishDialog = true" />
      </template>
      <template v-slot:body-cell="props">
        <q-btn icon="edit" @click="editSideDish(props.row)" />
        <q-btn icon="delete" @click="deleteSideDish(props.row)" />
      </template>
    </q-table>

    <q-dialog v-model="showSideDishDialog">
      <q-card>
        <q-card-section>
          <q-form @submit.prevent="saveSideDish">
            <q-input v-model="sideDish.name" label="Name" />
            <q-input v-model="sideDish.price" type="number" label="Price" />
            <q-input v-model="sideDish.quantity" type="number" label="Quantity" />
            <q-card-actions>
              <q-btn label="Save" type="submit" />
              <q-btn label="Cancel" @click="showSideDishDialog = false" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
      </q-dialog>
      </div>
    </template>
<script setup>
import { ref } from 'vue'
const products = ref([
  {
    id: 1,
    name: 'Product 1',
    sideDishes: ['Side Dish 1', 'Side Dish 2'],
    price: 10,
    quantity: 20
  },
  {
    id: 2,
    name: 'Product 2',
    sideDishes: ['Side Dish 2', 'Side Dish 3'],
    price: 15,
    quantity: 5
  }
])

const sideDishes = ref([
  {
    id: 1,
    name: 'Side Dish 1',
    price: 2,
    quantity: 10
  },
  {
    id: 2,
    name: 'Side Dish 2',
    price: 3,
    quantity: 15
  }
])

const productColumns = ref([
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => val,
    sortable: true
  },
  {
    name: 'sideDishes',
    label: 'Side Dishes',
    align: 'left',
    field: (row) => row.sideDishes,
    format: (val) => val,
    sortable: false
  },
  {
    name: 'price',
    required: true,
    label: 'Price',
    align: 'left',
    field: (row) => row.price,
    format: (val) => `$${val}`,
    sortable: true
  },
  {
    name: 'quantity',
    required: true,
    label: 'Quantity',
    align: 'left',
    field: (row) => row.quantity,
    format: (val) => val,
    sortable: true
  }
])

const sideDishColumns = ref([
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => val,
    sortable: true
  },
  {
    name: 'price',
    required: true,
    label: 'Price',
    align: 'left',
    field: (row) => row.price,
    format: (val) => `$${val}`,
    sortable: true
  },
  {
    name: 'quantity',
    required: true,
    label: 'Quantity',
    align: 'left',
    field: (row) => row.quantity,
    format: (val) => val,
    sortable: true
  }
])

const pagination = ref({
  rowsPerPage: 10,
  sortBy: 'name'
})

const filter = ref('')
const sorting = ref('')

const showProductDialog = ref(false)
const product = ref({
  name: '',
  price: 0,
  quantity: 0,
  sideDishes: []
})

const showSideDishDialog = ref(false)
const sideDish = ref({
  name: '',
  price: 0,
  quantity: 0
})

function editProduct (row) {
  product.value = { ...row }
  showProductDialog.value = true
}

function deleteProduct (row) {
  const index = products.value.findIndex((p) => p.id === row.id)
  products.value.splice(index, 1)
}

function saveProduct () {
  if (!product.value.id) {
    const newId = products.value.length + 1
    products.value.push({ ...product.value, id: newId })
  } else {
    const index = products.value.findIndex((p) => p.id === product.value.id)
    products.value[index] = { ...product.value }
  }
  product.value = { name: '', price: 0, quantity: 0, sideDishes: [] }
  showProductDialog.value = false
}

function editSideDish (row) {
  sideDish.value = { ...row }
  showSideDishDialog.value = true
}

function deleteSideDish (row) {
  const index = sideDishes.value.findIndex((s) => s.id === row.id)
  sideDishes.value.splice(index, 1)

  // remove side dish from products
  products.value.forEach((p) => {
    const sideDishIndex = p.sideDishes.findIndex((s) => s === row.name)
    if (sideDishIndex >= 0) {
      p.sideDishes.splice(sideDishIndex, 1)
    }
  })
}

function saveSideDish () {
  if (!sideDish.value.id) {
    const newId = sideDishes.value.length + 1
    sideDishes.value.push({ ...sideDish.value, id: newId })
  } else {
    const index = sideDishes.value.findIndex((s) => s.id === sideDish.value.id)
    sideDishes.value[index] = { ...sideDish.value }
  }
  sideDish.value = { name: '', price: 0, quantity: 0 }
  showSideDishDialog.value = false
}

</script>
