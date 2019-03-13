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
                

                <div class="row">
                    <div class="col-6">
                        <div class="form-group row">  
                            <div class="col mb-2">
                                <label  for="name">Name</label>
                                <input type="text" v-model="user.name" class="form-control" name="name">
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
                                <label  for="name">Roles Group</label>
                                
                                <selectlist :taggable="true" :model.sync="user.roles" :options="roles"></selectlist>
                
                            </div>    
                        </div>
                        

                        <div class="form-group row">  
                            <div class="col mb-2">
                                <label  for="name">Bookmakers</label>
                                
                                <selectlist :multiple="false" :model.sync="user.bookmakers" :options="bookmakers"></selectlist>
                
                            </div>    
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group row">  
                            <div class="col mb-2">
                                <label  for="name">Password</label>
                                <input type="password" v-model="password" class="form-control" name="password">
                            </div>
                        </div>
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
import { mapState } from 'vuex'
import Selectlist from '@/views/helpers/Selectlist.vue'
import api from '@/config/api'


export default {
    props: ['id'],
    components: {
        Selectlist
    },
    data() {
        return {
            user:{},
            password:null,
            roles:[],
            bookmakers:[]
        }
    },
    created(){
        this.getUser()
        this.getBookmakers()
    },
    computed :{
        ...mapState([
            'loading'
        ])
    },
    watch:{
        'user.roles':function(value){
            console.log(value)
        },
        'user.bookmakers':function(value){
            console.log(value)
        }
    },
    methods:{
        update(){ 

            if (this.password){
                this.user.password = this.password
            }

            api.Users().update(this.user.id, this.user)
            api.Users().authorizeRoles(this.user.id, {'roles':this.user.roles})
        },
        getUser(){
            
            api.Users().getOne(this.id).then(response => {
                this.user = response.data.data
                this.getRoles()
            })

        },
        getRoles(){
            api.Roles().getAll().then(response => {
                this.roles = response.data.data
            })
        },
        getBookmakers(){
            api.Bookmakers().getAll().then(response => {
                this.bookmakers = response.data.data
            })
        }
    }
}
</script>

<style scope>

</style>


