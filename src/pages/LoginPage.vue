<template>
  <q-page class="bg-image">
    <div class="row w-100 items-center justify-center h-100">
      <q-card
      v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
    >

      <q-card-section>
        <div class="text-center q-pt-lg">
          <div class="col text-h6 ellipsis">Bing Analytics | Login</div>
        </div>
      </q-card-section>
      <q-card-section>
          <q-input
            color="lime-11"
            filled
            v-model="loginForm.number"
            label="帳號"
            class="q-my-md"
          />

          <q-input
            color="lime-11"
            filled
            v-model="loginForm.password"
            :type="isPwd ? 'password' : 'text'"
            label="密碼"
            class="q-my-md"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer q-pa-md"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="text-center">
            <q-btn label="登入" color="primary" class="q-my-xs" size="20px" @click="user.login(loginForm)"/>
          </div>
      </q-card-section>
    </q-card>
    </div>

    <!-- <div class="row w-100 justify-center">

    <div class="text-h4 q-ma-xl">Bing Analytics | Login</div>
    <div class="w-100 row items-center justify-center q-pa-md-xl">
      <q-input
        color="lime-11"
        filled
        v-model="loginForm.number"
        label="帳號"
        class="w-100 q-my-md"
      />
      <q-input
        color="lime-11"
        filled
        v-model="loginForm.password"
        :type="isPwd ? 'password' : 'text'"
        label="密碼"
        class="w-100 q-my-md"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn label="登入" color="primary" class="q-my-xl" size="35px" @click="user.login(loginForm)">

      </q-btn>
    </div>
  </div> -->
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from 'src/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = useUserStore()
const isPwd = ref(true)

const loginForm = ref({
  number: '',
  password: ''
})
const check = () => {
  if (user.Permit !== true) {
    router.push('/')
  } else if (user.Permit === true) {
    router.push('/analytics/1')
  }
}
onMounted(() => {
  check()
})
</script>

<style lang="scss" scoped>
.bg-image {
  background: linear-gradient(106.5deg, rgba(255, 215, 185, 0.91) 23%, rgba(223, 159, 247, 0.8) 93%);
}
.h-100{
  max-height: 100vh;
}
</style>
