<template>
    <div>
        
        <div class="app-content content">
            <div class="content-wrapper">
                
                <navbar></navbar>
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

export default {
    components: {
        'navbar': navbar
    },
}

</script>

<style scope>


</style>