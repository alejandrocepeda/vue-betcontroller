<template>
    <div>

        <template v-if="loading">    
            <loading></loading>
        </template>
        
        <template v-else>  
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
        }
    },
    data: function () {
        return {
            Page : 1
        }
    },
    methods : {
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
                //axios.delete(this.route_uri + '/' + id, {}).then(() => {
                //    this.$emit('update:rows', this.rows.filter(item => item.id != id))

                    this.$swal({
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        type: 'success',
                        customClass: 'bg-body rounded-0',
                        confirmButtonClass: 'btn btn-primary font-weight-light',
                    })
                //})
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