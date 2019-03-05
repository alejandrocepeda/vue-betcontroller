<template>
    <div class="card">
    
     <div class="card-header">
      
      <div class="row position-relative">
        <div class="col">
          <h4 class="card-title">roles</h4>
        </div>

        <div class="col">
          <button style="right:15px"  class="position-absolute btn btn-success" >
            <span class="mdi mdi-plus"></span> Nuevo
          </button>
        </div>
      </div>

    </div>

    <div class="card-body">
        <pagination :uri="uri" :columns="columns" :rows="roles"></pagination>
    </div>
    
    </div>
</template>	

<script>
import axios from 'axios'
import api from '@/config/api'

export default {
  name: 'Roles',
  data() {
    return {
      uri: 'roles?sort_by=id&order_by=desc',
      roles : [],
      columns: [
        {
          label: 'Id',
          field: 'id'
        },
        {
          label: 'Name',
          field: 'name'
        }
      ],
    }
  },
  created() {
    this.getRoles()
  },
  methods: {   
    getRoles(){

      this.$store.state.loading = true
      api.Roles().getAll().then(response => {
          //api.SuccessResponse(response)
          this.$store.state.loading = false
          this.roles =  response.data.data
      }).catch(error => {
          //api.ErrorResponse(error)
          this.$store.state.loading = false
      })
    }
  }
}
</script>

