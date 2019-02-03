<template>
    <div>
        <h1>Sign in to BetController</h1>

       
        <div class="container double_rounded align-middle login_a">
            <div class="row pb-5 justify-content-center">
                <div class="col-lg-5 mt-5">
                    <form @submit.prevent="login" align="center" class="mt-lg-2" autocomplete="on">

                        <div class="form-group mb-4">
                            
                            <div class="input-group mb-1" :class="{'is-danger': errors.email }">
                                <input class="form-control input-border" v-model="form.email" type="email" placeholder="Username">
                            </div>
                            <span v-if="errors.email" class="ml-3 text-danger float-left small">{{ errors.email }}</span>
                         </div>

                        <div class="form-group mb-4d">
                            
                            <div class="input-group mb-1" :class="{'is-danger': errors.password }">
                                <input class="form-control input-border" v-model="form.password" type="password" placeholder="Password">
                            </div>
                            <span v-if="errors.password" class="ml-3 text-danger float-left small">{{ errors.password }}</span>
                        </div>

                        <button type="submit" class="mt-6 btn btn-primary btn-lg btn-block full_rounded">
                            <font-awesome-icon v-if="loading" icon="circle-notch" class="btn-icon" spin/>
                            Sign in
                        </button>

                        <transition name="fade">
                            <div class="mt-4" v-if="errors.credentials">
                                <div class="alert alert-danger fade show" role="alert">
                                    {{ errors.credentials }}
                                    <button type="button" class="close" @click="close_alert">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </transition>
                    </form>
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
                email: null,
                password: null
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
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(email)
        },
    }
}
</script>



<style scope>
.ml-3, .mx-3{
    margin-left: 0 !important;
}
</style>
