<template>
  <div class="q-pa-md">
    <h2>Product Table</h2>
    <q-table
      :data="products"
      :columns="productColumns"
      row-key="id"
      :pagination="true"
      :rows-per-page-options="[10, 25, 50]"
    >
      <template v-slot:top-right>
        <q-btn color="primary" icon="add" label="Add New Product" @click="showProductDialog = true" />
      </template>
      <template v-slot:body-cell-edit="props">
        <q-btn icon="edit" color="primary" size="sm" class="q-ml-sm" @click="editProduct(props.row)" />
        <q-btn icon="delete" color="negative" size="sm" class="q-ml-sm" @click="deleteProduct(props.row)" />
      </template>
    </q-table>

    <q-dialog v-model="showProductDialog" persistent>
      <q-card>
        <q-card-section>
          <q-form @submit="saveProduct">
            <q-input v-model="product.name" label="Product Name" required />
            <q-select v-model="product.sideDishes" :options="sideDishes" label="Side Dishes" multiple />
            <q-input v-model="product.price" type="number" label="Price" required />
            <q-input v-model="product.quantity" type="number" label="Quantity" required />
            <q-btn type="submit" label="Save" class="q-mt-md" color="primary" />
            <q-btn label="Cancel" class="q-mt-md" @click="showProductDialog = false" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <h2>Side Dish Table</h2>
    <q-table
      :data="sideDishes"
      :columns="sideDishColumns"
      row-key="id"
      :pagination="true"
      :rows-per-page-options="[10, 25, 50]"
    >
      <template v-slot:top-right>
        <q-btn color="primary" icon="add" label="Add New Side Dish" @click="showSideDishDialog = true" />
      </template>
      <template v-slot:body-cell-edit="props">
        <q-btn icon="edit" color="primary" size="sm" class="q-ml-sm" @click="editSideDish(props.row)" />
        <q-btn icon="delete" color="negative" size="sm" class="q-ml-sm" @click="deleteSideDish(props.row)" />
      </template>
    </q-table>

    <q-dialog v-model="showSideDishDialog" persistent>
      <q-card>
        <q-card-section>
          <q-form @submit="saveSideDish">
            <q-input v-model="sideDish.name" label="Side Dish Name" required />
            <q-input v-model="sideDish.price" type="number" label="Price" required />
            <q-input v-model="sideDish.quantity" type="number" label="Quantity" required />
            <q-btn type="submit" label="Save" class="q-mt-md" color="primary" />
            <q-btn label="Cancel" class="q-mt-md" @click="showSideDishDialog =false" />
          </q-form>
</q-card-section>
</q-card>
</q-dialog>

  </div>
</template>
<script setup>
import { ref } from 'vue'

const products = ref([
  { id: 1, name: 'Product 1', sideDishes: ['Side Dish 1', 'Side Dish 2'], price: 10.99, quantity: 20 },
  { id: 2, name: 'Product 2', sideDishes: ['Side Dish 2', 'Side Dish 3'], price: 15.99, quantity: 30 },
  { id: 3, name: 'Product 3', sideDishes: ['Side Dish 3', 'Side Dish 4'], price: 20.99, quantity: 40 }
])

const sideDishes = ref([
  { id: 1, name: 'Side Dish 1', price: 2.99, quantity: 50 },
  { id: 2, name: 'Side Dish 2', price: 3.99, quantity: 60 },
  { id: 3, name: 'Side Dish 3', price: 4.99, quantity: 70 },
  { id: 4, name: 'Side Dish 4', price: 5.99, quantity: 80 }
])

const productColumns = [
  { name: 'name', align: 'left', label: 'Product Name', field: 'name' },
  { name: 'sideDishes', align: 'left', label: 'Side Dishes', field: 'sideDishes' },
  { name: 'price', align: 'left', label: 'Price', field: 'price' },
  { name: 'quantity', align: 'left', label: 'Quantity', field: 'quantity' },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
]

const sideDishColumns = [
  { name: 'name', align: 'left', label: 'Side Dish Name', field: 'name' },
  { name: 'price', align: 'left', label: 'Price', field: 'price' },
  { name: 'quantity', align: 'left', label: 'Quantity', field: 'quantity' },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
]

const product = ref({ name: '', sideDishes: [], price: '', quantity: '' })
const sideDish = ref({ name: '', price: '', quantity: '' })
const showProductDialog = ref(false)
const showSideDishDialog = ref(false)

function saveProduct () {
  if (!product.value.name || !product.value.price || !product.value.quantity) return
  if (!product.value.id) {
    const maxId = Math.max(...products.value.map((p) => p.id))
    product.value.id = maxId + 1
    products.value.push(product.value)
  } else {
    const index = products.value.findIndex((p) => p.id === product.value.id)
    products.value.splice(index, 1, product.value)
  }
  product.value = { name: '', sideDishes: [], price: '', quantity: '' }
  showProductDialog.value = false
}

function editProduct (row) {
  product.value = { ...row }
  showProductDialog.value = true
}

function deleteProduct (row) {
  const index = products.value.findIndex((p) => p.id === row.id)
  products.value.splice(index, 1)
}

</script>
