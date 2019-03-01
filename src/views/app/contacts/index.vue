<template>
<div  class="card">
  
  <div class="card-header">
    <h4 class="card-title">contacs</h4>
  </div>

  <div class="card-body">
    <pagination :columns="columns" :rows="contacts"></pagination>
  </div>
  
</div>

  
</template>

<script>
import axios from 'axios'

export default {
  name: 'Contacts',
  data: function () {
    return {
      contacts : [],
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
          field: 'date_time'
        }
      ],
    }
  },
  created() {
    this.getContacts()
  },
  methods: {   
    getContacts(){
      
      this.$store.state.loading = true

     

      axios
      .get('events')
      .then(response => {
          this.$store.state.loading = false
          this.contacts =  response.data.data         
      })
      .catch(error => {
        console.log(error)
      })	   
    }
  }
}
</script>
 
<style scoped>

</style>