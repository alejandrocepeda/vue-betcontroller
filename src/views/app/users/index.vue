<template>
    <div class="card">
    
     <div class="card-header">
      
      <div class="row position-relative">
        <div class="col">
          <h4 class="card-title">Users</h4>
        </div>

        <div class="col">
          <button style="right:15px"  class="position-absolute btn btn-success" >
            <span class="mdi mdi-plus"></span> Nuevo
          </button>
        </div>
      </div>

    </div>

    <div class="card-body">
        <pagination :uri="uri" :columns="columns" :rows="users"></pagination>
    </div>
    
    </div>
</template>	

<script>

import api from '@/config/api'

export default {
  name: 'Users',
  data() {
    return {
      uri: 'users?sort_by=id&order_by=desc',
      users : [],
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
          label: 'Email',
          field: 'email'
        },
        {
          label: 'Status',
          field: 'status'
        }
      ],
    }
  },
  created() {
    this.getUsers()
  },
  methods: {   
    getUsers(){

      this.$store.state.loading = true
      api.Users().getAll().then(response => {
          //api.SuccessResponse(response)
          this.$store.state.loading = false
          this.users =  response.data.data
      }).catch(error => {
          //api.ErrorResponse(error)
          this.$store.state.loading = false
          console.log(error)
      })
    }
  }
}
</script>

