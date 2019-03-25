<template>

  <div class="card">
    
    <div class="card-header">
      
      <div class="row position-relative">
        <div class="col">
          <h4 class="card-title">events</h4>
        </div>

        <div class="col">
          <button style="right:15px"  class="position-absolute btn btn-success" >
            <!--<i class="icon ion-md-add"></i>--> 
            <span class="mdi mdi-plus"></span> Nuevo
          </button>
        </div>
      </div>

    </div>

    
    <div class="card-body"> 
      
      <pagination :uri="uri" :columns="columns" :rows="events"></pagination>
    </div>
    
  </div>
</template>	

<script>
import axios from 'axios'
import api from '@/config/api'

export default {
  name: 'Events',
  data() {
    return {
      uri: 'events?sort_by=id&order_by=desc',
      events : [],
      columns: [
        {
          label: 'Id',
          field: 'id'
        },
        {
          label: 'Name',
          field: 'name'
        },
        {
          label: 'Date Time',
          field: 'date'
        },
        {
          label: 'League',
          field: 'leagueName'
        },
        {
          label: 'Sport',
          field: 'sportName'
        },
        {
          label: 'Status',
          field: 'status.name'
        }
      ],
    }
  },
  created() {
    this.getEvents()
  },
  methods: {   
    getEvents(){
      
      this.$store.state.loading = true

      api.Events().getAll().then(response => {
          //api.SuccessResponse(response)
          this.$store.state.loading = false
          this.events =  response.data.data
      }).catch(error => {
          //api.ErrorResponse(error)
          this.$store.state.loading = false
          console.log(error)
      })

      /*
      axios
      .get('events')
      .then(response => {
          this.$store.state.loading = false
          this.events =  response.data.data
      })
      .catch(error => {
        console.log(error)
      })	  
      */ 
    }
  }
}
</script>



