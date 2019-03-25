<template>
  <div class="card">
    <template v-if="loading">    
        <loading></loading>
    </template>

    <template v-else>     
         <div class="card-header">
            <h4 class="card-title">bookmaker profile</h4>
        </div>

        <div class="card-body"> 
            <form class="form">

                <div class="row">
                    <div class="col-6">
                        <div class="form-group row">  
                            <div class="col mb-2">
                                <label  for="name">Name</label>
                                <input type="text" v-model="bookmaker.name" class="form-control" name="name">
                            </div>
                        </div>

                        
                        <div class="form-group row">  
                            <div class="col mb-2">
                                <label  for="name">Status</label>
                                <selectlist :multiple="false" :model.sync="bookmaker.status" :options="bookmaker_statuses"></selectlist>
                            </div>
                        </div>
                        <!--
                        <div class="form-group row">  
                            <div class="col mb-2">
                                <label  for="name">Roles Group</label>
                                <selectlist :taggable="true" :model.sync="user.roles" :options="roles"></selectlist>
                            </div>   
                        </div>
                        -->

                    </div>

                    <!--
                    <div class="col-6">
                        <div class="form-group row">  
                            <div class="col mb-2">
                                <label  for="name">Password</label>
                                <input type="password" v-model="password" class="form-control" name="password">
                                
                                <button @click="updatePassword()" v-show="password"  type="button" class="mt-3 btn btn-success">
                                    Update Password
                                </button>
                            </div>
                        </div>

                        <div class="form-group row">  
                            <div class="col mb-2">  
                                <label  for="name">Email</label>
                                <input type="text" v-model="user.email" class="form-control" name="email">
                            </div>    
                        </div>

                        <div class="form-group row">  
                            <div class="col mb-2">
                                <label  for="name">Status</label>
                                <selectlist :multiple="false" :model.sync="user.status" :options="user_statuses"></selectlist>
                            </div>
                        </div>
                    </div>
                    -->
                </div>

                <div class="form-group row">

                    <div class="col-md-6 mb-2">
                        <div class="form-actions top">
                           
                            <router-link class="btn btn-danger mr-2" :to="{ name: 'bookmakers'}">
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
import { mapState } from 'vuex'

import Selectlist from '@/views/helpers/Selectlist.vue'

import api from '@/config/api'


export default {
    props: ['id'],
    components:{
        Selectlist
    },
    data() {
        return {
            bookmaker:{},
            bookmaker_statuses:[]
        }
    },
    created(){

        //if (this.id){
            this.getBookmaker()
        //}
        
    },
    computed :{
        ...mapState([
            'loading'
        ])
    },
    methods:{
        
        update(){ 

            this.bookmaker.bookmaker_status_id = this.bookmaker.status.id

            api.Bookmakers().update(this.bookmaker.id, this.bookmaker)
        },
        getBookmaker(){            
            api.Bookmakers().getOne(this.id).then(response => {
                this.bookmaker = response.data.data

                this.getBookmakerStatus()
            })
        },
        getBookmakerStatus(){
            api.BookmakerStatus().getAll().then(response => {
                console.log(response.data.data)
                this.bookmaker_statuses = response.data.data
            })
        }
    }
}
</script>

<style scope>

</style>


