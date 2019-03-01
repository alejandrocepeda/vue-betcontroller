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
                           
                            <router-link class="btn btn-danger mr-2" :to="{ name: 'events'}">
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
                        <input type="text" id="name" :value="event.name" class="form-control" name="name">
                        </br>
                        <label for="name">League</label>
                        <input type="text" id="name" :value="event.leagueName" class="form-control" name="leagueName">

                        </br>
                        <label for="name">Sport Name</label>
                        <input type="text" id="name" :value="event.sportName" class="form-control" name="sportName">
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

export default {
    props: ['id'],
    data() {
        return {
            event:{}
        }
    },
    created(){
        this.getEvent()
    },
    computed :{
        loading(){
            return this.$store.state.loading
        }
    },
    methods:{
        getEvent(){
            this.$store.state.loading = true

            let url = 'events/' + this.id

            axios
            .get(url)
            .then(response => {
                this.$store.state.loading = false
                this.event =  response.data.data
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


