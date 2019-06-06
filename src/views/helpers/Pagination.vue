<template>
    <div>

        <template v-if="loading">
            <Loading></Loading>
        </template>

        <template v-else>

            <div class="row mb-15">
                <div v-if="searchable" class="col-md-6">
                
                    <div  class="form-inline">
                        <div class="form-group relative">
                            <input placeholder="Buscar cualquier cosa" v-debounce:1500ms="sendSearch" v-model="querySearch" type="text" class="pr-15 form-control">       
                            
                            <!--<i v-show="!querySearch" class="icon-search fa-search top-12 right-12 absolute fa" aria-hidden="true"></i>-->
                            <span v-show="!querySearch" class="mdi right-12 mdi-magnify absolute"></span>

                            

                            <span v-show="querySearch" @click="resetFilter" class="link-pointer mdi right-12 mdi-close absolute"></span>

                            <!--<i v-show="querySearch" @click="resetFilter" class="icon-search link-pointer fa-times top-12 right-12 absolute fa" aria-hidden="true"></i>-->
                        </div>                  
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="text-right">
                        <download-excel
                            class = "btn btn-default"
                            :fetch   = "fetchData"
                            :fields = "columnsForExcel">                        
                            <i class="fa fa-file-excel-o" aria-hidden="true"></i>
                        </download-excel>

                        <button type="button" @click="getRows()" class="btn btn-default">
                            <i class="fa fa-refresh" aria-hidden="true"></i>
                        </button>   
                        
                        <template v-if="buttons" v-for="button in buttons">
                            <button type="button" :class="button.class" @click="button.action()">
                                <div v-html="button.text"></div>
                            </button>
                        </template>

                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <table class="table table-condensed nowrap" cellspacing="0" width="100%">
                        <thead>
                            <th class="text-left" v-for="(col, index) in cols">{{col.label}}</th>
                            <th v-if="actions" class="text-right">Acciones</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in rows">
                               
                                <td v-for="col in cols" class="text-left">
                                    <div @click="callfunction(item,col)" v-html="col.render ? col.render(collectFormatted(item,col)) : collectFormatted(item,col)"></div>                                    
                                </td>
                                
                                <td v-if="actions" class="text-right">
                                    <!--
                                    <button class="btn-sm btn btn-success mr-1" @click="show(item.id)">
                                        <i class="fa fa-pencil" aria-hidden="true"></i>
                                    </button>
                                    -->

                                    <router-link class="btn-sm btn btn-success mr-1" :to="{ name: `${uri}-id`, params: { id: item.id }}">
                                        <span class="mdi mdi-pencil"></span>
                                    </router-link>

                                     <button class="btn btn-sm btn-danger" @click="delete_item(item.id)" >
                                        <span class="mdi mdi-trash-can"></span>
                                    </button>
                                    
                                    <!--
                                    <button class="btn btn-sm btn-danger" @click="delete_item(item.id)">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                    -->
                                </td>
                                
                            </tr>
                        </tbody>
                    </table> 
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
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
                        
                        <span class="small text-default px-1">Mostrando de {{this.pagination.from}} a {{this.pagination.to}} de {{this.pagination.total}} registros</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <nav class="float-right">
                        <ul class="pagination mb-0 small">

                            <li class="page-item" :class="{'disabled':pagination.current_page == 1}">
                                <a @click.prevent="changePage(pagination.current_page - 1)" class="text-secondary page-link" href="#" aria-label="Previous">
                                    <!--<span aria-hidden="true"><i class="fa fa-angle-left" aria-hidden="true"></i> Previous</span>-->
                                    <span aria-hidden="true">« Previous</span>
                                    
                                </a>
                            </li>

                            <!--
                            <li v-for="page in pagesNumber" :class="{'active': page == pagination.current_page}">
                                <a @click.prevent="changePage(page)" href="#">{{ page }}</a>
                            </li>
                            -->

                            <li v-for="page in pagesNumber" :class="{'active': page == pagination.current_page}">
                                <a class="text-secondary page-link" @click.prevent="changePage(page)" href="#">{{ page }}</a>
                            </li>
                            

                            <li class="page-item" :class="{'disabled':pagination.current_page == pagination.last_page}">
                                <a @click.prevent="changePage(pagination.current_page + 1)" class="text-secondary page-link" href="#" aria-label="Next">
                                    <!--<span aria-hidden="true">Next <i class="fa fa-angle-right" aria-hidden="true"></i></span>-->
                                    <span aria-hidden="true">Next »</span>
                                    
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


import Loading from "./Loading";
import Vue from 'vue';
//import EventBus from './EventBus';

//packages dependendies
import VueSweetalert2 from 'vue-sweetalert2'
import vueDebounce from 'vue-debounce';
import JsonExcel from 'vue-json-excel';

Vue.use(VueSweetalert2);
Vue.use(vueDebounce);

export default {
    name: 'DataTable',    
    components: {  
        Loading,
        'downloadExcel':JsonExcel
    },
    data(){
        return {            
            querySearch:'',
            Page: 1,
            ShowEntries: 15,
            pagination:{},
            rows:[],
            loading:false            
        }
    },
    props:{        
        buttons:{
            type:Array,
            required:false
        },
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
        columnsForExcel(){
                        
            let results = this.columns.map(function(item){
                return `"${item.label}":"${item.field}"`
            }).join(',')

            return JSON.parse(`{${results}}`)
        },
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
    
        this.getRows()
    },   
    methods:{     
        // from parent component
        //this.$refs.mailingDatatable.getRows(null);
        getRows(){
            return this.rows
        },
        // from parent component
        //this.$refs.mailingDatatable.setRows(null);
        setRows(newRows) {
            this.rows = newRows
        },
        callfunction(item,col){
            if (col.action){
                col.action(item)
            }
        },
        getRows(){
            this.loading = true

            axios.get(`${this.uri}?&pagination=true`).then(response => {
                this.loading = false

                

                this.pagination = response.data.pagination
                this.rows = response.data.data
            })
        },
        async fetchData(){

            this.loading = await true

            const response = await axios.get(`${this.uri}?&pagination=false`)

            this.loading = await false
            
            return response.data.data
        },
        resetFilter(){
            this.querySearch = ''
            this.setUri()
        },
        changeEntries (value) {
            this.ShowEntries = value
            this.setUri()
        },
        sendSearch(){
            this.Page = 1
            this.setUri()
        },
        setUri () {            

            this.loading = true
            
            let url = `${this.uri}?&pagination=true&page=${this.Page}&per_page=${this.ShowEntries}&search=${this.querySearch}`
            
            axios.get(url).then(response => {
               console.log(response)
               this.loading = false

                this.pagination = response.data.pagination
                this.rows = response.data.data
            })
        },
        changePage (page) {
            this.Page = page
            this.setUri()
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
    th{
        font-size: 14px !important;
    }

    .custom-pagination{
        margin: 0 !important;
    }

    .custom-showing{
        line-height: 36px !important;
    }

    .absolute{
        position: absolute
    }

    .relative{
        position: relative
    }

    .pr-15{
        padding-right: 15; 
    }

    .right-12{
        right:12px;
    }

    .top-12{
        top:12px;
    }

    .mb-15{
        margin-bottom: 15px;
    }
    .icon-search{
        color: #636b6f !important;
    }

    .link-pointer{
        cursor: pointer;
    }
</style>
