<template>
    <div>

       <multiselect 
            v-model="value"
            :placeholder="placeHolder" 
            :label="label" 
            :track-by="trackBy" 
            :options="options" 
            :multiple="multiple" 
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
        taggable:{
            default () {
                return true
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
    watch: {
        value(value){
             this.$store.state.selectionRoles = value
        }
    },
    methods:{
        selectionChange(value){

            console.log(value)
            //this.$emit('input',value)    
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