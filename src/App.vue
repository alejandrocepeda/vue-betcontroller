<template>
  <div id="app">

    <v-menu></v-menu>
    
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import Vue from 'vue'
import menu from '@/components/Menu.vue'

Vue.component('v-menu', menu)

export default {
  name: 'app'
}
</script>
 
<style scope>

</style>
