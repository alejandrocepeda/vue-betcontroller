<template>
  <div>
    
    <pagination :columns="columns" :rows="contacts"></pagination>
    
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

      let url = 'api/events'

      axios
      .get(url)
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