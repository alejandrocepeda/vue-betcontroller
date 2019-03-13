<template>
  <div id="app">

    <div>
      <!--
      <template v-if="loading">    
        <loading></loading>
      </template>
      -->

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>

//import { mapState } from 'vuex'

import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
loadProgressBar()

export default {
  /*
  computed :{
      ...mapState([
          'loading'
      ])
  },
  */
  created(){
    
    axios.interceptors.request.use((config) => {
        this.$store.commit('loading', true)

        return config;
    }, (error) => {
        this.$store.commit('loading', false)

        return Promise.reject(error)
    })
    

    axios.interceptors.response.use((response) => {
        this.$store.commit('loading', false)
        
        return response;
    }, (error) => {
        this.$store.commit('loading', false)
        return Promise.reject(error);
    })
  }
}
</script>
 
<style scope>
#nprogress .bar {
    background: #00B5B8 !important;
}

#nprogress .peg {
    box-shadow: 0 0 10px #00B5B8, 0 0 5px #00B5B8 !important;
}

#nprogress .spinner-icon {
    /*
    border-top-color: #16D39A !important;
    border-left-color: #16D39A !important;
    */
    display: none;
}

</style>
