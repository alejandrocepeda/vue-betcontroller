<template>
  <div>
    
    <select v-model="lang">
      <option v-bind:key="item.code" v-for="(item) in availableLanguages" :value="item.code">{{ item.full }}</option>
    </select>

    <div class="clearfix"></div>
    <br>
    <ul class="mx-auto">
      <li>{{ trans('Business') }}</li>
      <li>{{ trans('Bye') }} </li>
      <li>{{ trans('Hello') }} </li>
    </ul>
    
  </div>
</template>

<script>

export default {
  name: 'Lang',
  data: function () {
    return {
      message : 'hello',
      languages : {
        'eng': {
          'Hello' : 'Hello',
          'Bye'   : 'Bye',
          'Business' : 'Business'
        },
        'spa': {
          'Hello' : 'Hola',
          'Bye'   : 'Adios',
          'Business' : 'Negocios'
        },
      },
      lang : 'spa',
      lang_content : '',
      availableLanguages: [
          {'code': 'eng', 'full': 'English'},
          {'code': 'spa', 'full': 'Spanish'},
      ],
    }
  },
  created() {
      if (localStorage.lang){
        this.lang = localStorage.lang
      }

      this.setLang(this.lang)
  },
  watch: {
    lang(value){
      this.setLang(value)
      localStorage.lang = value
    }
  },
  methods: {
    setLang(value){
      
      let results = this._.find(this.languages, function (item,key) {
          return key.toLowerCase() === value.toLowerCase()
      })

      this.lang_content = results
    },
    trans(value){
      
      let results = this._.find(this.lang_content, function (item,key) {
          return key.toLowerCase() === value.toLowerCase()
      })
      
      return (typeof results === 'undefined' ? value : results)
    }
  }
}
</script>
 
<style scoped>

ul{
    padding-inline-start: 0 !important;
    list-style: none;
}
</style>