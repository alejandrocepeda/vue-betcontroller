<template>
    <div>
        
        <div class="app-content content">
            <div :class="{'content-menu-collapsed' : showSidebar}" class="content-wrapper">
                
                <navbar></navbar>
                <breadcrumbs></breadcrumbs>

                <div class="row"> 
                    <div class="col-12">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                        
                    </div>
                </div>
                
            </div>

        </div>
    </div>
</template>

<script>

import navbar from '@/views/app/_navbar.vue'
import breadcrumbs from '@/views/app/_breadcrumbs.vue'

export default {
    components: {
        'navbar': navbar,
        'breadcrumbs':breadcrumbs
    },
    computed:{
        showSidebar(){
            return this.$store.state.showSidebar
        }
    },
}

</script>

<style scope>
.content-wrapper{
    transition: all 600ms ease-out;
}
.content-menu-collapsed{
    margin-left:260px;
}

.breadcrumbs-top .breadcrumb {
    margin: 0;
    padding: 0;
}
.breadcrumb {
    font-size: .8rem !important;
    padding: 0 0 .75rem;
}
.breadcrumb, .card-transparent {
    background-color: #f5f7fa;
}

.breadcrumb, .card .card-title, .dropdown-header {
    text-transform: uppercase;
}


.mb-2, .my-2 {
    margin-bottom: 1.5rem!important;
}
</style>