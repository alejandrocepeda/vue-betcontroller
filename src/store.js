import Vue from 'vue'
import Vuex from 'vuex'
import axios from  'axios'

Vue.use(Vuex)
Vue.use(axios)

export const store = new Vuex.Store({
    state : {
        loading : false,
        contacts : [
            {id:1,name:'Alejandro Cepeda',job_title:'Senior BackEnd Developer',active:true},
            {id:2,name:'Jesus Quevedo',job_title:'Senior FrontEnd Developer',active:true},
            {id:3,name:'Camilo Atkinson',job_title:'SEO Specialist',active:false},
            {id:4,name:'Jhon Doe',job_title:'Serial Killer',active:true},
         ]
    },
    actions:{
        getContacts(){
            alert('getContacts')
        }
    },
    getters : {
        contactsActive(state) {
            return state.contacts.filter(contact => {
                return contact.active
            })
        }
    }
})