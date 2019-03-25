<template>
    <div class="card">
    
    <div class="card-header">
        <h4 class="card-title">markets</h4>
    
    </div>

    <div class="card-body">
        <pagination :uri="uri" :columns="columns" :rows="markets"></pagination>
    </div>
    
    </div>
</template>	

<script>
import axios from 'axios'
import api from '@/config/api'

export default {
  name: 'Markets',
  data() {
    return {
      uri: 'markets?sort_by=id&order_by=desc',
      markets : [],
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
          label: 'Status',
          field: 'status.name'
        }
      ],
    }
  },
  created() {
    this.getMarkets()
  },
  methods: {   
    getMarkets(){
      
      this.$store.state.loading = true

      api.Markets().getAll().then(response => {
          //api.SuccessResponse(response)
          this.$store.state.loading = false
          this.markets =  response.data.data
      }).catch(error => {
          //api.ErrorResponse(error)
          this.$store.state.loading = false
          console.log(error)
      })
      
    }
  }
}
</script>

