<template>
    
    <div>
    
        <div class="form-group mb-5 text-white">
            <h2 class="text-center ">Password reset</h2>
        </div>

        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
            <div class="row w-100 mx-auto">
                <div class="col-lg-4 mx-auto">
                    <div class="card auto-form-wrapper"> 
                        <div class="card-body">
                        
                            <p class="text-center text-muted">We will send you a link to reset password</p>
                            <form @submit.prevent="login" align="center" class="mt-lg-2" autocomplete="on">

                                <div class="form-group">
                                    
                                    <div class="input-group" :class="{'is-danger': errors.email }">
                                        
                                        <input class="form-control input-border" v-model="form.email" type="email" placeholder="Username or email">
                                    </div>
                                    <span v-if="errors.email" class="text-danger float-left small">{{ errors.email }}</span>
                                </div>

                            

                                <div class="form-group ">
                                    <button type="submit" class="mt-4 btn btn-success btn-lg btn-block full_rounded">
                                        <font-awesome-icon v-if="loading" icon="circle-notch" class="btn-icon" spin/>
                                        Password reset
                                    </button>

                                    <transition name="fade">
                                            
                                            <b-alert v-if="errors.credentials" show class="mt-4" variant="danger">
                                                {{ errors.credentials }}
                                            </b-alert>

                                    </transition>
                                </div>

                                <div class="form-group d-flex justify-content-between">
                                    <router-link class="text-black text-small" :to="{ name: 'auth/sign_in' }" >Back to sign In</router-link>                                
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    data () {
        return {
            form: {
                email: null,
               
            },
            errors: {
                email: false,
                
            },
            loading: false
        }
    }
}
</script>



<style scope>
.ml-3, .mx-3{
    margin-left: 0 !important;
}

</style>
