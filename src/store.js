import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state : {
        selectionRoles:null,
        me:{},
        showSidebar:false,
        loading:false,
    },
    mutations: {
        updateValue (state, value) {
            state.value = value
        }
    },
    
})