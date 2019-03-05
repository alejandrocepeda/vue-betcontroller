<template>
    <div class="card">
    
    <div class="card-header">
        <h4 class="card-title">bets</h4>
    
    </div>

    <div class="card-body">
        <pagination :uri="uri" :columns="columns" :rows="bets"></pagination>
    </div>
    
    </div>
</template>	

<script>
import axios from 'axios'
import api from '@/config/api'

export default {
  name: 'Bets',
  data() {
    return {
      uri: 'bets?sort_by=id&order_by=desc',
      bets : [],
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
          label: 'Market',
          field: 'marketName'
        }
      ],
    }
  },
  created() {
    this.getBets()
  },
  methods: {   
    getBets(){
      
      this.$store.state.loading = true

      api.Bets().getAll().then(response => {
          //api.SuccessResponse(response)
          this.$store.state.loading = false
          this.bets =  response.data.data
      }).catch(error => {
          //api.ErrorResponse(error)
          this.$store.state.loading = false
          console.log(error)
      })
      
    }
  }
}
</script>

