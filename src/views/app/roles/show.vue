<template>

  <div class="card">
    <template v-if="loading">    
        <loading></loading>
    </template>

    <template v-else>     
         <div class="card-header">
            <h4 class="card-title">role</h4>
        </div>

        <div class="card-body"> 
            <form class="form">
                
                <div class="form-group row">  
                    <div class="col-md-6 mb-2">
                        <label  for="name">Name</label>
                        <input type="text" v-model="role.name" class="form-control" name="name">
                    </div>
                </div>

                <!--
                <div class="form-group row">
                    <div class="col-md-6 mb-2">  
                        <label  for="name">Email</label>
                        <input type="text" v-model="user.email" class="form-control" name="email">
                    </div>    
                </div>

                <div class="form-group row">  
                    <div class="col-md-6 mb-2">
                        <label  for="name">Roles Group</label>
                        
                        <selectlist :model="user.roles" :options="roles"></selectlist>
                       
                    </div>    
                </div>
                -->
                <div class="form-group row">

                    <div class="col-md-6 mb-2">
                        <div class="form-actions top">
                           
                            <router-link class="btn btn-danger mr-2" :to="{ name: 'roles'}">
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
import Vue from 'vue'
import axios from 'axios'
import api from '@/config/api'
import { validEmail } from '@/config/utils'

import Selectlist from '@/views/helpers/Selectlist.vue'

export default {
    props: ['id'],
    components: {
        Selectlist
    },
    data() {
        return {
            role:{}
        }
    },
    created(){
        this.getRole()
    },
    computed :{
        loading(){
            return this.$store.state.loading
        }
    },
    methods:{       
        update(){
            
           
            
            this.$store.state.loading = true
            api.Roles().update(this.role.id, this.role).then(response => {
                //api.SuccessResponse(response)
                this.$store.state.loading = false
            }).catch(error => {
                //api.ErrorResponse(error)
                this.$store.state.loading = false
            })
            
        },
        getRole(){
            this.$store.state.loading = true

            api.Roles().getOne(this.id).then(response => {
                this.$store.state.loading = false
                this.role = response.data.data
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

</style>


