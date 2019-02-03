<template>
    <div>

        <template v-if="loading">    
            <loading></loading>
        </template>
        
        <template v-else>  
            <table class="table text-default ">
                <thead>
                    <th class="text-left" v-for="(col, index) in cols">{{col.label}}</th>
                </thead>
                <tr v-for="(item,index) in rows">
                    <td v-for="col in cols" class="text-left">
                        {{ collectFormatted(item,col)}}
                    </td>
                </tr>
            </table>
        </template>
    </div>
</template>

<script>

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
        }
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
        }
    },
    data: function () {
        return {
            Page : 1
        }
    },
    methods : {
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