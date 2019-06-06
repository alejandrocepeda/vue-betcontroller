
<template>
    <div>
        
        <template v-if="loading">    
            <loading></loading>
        </template>
        
        <template v-else>  

            <div class="row mb-2">
                <div v-if="searchable" class="col-md-12">
                   
                    <div  class="form-inline">

                        <div class="form-group relative">

                            <!--<input placeholder="Buscar" v-debounce:1600ms="sendSearch" v-model="querySearch" type="text" class="pr-15 form-control">       -->
                            <input placeholder="Buscar"  @input="debounceInput" v-model="querySearch" type="text" class="pr-15 form-control">       
                            <i style="color: #636b6f" class="top-12 right-12 absolute fa fa-search" aria-hidden="true"></i>                    
                        </div>                  

                       
                    </div>
                </div>
                
                <!--
                <div class="col-md-6 text-right">
                     <button type="button" @click="setUri" class="btn btn-warinng" >Actualizar <i class="fa fa-refresh" aria-hidden="true"></i></button>
                </div>
                -->
            </div>

            <div class="row">
                 <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <th class="text-left" v-for="(col, index) in cols">{{col.label}}</th>
                                <th v-if="actions" class="text-lef">Actions</th>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in rows">
                                    <td v-for="col in cols" class="text-left">
                                        {{ collectFormatted(item,col)}}
                                    </td>

                                    
                                    <td v-if="actions">
                                        
                                        <router-link class="btn-sm btn btn-success mr-1" :to="{ name: `${uri}-id`, params: { id: item.id }}">
                                            <span class="mdi mdi-pencil"></span>
                                        </router-link>
                                        

                                        <button class="btn btn-sm btn-danger" @click="delete_item(item.id)" >
                                            <span class="mdi mdi-trash-can"></span>
                                        </button>
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
            

            <div class="row">
                <div class="col-md-4 ">
                    <div  class="form-inline">

                        <span class="small mr-2">Mostrar </span>

                        <div class="form-group mr-2">
                            <select v-model="ShowEntries" @change="changeEntries(ShowEntries)" class="form-control">
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                            </select>
                        </div>

                        <span class="small">Registros</span>

                    </div>                    
                </div>

                <div class="col-md-4">
                    <div  class="custom-showing text-center">
                        <span class="small text-default px-1">Showing {{this.pagination.from}} to {{this.pagination.to}} of {{this.pagination.total}} registros</span>
                    </div>
                </div>

                <div class="col-md-4">
                    <nav class="float-right">
                        <ul class="pagination mb-0 small">
                            <li class="page-item" :class="{'disabled':pagination.current_page == 1}">
                                <a @click.prevent="changePage(pagination.current_page - 1)" class="text-secondary page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">« Previous</span>
                                    <!--<span class="mdi mdi-pencil"></span>-->
                                </a>
                            </li>

                            <li v-for="page in pagesNumber" :class="{'active': page == pagination.current_page}">
                                <a class="text-secondary page-link" @click.prevent="changePage(page)" href="#">{{ page }}</a>
                            </li>
                            

                            <li class="page-item" :class="{'disabled':pagination.current_page == pagination.last_page}">
                                <a @click.prevent="changePage(pagination.current_page + 1)" class="text-secondary page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">Next »</span>
                                    <!--<span class="mdi mdi-pencil"></span>-->
                                </a>
                            </li>
                        </ul>
                        
                    </nav>
                </div>
                
            </div>

        </template>
    </div>
</template>

<script>
/*
import first from 'lodash/first'
import words from 'lodash/words'
*/


import vueDebounce from 'vue-debounce'



export default {
    name: 'Pagination',        
    data(){
        return {
            querySearch:null,
            Page: 1,
            ShowEntries: 10,
            pagination:{},
            rows:[],
            loading:false
        }
    },
    props:{
        searchable:{
            type:Boolean,
            default: true
        },
        columns:{
            type:Array,
            requied:true
        },
        actions: {
            type: Boolean,
            default: true
        },
        uri: {
            type: String,
            required: true
        },
        offset: {
            type: Number,
            default: 2
        },
    },
    computed : {        
        deleteRows(){
            return this.rows
        },
        pagesNumber () {
            if (!this.pagination.to) {
                return []
            }
            
            let from = this.pagination.current_page - this.offset
            if (from < 1) {
                from = 1
            }
            let to = from + (this.offset * 2)
            if (to >= this.pagination.last_page) {
                to = this.pagination.last_page
            }
            let pagesArray = []
            for (let page = from; page <= to; page++) {
                pagesArray.push(page)
            }
            return pagesArray
            },
        cols () {
            let app = this
            return app.columns.map(item => {
                if (item.type) item.typeDef = app.dataTypes[item.type]
                return item
            })
        },
        
    },
    created(){
        this.loading = true

        axios.get(`${this.uri}?pagination=true`).then(response => {
            this.loading = false

            console.log(response)   

            this.pagination = response.data.pagination
            this.rows = response.data.data
        })
    },
    methods:{
       debounceInput: _.debounce(function (e) {
            this.sendSearch(e.target.value)
        }, 1500),
        changeEntries (value) {
            this.ShowEntries = value
            this.setUri()
        },
        sendSearch(){
            this.setUri()
        },
        setUri () {            

            this.loading = true
            
            let url = `${this.uri}?pagination=true&page=${this.Page}&per_page=${this.ShowEntries}&search=${this.querySearch}`
            
            axios.get(url).then(response => {

                this.loading = false

                this.pagination = response.data.pagination
                this.rows = response.data.data
            })
        },
        changePage (page) {
            this.Page = page
            this.setUri()
        },
        show(id){
            EventBus.$emit('update:show', id);
        },
        delete_item(id){
            this.$swal({
                title: 'Estas seguro de eliminar este registro ?',
                text: "¡No podrás revertir esto!!",
                type: 'warning',
                customClass: 'bg-body',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success font-weight-light',
                cancelButtonClass: 'btn btn-danger font-weight-light',
                confirmButtonColor: '#53D190',
                cancelButtonColor: '#F65F6E',
                confirmButtonText: '¡Sí, bórralo!'
            }).then((result) => {
                if (result.value) {
                    
                    axios.delete(`${this.uri}/${id}`).then(response => {                        
                        
                        this.rows = this.rows.filter(item => item.id != id)

                        this.$swal({
                            title: 'Borrado!',
                            text: response.data.message,
                            type: 'success',
                            customClass: 'bg-body rounded-0',
                            confirmButtonClass: 'btn btn-primary font-weight-light',
                        })
                       
                    })
                }
            })
        },
        collectFormatted (obj, column) {
            let value
            value = this.collect(obj, column.field)
            if (value === undefined) return ''
            // lets format the resultant data
            const type = column.typeDef

            if (typeof type !== 'undefined' && value != '') {
                return type.format(value)
            }

            return value
        },
        collect (obj, field) {
            // utility function to get nested property
            function dig (obj, selector) {
                let result = obj
                const splitter = selector.split('.')
                for (let i = 0; i < splitter.length; i++) {
                if (typeof result === 'undefined') {
                    return undefined
                }
                result = result[splitter[i]]
                }
                return result
            }

            if (typeof field === 'string') return dig(obj, field)
            return undefined
        },
    }
}
</script>


<style scoped>

</style>