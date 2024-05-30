<template>
  <q-layout view="hHh lpR fFf">
  <q-page-container>
      <router-view />
    </q-page-container>
    <!-- <q-btn color="secondary" label="black" @click="toggleDarkMode()"></q-btn> -->
  </q-layout>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useRouter } from 'vue-router'
// import { ref } from 'vue'
// import { useQuasar } from 'quasar'
// const $q = useQuasar()

// const isDark = ref($q.dark.isActive)

// function toggleDarkMode () {
//   isDark.value = !isDark.value
//   $q.dark.set(isDark.value)
// }
const router = useRouter()
const user = useUserStore()
if (user.Permit !== true) {
  router.push('/')
}
const check = () => {
  if (user.Permit !== true) {
    router.push('/')
  } else if (user.Permit === true) {
    router.push('/analytics/day')
  }
}
onMounted(() => {
  check()
})

watch(
  () => user.Permit,
  (value) => {
    check()
  }
)

</script>
