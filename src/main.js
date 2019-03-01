import Vue from 'vue'
import './bootstrap'
import App from './App.vue'
import { store } from './store'
import VueLodash from 'vue-lodash'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import { isLoggedIn } from './config/auth'

import pagination from '@/views/helpers/Pagination.vue'
import loading from '@/views/helpers/Loading.vue'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faCircleNotch )

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('pagination', pagination)
Vue.component('loading', loading)

Vue.use(BootstrapVue)
Vue.use(VueLodash)
Vue.use(VueSweetalert2)


/*
Vue.config.devtools = false
Vue.config.debug = false
Vue.config.silent = true
*/


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//site style file

import './assets/scss/bootstrap-custom.scss'
import './assets/scss/app.scss'



Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	
	if (!to.matched.some(record => record.meta.isPublic) && !isLoggedIn()) { 
        next({ 
           path: '/auth/sign_in', query: { redirect: to.fullPath } 
        });
    } else {

        const nearestWithTitle = to.matched.slice().reverse().find(record => record.meta && record.meta.title);

        if (nearestWithTitle){
            document.title = to.meta.title
        }
    
        next();
    }
})


new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')