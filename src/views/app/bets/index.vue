<template>
    <div class="card">
    
    <div class="card-header">
        <h4 class="card-title">bets</h4>
    
    </div>

    <div class="card-body">
        <pagination :uri="uri" :pagination="pagination" :columns="columns" :rows="bets"></pagination>
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
      uri: 'bets?pagination=true',
      bets : [],
      pagination: {},
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
          field: 'market.name'
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

      api.Bets().getPaginate().then(response => {
          //api.SuccessResponse(response)
          this.$store.state.loading = false
          this.bets =  response.data.data

          this.pagination = response.data.meta.pagination

          //console.log(this.pagination)

          //console.log(response.data.meta.pagination)
      }).catch(error => {
          //api.ErrorResponse(error)
          this.$store.state.loading = false
      })
      
    }
  }
}
</script>

