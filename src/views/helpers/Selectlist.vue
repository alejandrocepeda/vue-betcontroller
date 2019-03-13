<template>
    <div>

       <multiselect 
            v-model="value"
            :placeholder="placeHolder" 
            :label="label" 
            :track-by="trackBy" 
            :allow-empty="allowEmpty"
            :close-on-select="closeOnSelect"
            :options="options" 
            :multiple="multiple" 
            :searchable="searchable"
            :taggable="taggable"
            @input="selectionChange">
        </multiselect>

    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
    components: {
        Multiselect
    },
    name: 'Selectlist',
    props: {
        model: {
            required: true
        },
        options: {
            required: true,
            type: Array
        },
        multiple:{
            default () {
                return true
            }
        },
        searchable:{
            default () {
                return true
            }
        },
        closeOnSelect:{
            default () {
                return true
            }
        },
        allowEmpty:{
            default () {
                return false
            }
        },
        taggable:{
            default () {
                return false
            }
        },
        label: {
            default () {
                return 'name'
            }
        },
        placeHolder: {
            default () {
                return 'Search an option'
            }
        },
        trackBy:{
            default(){
                return 'id'
            }
        }
    },
    mounted(){
        this.value = this.model
    },
    data () {
        return {
            value: ''
        }
    },
    methods:{
        selectionChange(value){
            this.$emit('update:model',value)
        }
    }
   
}

</script>

<style scope>
@import '~vue-multiselect/dist/vue-multiselect.min.css';
/*
.multiselect__option--selected.multiselect__option--highlight{
    background: #ff7588;
}

.multiselect__option--highlight{
    background: #16d39a;
}
*/
.multiselect__input:focus{
    background-color : transparent;
    border: 0 !important;   
}

.multiselect__tags{
    border: 1px solid #CCD6E6 !important;   
    height: calc(2.25rem + 2px) !important; 
}

.multiselect__tag{
    background-color: #16d39a
}

.multiselect__tag-icon:after{
    color: #fff !important;
}

</style>