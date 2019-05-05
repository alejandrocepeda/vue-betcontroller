<template>
    <div class="card">
    
     <div class="card-header">
      
      <div class="row position-relative">
        <div class="col">
          <h4 class="card-title">Users</h4>
        </div>

        <div class="col">

          <router-link style="right:15px" class="position-absolute btn btn-success" :to="{name:'users-create'}">
            <span class="mdi mdi-plus"></span> Nuevo
          </router-link>
          
        </div>
      </div>

    </div>

    <div class="card-body">
        <pagination :uri="uri" :columns="columns" :rows="users"></pagination>
    </div>
    
    </div>
</template>	

<script>
import { mapState } from 'vuex'
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
          label: 'Bookmaker',
          field: 'bookmakers.name'
        },
        {
          label: 'Status',
          field: 'status.name'
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
      api.Users().getPaginate().then(response => {
          this.$store.state.loading = false
          this.users =  response.data.data
      }).catch(error => {
          this.$store.state.loading = false
          console.log(error)
      })
    }
  }
}
</script>

