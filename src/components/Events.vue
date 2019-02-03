<template>
<div>
	<h1>Events</h1>

 
  <pagination :columns="columns" :rows="events"></pagination>

</div>
</template>	

<script>
import axios from 'axios'

export default {
  name: 'Events',
  data() {
    return {
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
      

      axios
      .get('api/events')
      .then(response => {
          this.$store.state.loading = false
          this.events =  response.data.data
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