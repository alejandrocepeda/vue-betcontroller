<template>

  <div class="card">
    <template v-if="loading">    
        <loading></loading>
    </template>

    <template v-else>     
        <div class="card-body"> 
            <form class="form">
                <div class="row">

                    <div class="col-md-6 mb-2">
                        <div class="form-actions top">
                           
                            <router-link class="btn btn-danger mr-2" :to="{ name: 'markets'}">
                                <!--<i class="icon ion-md-arrow-back"></i>--> 
                                <span class="mdi mdi-chevron-left"></span> Back
                            </router-link>

                            <button type="button" class="btn btn-success">
                                <!--<i class="icon ion-md-checkmark"></i>--> 
                                <span class="mdi mdi-check"></span> Save
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    
                    <div class="form-group col-md-6 mb-2">  
                        <label for="name">Name</label>
                        <input type="text" id="name" :value="market.name" class="form-control" name="name">
                       
                    </div>

                    <div class="form-group col-md-6 mb-2">  
                        
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

export default {
    props: ['id'],
    data() {
        return {
            market:{}
        }
    },
    created(){
        this.getMarket()
    },
    computed :{
        loading(){
            return this.$store.state.loading
        }
    },
    methods:{
        getMarket(){
            this.$store.state.loading = true

            let url = 'markets/' + this.id

            axios
            .get(url)
            .then(response => {
                this.$store.state.loading = false
                this.market =  response.data.data
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>


<style scope>



</style>


