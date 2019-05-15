<template>
    <div>
        
        <template v-if="loading">    
            <loading></loading>
        </template>
        
        <template v-else>  
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
                                <router-link class="btn-sm btn btn-success mr-1" :to="{ name: route_uri+'-id', params: { id: item.id }}">
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
            

<!--             
            <div class="col-xl col-0 d-xl-block d-none text-center">
                <span class="small text-default px-1">Showing {{ pagination.pagination.from}} to {{pagination.pagination.to}} of {{pagination.pagination.total}} entries</span>
            </div> -->
    
                    
           {{ pagination }}
            
        </template>
    </div>
</template>

<script>
import first from 'lodash/first'
import words from 'lodash/words'

export default {
    name: 'pagination',
    props: {
        columns: {
            required: true,
            type: Array
        },
        pagination: {
            type: Object,
            required: false
        },
        offset: {
            type: Number,
            default: 2
        },
        rows: {
            required: true,
            type: Array
        },
        actions: {
            type: Boolean,
            default: true
        },
        uri: {
            type: String,
            required: true
        },
    },
    created(){
        console.log(this.pagination)
    },
    computed : {
        loading(){
            return this.$store.state.loading
        },
        cols () {
            let app = this
            return app.columns.map(item => {
                if (item.type) item.typeDef = app.dataTypes[item.type]
                return item
            })
        },
        route_uri () {
            return first(words(this.uri))
        },
        pagesNumber () {
            
            /*
            if (!this.pagination.pagination.to) {
                return []
            }
            */
            
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
    },
    data: function () {
        return {
            ShowEntries: 15,
            Page : 1
        }
    },
    methods : {
        setUri () {

            console.log(this.uri + '&page=' + this.Page + '&per_page=' + this.ShowEntries)

            this.$emit('paginate', this.uri + '&page=' + this.Page + '&per_page=' + this.ShowEntries)
        },
        changePage (page) {
            this.Page = page
            this.setUri()
        },
        delete_item(id){
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                customClass: 'bg-body',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success font-weight-light',
                cancelButtonClass: 'btn btn-danger font-weight-light',
                confirmButtonColor: '#53D190',
                cancelButtonColor: '#F65F6E',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                axios.delete(this.route_uri + '/' + id, {}).then(() => {
                    //this.$emit('update:rows', this.rows.filter(item => item.id != id))

                    this.$swal({
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
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