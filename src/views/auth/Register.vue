<template>
    
    <div>
    
        <div class="form-group mb-5 text-white">
            <h2 class="text-center ">Create an Account</h2>
        </div>

        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
            <div class="row w-100 mx-auto">
                <div class="col-lg-4 mx-auto">
                    <div class="card auto-form-wrapper"> 
                        <div class="card-body">
                        
                            <p class="text-center text-muted">Sign in with credentials</p>
                            <form @submit.prevent="login" align="center" class="mt-lg-2" autocomplete="on">

                                <div class="form-group">
                                    
                                    <div class="input-group" :class="{'is-danger': errors.email }">
                                        
                                        <input class="form-control input-border" v-model="form.email" type="email" placeholder="Username">
                                    </div>
                                    <span v-if="errors.email" class="text-danger float-left small">{{ errors.email }}</span>
                                </div>

                                <div class="form-group ">
                                    
                                    <div class="input-group" :class="{'is-danger': errors.password }">
                                        <input class="form-control input-border" v-model="form.password" type="password" placeholder="Password">
                                    </div>
                                    <span v-if="errors.password" class="text-danger float-left small">{{ errors.password }}</span>
                                </div>

                                <div class="form-group ">
                                    <button type="submit" class="mt-4 btn btn-success btn-lg btn-block full_rounded">
                                        <font-awesome-icon v-if="loading" icon="circle-notch" class="btn-icon" spin/>
                                        Create an Account
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

                                <p class="text-center text-muted">Or sign in with</p>
                                <div class="form-group">
                                    <button class="btn btn-lg g-login">
                                    <img  width="20"  src="https://image.flaticon.com/icons/svg/281/281764.svg" class="mr-2" alt="Icon Google">Google</button>
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
import {login} from '../../config/auth'


export default {
    data () {
        return {
            form: {
                email: 'alejandro@gmail.com',
                password: '123456'
            },
            errors: {
                email: false,
                password: false,
                credentials: false
            },
            loading: false
        }
    },
    watch: {
        'form.email': function (value) {
            let app = this
            app.errors.credentials = false

            if (!value) {
                app.errors.email = 'Email required.'
            } else if (!app.validEmail(value)) {
                app.errors.email = 'Valid email required.'
            } else {
                app.errors.email = false
            }
        },
        'form.password': function (value) {
            let app = this
            app.errors.credentials = false
            if (value) {
                app.errors.password = false
            } else {
                app.errors.password = 'Pasword required.'
            }
        }
    },
    methods : {
        myFn(val) {
            console.log(val) // => The value of the input
        },
        login(){
            let app = this

            if (app.validform()) {

                app.loading = true
                
                axios.post('api/login', app.form)
                .then(function (response) {
                    app.loading = false
                   
                    login(response.data.token)

                    let redirect = app.$route.query.redirect

                    if (redirect) {
                        app.$router.push(redirect)
                    } else {
                        app.$router.push({name: 'events'})
                    }
                })
                .catch(function (error) {
                    app.loading = false
                    let errors = error.response
                    app.errors.credentials = errors.data.error
                    
                    setTimeout(function(){
                        app.errors.credentials = false
                    },3000)
                    

                })
            }
        },
        validform() {
            let app = this

            if (!app.form.password) {
                app.errors.password = 'Pasword required.'
            }

            if (!app.form.email) {
                app.errors.email = 'Email required.'
            }

            if (!app.errors.email && !app.errors.password && app.validEmail(app.form.email)) {
                return true
            }

            return false
        },
        validEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email)
        },
        close_alert: function () {
            let app = this
            app.errors.credentials = false
        }
    }
}
</script>



<style scope>
.ml-3, .mx-3{
    margin-left: 0 !important;
}

</style>
