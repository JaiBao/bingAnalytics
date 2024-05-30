<template>
  <q-select
    filled
    v-model="model"
    label="Simple select"
    :options="options"
    style="width: 250px"
    behavior="menu"
  />
  <q-select
    filled
    v-model="model"
    label="Simple select"
    :options="options2"
    style="width: 250px"
    behavior="menu"
  />
</template>

<script setup>
import { apiAuth } from 'src/boot/axios'
import { ref, reactive } from 'vue'
const model = ref('')

const options = reactive([])
const options2 = reactive([])
// -----------------

const get = async () => {
  const { data } = await apiAuth.get('/catalog/category')
  for (let i = 0; i < data.length; i++) {
    options.push(data[i].name)
  }
}
get()
// -----------------
const get2 = async () => {
  const { data } = await apiAuth.get('/catalog/product')
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    options2.push(data[i].name)
    console.log(options2)
  }
}
get2()
</script>
