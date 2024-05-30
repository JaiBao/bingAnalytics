<template>
  <q-layout view="hHh lpr fFr">
    <q-header class="bg-pink-3 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-bold"> Bing Analytics </q-toolbar-title>
        <q-space />
        <span class="gt-xs">
          歡迎 ! {{ user.name }} 現在時刻 : {{ today }}
        </span>
        <q-fab
          color="pink-3"
          icon="keyboard_arrow_down"
          direction="down"
          class="q-ml-lg"
        >
          <q-fab-action
            color="pink-3"
            text-color="white"
            icon="home"
            to="/analytics/day"
          />
          <q-fab-action
            color="pink-3"
            text-color="white"
            icon="logout"
            @click="user.logout()"
          />
        </q-fab>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-list>
        <q-item to="/analytics/day" v-ripple>
          <q-item-section avatar>
            <q-avatar text-color="black" icon="token" />
          </q-item-section>
          <q-item-section>首頁</q-item-section>
        </q-item>
        <q-item to="/analytics/1" v-ripple>
          <q-item-section avatar>
            <q-avatar text-color="black" icon="token" />
          </q-item-section>
          <q-item-section>圖表查看(時間點:全部)</q-item-section>
        </q-item>
        <q-item to="/analytics/2" v-ripple>
          <q-item-section avatar>
            <q-avatar text-color="black" icon="add_box" />
          </q-item-section>
          <q-item-section> 以月來看報表 </q-item-section>
        </q-item>
        <q-item to="/analytics/new" v-ripple>
          <q-item-section avatar>
            <q-avatar text-color="black" icon="token" />
          </q-item-section>
          <q-item-section>新客清單</q-item-section>
        </q-item>
        <q-item to="/analytics/district" v-ripple>
          <q-item-section avatar>
            <q-avatar text-color="black" icon="token" />
          </q-item-section>
          <q-item-section>地區</q-item-section>
        </q-item>
        <!-- <q-item to="/analytics/order" v-ripple>
          <q-item-section avatar>
            <q-avatar text-color="black" icon="token" />
          </q-item-section>
          <q-item-section>官網數量控制</q-item-section>
        </q-item>
        <q-item to="/analytics/tabletable" v-ripple>
          <q-item-section avatar>
            <q-avatar text-color="black" icon="token" />
          </q-item-section>
          <q-item-section>(真)控單表</q-item-section>
        </q-item> -->
        <q-item to="/analytics/3" v-ripple>
          <q-item-section avatar>
            <q-avatar text-color="black" icon="token" />
          </q-item-section>
          <q-item-section>圖表查看(時間點:全部)合併版本</q-item-section>
        </q-item>
        <q-item to="/analytics/4" v-ripple>
          <q-item-section avatar>
            <q-avatar text-color="black" icon="add_box" />
          </q-item-section>
          <q-item-section> 以月來看報表 合併版本</q-item-section>
        </q-item>
        <q-item to="/analytics/bom" v-ripple>
          <q-item-section avatar>
            <q-avatar text-color="black" icon="add_box" />
          </q-item-section>
          <q-item-section> BOM分析</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ResizeObserver } from '@juggle/resize-observer'
import { onMounted, watch, ref } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useRouter } from 'vue-router'
import { DateTime } from 'luxon'

const today = ref(DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
setInterval(() => {
  today.value = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
}, 1000)
// import { useQuasar } from 'quasar'
// const $q = useQuasar()

// const isDark = ref($q.dark.isActive)

// function toggleDarkMode () {
//   isDark.value = !isDark.value
//   $q.dark.set(isDark.value)
// }
const router = useRouter()
const user = useUserStore()
const miniState = ref(true)
if (user.Permit !== true) {
  router.push('/')
}
const leftDrawerOpen = ref(false)
function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const check = () => {
  if (user.Permit !== true) {
    router.push('/')
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
const ro = new ResizeObserver((entries, observer) => {
  console.log('Body has resized!')
  observer.disconnect() // Stop observing
})

ro.observe(document.body) // Watch dimension changes on body
</script>

<style lang="scss" scoped></style>
