<template>

  <div class="card">
    <template v-if="loading">    
        <loading></loading>
    </template>

    <template v-else>     
         <div class="card-header">
            <h4 class="card-title">user profile</h4>
        </div>

        <div class="card-body"> 
            <form class="form">
                
                <div class="form-group row">  
                    <div class="col-md-6 mb-2">
                        <label  for="name">Name</label>
                        <input type="text" v-model="user.name" class="form-control" name="name">
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-md-6 mb-2">  
                        <label  for="name">Email</label>
                        <input type="text" v-model="user.email" class="form-control" name="email">
                    </div>    
                </div>

                <div class="form-group row">  
                    <div class="col-md-6 mb-2">
                        <label  for="name">Roles Group</label>
                      
                        
                        <multiselect v-model="value" :options="options"></multiselect>
                        <!--
                        <select name="roles" class="form-control">
                            <option value="none" selected >Admin</option>
                            <option value="design">design</option>
                            <option value="development">development</option>
                            <option value="illustration">illustration</option>
                            <option value="branding">branding</option>
                            <option value="video">video</option>
                        </select>
                        -->
                        
                    </div>    
                </div>

                <div class="form-group row">

                    <div class="col-md-6 mb-2">
                        <div class="form-actions top">
                           
                            <router-link class="btn btn-danger mr-2" :to="{ name: 'users'}">
                                <span class="mdi mdi-chevron-left"></span> Back
                            </router-link>

                            <button @click="update" type="button" class="btn btn-success">
                                <span class="mdi mdi-check"></span> Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </template>
  </div>
</template>	

<script>
import axios from 'axios'
import api from '@/config/api'
import { validEmail } from './../../../config/utils'

import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)


export default {
   
    props: ['id'],
    components: { Multiselect },
    data() {
        return {
            value: null,
            options: ['list', 'of', 'options'],
            user:{}
        }
    },
    created(){
        this.getUser()
    },
    computed :{
        loading(){
            return this.$store.state.loading
        }
    },
    methods:{
        addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    },
        update(){
            
            if (!validEmail(this.user.email)) {
                return true
            }
            
            this.$store.state.loading = true
            api.Users().update(this.user.id, this.user).then(response => {
                //api.SuccessResponse(response)
                this.$store.state.loading = false
            }).catch(error => {
                //api.ErrorResponse(error)
                this.$store.state.loading = false
                console.log(error)
            })
            
        },
        getUser(){
            this.$store.state.loading = true

            api.Users().getOne(this.id).then(response => {
                this.$store.state.loading = false
                this.user = response.data.data
            }).catch(error => {
                //api.ErrorResponse(error)
                this.$store.state.loading = false
                console.log(error)
            })
        }
    }
}
</script>


<style scope>
@import url('https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css');

form .form-group {
    margin-bottom: 1.5rem;
}
</style>


