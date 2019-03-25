<template>
    <div class="card">
    
     <div class="card-header">
      
      <div class="row position-relative">
        <div class="col">
          <h4 class="card-title">bookmakers</h4>
        </div>

        <div class="col">
          <button style="right:15px"  class="position-absolute btn btn-success" >
            <span class="mdi mdi-plus"></span> Nuevo
          </button>
        </div>
      </div>

    </div>

    <div class="card-body">
        <pagination :uri="uri" :columns="columns" :rows="bookmakers"></pagination>
    </div>
    
    </div>
</template>	

<script>
import { mapState } from 'vuex'
import api from '@/config/api'

export default {
  name: 'Bookmakers',
  data() {
    return {
      uri: 'bookmakers?sort_by=id&order_by=desc',
      bookmakers : [],
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
    this.getBookmakers()
  },
  methods: {   
    getBookmakers(){

      this.$store.state.loading = true
      api.Bookmakers().getAll().then(response => {
          this.$store.state.loading = false
          this.bookmakers =  response.data.data
      }).catch(error => {
          this.$store.state.loading = false
          console.log(error)
      })
    }
  }
}
</script>

